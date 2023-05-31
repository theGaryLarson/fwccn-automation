import connectMongo from "../../../lib/connectMongo";
import Applicant from "../../../models/applicant_schema";
import {formatNextEligibleDate} from "../../../lib/util"
export default async function validateApplicantRecord(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }
    await connectMongo();
    const { driverLicenseOrId, homeStreet1, homeStreet2, homeZip } = req.body;

    // Define our search condition
    const condition = {
        $or: [
            { "idSource.driverLicenseOrId": driverLicenseOrId },
            {
                "homeAddress.homeStreet1": homeStreet1,
            },
        ],
    };
    if (homeStreet2) {
        condition.$or.push({ "homeAddress.homeStreet2": homeStreet2 });
    }
    if (homeZip) {
        condition.$or.push({ "homeAddress.homeZip": homeZip });
    }

    // Find applicants based on the built condition
    const duplicateRecords = await Applicant.find(condition).exec();
    console.log("applicants: ", duplicateRecords.length)
    // Build Requirements object
    let responseFlags = {
        addressDuplicates: { flag: false, records: [] },
        stateIdDuplicates: { flag: false, records: [] },
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
    const targetStateId = driverLicenseOrId !== "" ? driverLicenseOrId : undefined;
    const targetAddress = address !== "" ? address : undefined;


    // Group the applicants by their home address or state ID
    const groupedRecords = groupFilteredRecords(targetStateId, targetAddress,duplicateRecords);
    // flag duplicate applicants check for eligibility
    if (groupedRecords.idGroup) {
        responseFlags.stateIdDuplicates.flag = true;
        responseFlags.stateIdDuplicates.records = groupedRecords.idGroup;
        responseFlags = {
            ...responseFlags,
            ...checkEligibility(duplicateRecords, today,  true)
        }
    }

    // flag multiple addresses check for eligibility
    if (groupedRecords.addressGroup) {
        responseFlags.addressDuplicates.flag = true;
        responseFlags.addressDuplicates.records = groupedRecords.addressGroup;
        responseFlags = {
            ...responseFlags,
            ...checkEligibility(duplicateRecords, today,  false)
        }

    }
    res.json(responseFlags);
}

/**
 * Groups applicant records based on home address or state ID
 * @param targetId state identification
 * @param targetAddress address; can be streetAddress1 or an addition of streetAddres2 and zip code consecutively
 * @param records duplicate applications of target
 * @returns {Object} { idGroup: [], addressGroup[] }
 */
function groupFilteredRecords( targetId, targetAddress, records) {
    const idGroup = [];
    const addressGroup = [];

    for (const document of records) {
        const id = document.idSource.driverLicenseOrId;
        const applicantHomeStreet1 = document.homeAddress.homeStreet1 || "";
        const applicantHomeStreet2 = document.homeAddress.homeStreet2 || "";
        const applicantHomeZip = document.homeAddress.homeZip || "";
        const address = `${applicantHomeStreet1}${applicantHomeStreet2}${applicantHomeZip}`;
        //fixed: address and targetAddress do not match address is only homeStreet1 in this case but our comparison
        if (targetId && id === targetId) {
            idGroup.push(document);
        }

        if (!targetId && address.startsWith(targetAddress)) {
            addressGroup.push(document);
        }
    }
    // sort in descending order so most recent application is at the top of the lists
    idGroup.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp))
    addressGroup.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp))

    return { idGroup, addressGroup };
}

/**
 *
 * @param pastDate the past limit from years
 * @param currrentDate today's date
 * @param years number of years between now and the past date
 * @returns {boolean}
 */
function isWithinLastYears(pastDate, currrentDate, years) {
    const differenceInMilliseconds = currrentDate - pastDate;
    const differenceInYears = differenceInMilliseconds / 1000 / 60 / 60 / 24 / 365;

    return differenceInYears < years;
}

/**
 * Iterates through all duplicate applications checking FWCCN time constraints
 * Help once every 2 years, after being helped twice there is a 4 year waiting period
 * @param records
 * @param currentDate
 * @param isIdGroup
 * @returns {{idGroup?: {eligible: boolean, shortMessage: string, message: string, nextHelpDate: string}, addressGroup?: {eligible: boolean, shortMessage: string, message: string, nextHelpDate: string}}|{idGroup?: {helpLast2Years: {flag: boolean}, eligible: boolean, shortMessage: string, mostRecentHelpDate: null, nextHelpDate: *, message: string}, addressGroup?: {helpLast2Years: {flag: boolean}, eligible: boolean, shortMessage: string, mostRecentHelpDate: *, nextHelpDate: *, message: string}}|{idGroup?: {eligible: boolean, help2TimesLast4Years: {flag: boolean}, shortMessage: string, mostRecentHelpDate: null, nextHelpDate: *, message: string}, addressGroup?: {eligible: boolean, help2TimesLast4Years: {flag: boolean}, shortMessage: string, mostRecentHelpDate: null, nextHelpDate: *, message: string}}}
 */
function checkEligibility(records, currentDate, isIdGroup) {
    // time constraints for an applicant: help once every 2 years. If received help twice a 4 year waiting period
    let helpInCurrentTwoYearBlock = 0, helpInPreviousTwoYearBlock = 0;
    let twoYearBlockStart = new Date(
        currentDate.getFullYear() - 2,
        currentDate.getMonth(),
        currentDate.getDate());
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
                            mostRecentHelpDate: mostRecentHelpDate,
                            nextHelpDate: formatNextEligibleDate(mostRecentHelpDate, 4),
                            message: 'The person is not eligible for help. They have received help in each of the last two two-year blocks and must wait four years from the last help date before receiving help again.',
                            shortMessage: "4 year wait",
                            help2TimesLast4Years: { flag: true }
                        }}
                    : { addressGroup: {
                            eligible: false,
                            mostRecentHelpDate: mostRecentHelpDate,
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
                            mostRecentHelpDate: mostRecentHelpDate,
                            nextHelpDate: formatNextEligibleDate(mostRecentHelpDate, 2),
                            message: 'The person is not eligible for help. They have received help within the last two years and must wait until two years from the last help date before receiving help again.',
                            shortMessage: "2 year wait",
                            helpLast2Years: { flag: true }
                        }}
                    : {
                        addressGroup: {
                            eligible: false,
                            mostRecentHelpDate: formatNextEligibleDate(mostRecentHelpDate, 0),
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


