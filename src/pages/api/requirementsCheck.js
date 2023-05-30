import connectMongo from "../../../lib/connectMongo";
import Applicant from "../../../models/applicant_schema";
import {formatNextEligibleDate} from "../../../lib/util"
export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }
    await connectMongo();
    const { driverLicenseOrId, homeStreet1, homeStreet2, homeZip } = req.body;

    // Check if we got an empty homeStreet2 or homeZip. If they are empty, we will ignore them.
    const hasHomeStreet2 = homeStreet2 !== "";
    const hasHomeZip = homeZip !== "";
    // Define our search condition
    const condition = {
        $or: [
            { "idSource.driverLicenseOrId": driverLicenseOrId },
            {
                "homeAddress.homeStreet1": homeStreet1,
                ...(hasHomeStreet2 ? { "homeAddress.homeStreet2": homeStreet2 } : {}),
                ...(hasHomeZip ? { "homeAddress.homeZip": homeZip } : {}),
            },
        ],
    };

    // Find applicants based on the built condition
    const applicants = await Applicant.find(condition).exec();

    // Build Requirements object
    let responseFlags = {
        multipleAddresses: { flag: false, records: [] },
        duplicateApplicant: { flag: false, records: [] },
        helpLast2Years: { flag: false },
        help2TimesLast4Years: { flag: false }
    };

    // Set today's Date for time limits
    const today = new Date();

    // build address for key comparison
    const street1 = homeStreet1 || ""
    const street2 = homeStreet2 || ""
    const zip = homeZip || ""
    const address = `${street1}${street2}${zip}`

    // Group the applicants by their home address or state ID
    const groupedRecords = groupFilteredRecords(driverLicenseOrId, address,applicants);

    // flag duplicate applicants check for eligibility
    if (groupedRecords.idGroups && groupedRecords.idGroups.length > 1 ) {
        responseFlags.duplicateApplicant.flag = true;
        responseFlags.duplicateApplicant.records = JSON.parse(JSON.stringify(groupedRecords.idGroups)); // deep copy
        responseFlags = {
            ...responseFlags,
            ...checkEligibility(groupedRecords.idGroups, today),
        }
    }

    // flag multiple addresses check for eligibility
    if (groupedRecords.addressGroups && groupedRecords.addressGroups.length > 1) {
        responseFlags.multipleAddresses.flag = true;
        responseFlags.multipleAddresses.records = JSON.parse(JSON.stringify(groupedRecords.addressGroups)); // deep copy
        responseFlags = {
            ...responseFlags,
            ...checkEligibility(groupedRecords.addressGroups,today)
        }
    }

    res.json(responseFlags);
}

/**
 * Groups applicant records based on home address or state ID
 * @param targetId
 * @param targetAddress
 * @param applicants
 * @returns {Object}
 */
function groupFilteredRecords( targetId, targetAddress, applicants) {
    const idGroups = [];
    const addressGroups = [];

    for (const applicant of applicants) {
        const id = applicant.idSource.driverLicenseOrId;
        const applicantHomeStreet1 = applicant.homeAddress.homeStreet1 || "";
        const applicantHomeStreet2 = applicant.homeAddress.homeStreet2 || "";
        const applicantHomeZip = applicant.homeAddress.homeZip || "";
        const address = `${applicantHomeStreet1}${applicantHomeStreet2}${applicantHomeZip}`;

        if (
            (targetId && id === targetId) ||
            (!targetId && address === targetAddress)
        ) {
            if (!idGroups[id]) {
                idGroups[id] = [];
            }

            if (!addressGroups[address]) {
                addressGroups[address] = [];
            }

            idGroups[id].push(applicant);
            addressGroups[address].push(applicant);
        }
    }

    // sort each array in descending order
    idGroups.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    addressGroups.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return { idGroups, addressGroups };
}

function isWithinLastYears(date1, date2, years) {
    const differenceInMilliseconds = date2 - date1;
    const differenceInYears = differenceInMilliseconds / 1000 / 60 / 60 / 24 / 365;

    return differenceInYears < years;
}

function checkEligibility(records, currentDate, isIdGroup) {
    // Sorting records by timestamp in descending order
    records.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    let helpInCurrentTwoYearBlock = 0, helpInPreviousTwoYearBlock = 0;
    let twoYearBlockStart = new Date(currentDate.getFullYear() - 2, currentDate.getMonth(), currentDate.getDate());

    let mostRecentHelpDate = null;

    for (const rec of records) {
        const { timestamp, status } = rec;
        const recordDate = new Date(timestamp);

        if (status === "APPROVED" || status === "APPROVED-OVERRIDE") {
            if (mostRecentHelpDate === null || recordDate > mostRecentHelpDate) {
                mostRecentHelpDate = recordDate;
            }
            if (isWithinLastYears(recordDate, currentDate, 2)) {
                helpInCurrentTwoYearBlock++;
            } else if (isWithinLastYears(recordDate, twoYearBlockStart, 2)) {
                helpInPreviousTwoYearBlock++;
            }
        }
    }

    // Eligibility conditions
    if (helpInCurrentTwoYearBlock >= 1 && helpInPreviousTwoYearBlock >= 1 && !isWithinLastYears(mostRecentHelpDate, currentDate, 4)) {
        return {
            ...(isIdGroup
                    ? { idGroup: {
                            eligible: false,
                            nextHelpDate: formatNextEligibleDate(mostRecentHelpDate, 4),
                            message: 'The person is not eligible for help. They have received help in each of the last two two-year blocks and must wait four years from the last help date before receiving help again.',
                            shortMessage: "4 year wait",
                            help2TimesLast4Years: { flag: true }
                        }}
                    : { addressGroup: {
                            eligible: false,
                            nextHelpDate: formatNextEligibleDate(mostRecentHelpDate, 4),
                            message: 'The person is not eligible for help. They have received help in each of the last two two-year blocks and must wait four years from the last help date before receiving help again.',
                            shortMessage: "4 year wait",
                            help2TimesLast4Years: { flag: true }
                        }
                    }
            )
        };

    } else if ( helpInPreviousTwoYearBlock === 0 && helpInCurrentTwoYearBlock >= 1 && isWithinLastYears(mostRecentHelpDate, currentDate, 2)) {
        return {
            ...(isIdGroup
                    ? { idGroup: {
                            eligible: false,
                            nextHelpDate: formatNextEligibleDate(mostRecentHelpDate, 2),
                            message: 'The person is not eligible for help. They have received help within the last two years and must wait until two years from the last help date before receiving help again.',
                            shortMessage: "2 year wait",
                            helpLast2Years: { flag: true }
                        }}
                    : {
                        addressGroup: {
                            eligible: false,
                            nextHelpDate: formatNextEligibleDate(mostRecentHelpDate, 2),
                            message: 'The person is not eligible for help. They have received help within the last two years and must wait until two years from the last help date before receiving help again.',
                            shortMessage: "2 year wait",
                            helpLast2Years: { flag: true }
                        }
                    }
            )
        };
    } else {
        return {
            ...(isIdGroup
                    ? { idGroup: {
                            eligible: true,
                            message: 'The person is eligible for help.',
                            shortMessage: "Currently eligible",
                            nextHelpDate: "Currently Eligible"
                        }
                    }
                    : { addressGroup: {
                            eligible: true,
                            message: 'The person is eligible for help.',
                            shortMessage: "Currently eligible",
                            nextHelpDate: "Currently Eligible"
                        }
                    }
            )
        };

    }
}


