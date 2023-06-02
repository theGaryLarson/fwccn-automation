import {useEffect, useRef} from "react";

export function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

/**
 *  Use: confirms an object is not empty before handling logic on nested properties and objects
 * @param obj
 * @returns {boolean} true if empty object
 */
export function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}

/**
 * Groups applicant records based on home address or state ID
 * @param targetId state identification
 * @param targetAddress address; can be streetAddress1 or an addition of streetAddres2 and zip code consecutively
 * @param records duplicate applications of target
 * @returns {Object} { idGroup: [], addressGroup[] }
 */
export function groupFilteredRecords( targetId, targetAddress, records) {
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
 * Iterates through all duplicate applications checking FWCCN time constraints
 * Help once every 2 years, after being helped twice there is a 4 year waiting period
 * @param records
 * @param currentDate
 * @param isIdGroup
 * @returns {{idGroup?: {eligible: boolean, shortMessage: string, message: string, nextHelpDate: string}, addressGroup?: {eligible: boolean, shortMessage: string, message: string, nextHelpDate: string}}|{idGroup?: {helpLast2Years: {flag: boolean}, eligible: boolean, shortMessage: string, mostRecentHelpDate: null, nextHelpDate: *, message: string}, addressGroup?: {helpLast2Years: {flag: boolean}, eligible: boolean, shortMessage: string, mostRecentHelpDate: *, nextHelpDate: *, message: string}}|{idGroup?: {eligible: boolean, help2TimesLast4Years: {flag: boolean}, shortMessage: string, mostRecentHelpDate: null, nextHelpDate: *, message: string}, addressGroup?: {eligible: boolean, help2TimesLast4Years: {flag: boolean}, shortMessage: string, mostRecentHelpDate: null, nextHelpDate: *, message: string}}}
 */
export function checkEligibility(records, currentDate, isIdGroup) {
    // time constraints for an applicant: help once every 2 years. If received help twice a 4 year waiting period
    let helpInCurrentTwoYearBlock = 0, helpInPreviousTwoYearBlock = 0;
    let twoYearBlockStart = new Date(
        currentDate.getFullYear() - 2,
        currentDate.getMonth(),
        currentDate.getDate());
    let mostRecentHelpDate = null;

    for (const record of records) {
        const { timestamp, status } = record;
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

/**
 *
 * @param pastDate the past limit from years
 * @param currrentDate today's date
 * @param years number of years between now and the past date
 * @returns {boolean}
 */
export function isWithinLastYears(pastDate, currrentDate, years) {
    const differenceInMilliseconds = currrentDate - pastDate;
    const differenceInYears = differenceInMilliseconds / 1000 / 60 / 60 / 24 / 365;

    return differenceInYears < years;
}
export function formatNextEligibleDate(timestamp, years) {
    const targetDate = new Date(timestamp);

    targetDate.setFullYear(targetDate.getFullYear() + years);

    return targetDate.toDateString();
}

export function ordinalNumber(value) {
    try {
        return ordinals[value]
    } catch (e) {
        return value;
    }

}

const ordinals = {
    0: "First",
    1: "Second",
    2: "Third",
    3: "Fourth",
    4: "Fifth",
    5: "Sixth",
    6: "Seventh",
    7: "Eighth",
    8: "Ninth",
    9: "Tenth",
    10: "Eleventh",
    11: "Twelfth",
    12: "Thirteenth",
    13: "Fourteenth",
    14: "Fifteenth",
    15: "Sixteenth",
    16: "Seventeenth",
    17: "Eighteenth",
    18: "Nineteenth",
    19: "Twentieth",
    20: "Twenty-first",
    21: "Twenty-second",
    22: "Twenty-third",
    23: "Twenty-fourth",
    24: "Twenty-fifth",
    25: "Twenty-sixth",
    26: "Twenty-seventh",
    27: "Twenty-eighth",
    28: "Twenty-ninth",
    29: "Thirtieth",
    30: "Thirty-first",
    31: "Thirty-second",
    32: "Thirty-third",
    33: "Thirty-fourth",
    34: "Thirty-fifth",
    35: "Thirty-sixth",
    36: "Thirty-seventh",
    37: "Thirty-eighth",
    38: "Thirty-ninth",
    39: "Fortieth",
    40: "Forty-first",
    41: "Forty-second",
    42: "Forty-third",
    43: "Forty-fourth",
    44: "Forty-fifth",
    45: "Forty-sixth",
    46: "Forty-seventh",
    47: "Forty-eighth",
    48: "Forty-ninth",
    49: "Fiftieth"
};
