export const getKingAnnualIncomeCategory = (year, annualHouseholdIncome, familySize) => {
    if (Number.isNaN(year) || Number.isNaN(annualHouseholdIncome) || Number.isNaN(familySize)) {
        throw new Error('Requires a valid year, family size and totalHouseholdIncome')
    }
    const percentage = getPercentOfKingAMI(year, familySize, annualHouseholdIncome);
    return categorizeByPercentOfMedianIncome(percentage);
};

function categorizeByPercentOfMedianIncome(percentage) {
    if (!percentage || Number.isNaN(percentage)) {
        throw new Error('Must enter percentage and percentage must be an integer')
    }
    if (percentage <= 30) {
        return "extremely low";
    } else if (percentage <= 50) {
        return "low";
    } else if (percentage <= 80) {
        return "moderate";
    } else {
        return "above moderate";
    }
}

export const getPercentOfKingAMI = (inputYear, familySize, annualHouseholdIncome) => {
    let year = inputYear;
    while (!amiLimits[year]) {
        year = String(Number(year) - 1)
    }
    const incomeLimits = amiLimits[year][familySize];
    // Find the first (lowest) income limit for the family size
    const firstLimit = Math.min(...Object.keys(incomeLimits).map(Number));
    // If the income is less than the first limit, return '30%'
    if (annualHouseholdIncome <= firstLimit) {
        return '30';
    }
    let lastPercentage = 'Not found';

    for (let [incomeLimit, percentage] of Object.entries(incomeLimits)) {
        if (annualHouseholdIncome >= incomeLimit) {
            lastPercentage = percentage; // Save the last percentage if income is higher than the current limit
        } else {
            break; // If income is less than or equal to the current limit, stop the iteration
        }
    }

    return lastPercentage;
};


// translated from the document Linda gave.
const amiLimits = {
    '2023': {
        1: { 28800: '30', 33565: '35', 38360: '40', 43155: '45', 47950: '50', 57540: '60', 62335: '65', 67130: '70', 70650: '80' },
        2: { 32900: '30', 38360: '35', 43840: '40', 49320: '45', 54800: '50', 65760: '60', 71240: '65', 76720: '70', 80750: '80' },
        3: { 37000: '30', 43155: '35', 49320: '40', 55485: '45', 61650: '50', 73980: '60', 80145: '65', 86310: '70', 90850: '80' },
        4: { 41100: '30', 47950: '35', 54800: '40', 61650: '45', 68500: '50', 82200: '60', 89050: '65', 95900: '70', 100900: '80' },
        5: { 44400: '30', 51800: '35', 59200: '40', 66600: '45', 74000: '50', 88800: '60', 96200: '65', 103600: '70', 109000: '80' },
        6: { 47700: '30', 55650: '35', 63600: '40', 71550: '45', 79500: '50', 95400: '60', 103350: '65', 111300: '70', 117050: '80' },
        7: { 51000: '30', 59465: '35', 67960: '40', 76455: '45', 84950: '50', 101940: '60', 110435: '65', 118930: '70', 125150: '80' },
        8: { 54300: '30', 63315: '35', 72360: '40', 81405: '45', 90450: '50', 108540: '60', 117585: '65', 126630: '70', 133200: '80' }
    },
    '2025': {
        1: { 22000: '20', 33000: '30', 38500: '35', 44000: '40', 49500: '45', 55000: '50', 66000: '60', 77000: '70', 88000: '80' },
        2: { 25140: '20', 37710: '30', 43995: '35', 50280: '40', 56685: '45', 62850: '50', 75420: '60', 87990: '70', 100560: '80' },
        3: { 28280: '20', 42420: '30', 49490: '35', 56560: '40', 63630: '45', 70700: '50', 84840: '60', 98980: '70', 113120: '80' },
        4: { 31420: '20', 47130: '30', 54985: '35', 62840: '40', 70695: '45', 78550: '50', 94260: '60', 109970: '70', 125680: '80' },
        5: { 33940: '20', 50910: '30', 59385: '35', 67880: '40', 76365: '45', 84850: '50', 101820: '60', 118790: '70', 135760: '80' },
        6: { 38460: '20', 54690: '30', 63805: '35', 72920: '40', 82035: '45', 91150: '50', 109380: '60', 127610: '70', 145840: '80' },
        7: { 38960: '20', 58470: '30', 68215: '35', 77960: '40', 87705: '45', 97450: '50', 116940: '60', 136430: '70', 155920: '80' },
        8: { 41480: '20', 62220: '30', 72590: '35', 82960: '40', 93330: '45', 103700: '50', 124440: '60', 145180: '70', 165920: '80' }
    }
    // Add other years as necessary

};

// https://communities-rise.org/king-county-hud-income-eligibility/
// const kingAnnualAMI = {
//         '2023': {
//         "1": "88312.50",
//         "2": "100937.50",
//         "3": "113562.50",
//         "4": "126125",
//         "5": "136250",
//         "6": "146312.50",
//         "7": "156437.50",
//         "8": "166500",
//         "9": "176625",
//         "10": "186687.50"
//     }
// };
