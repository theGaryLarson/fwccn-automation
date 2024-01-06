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

export const getPercentOfKingAMI = (year, familySize, annualHouseholdIncome) => {
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
    // TODO: update with 2024 income percentage amounts
    '2024': {
        1: { 28800: '30', 33565: '35', 38360: '40', 43155: '45', 47950: '50', 57540: '60', 62335: '65', 67130: '70', 70650: '80' },
        2: { 32900: '30', 38360: '35', 43840: '40', 49320: '45', 54800: '50', 65760: '60', 71240: '65', 76720: '70', 80750: '80' },
        3: { 37000: '30', 43155: '35', 49320: '40', 55485: '45', 61650: '50', 73980: '60', 80145: '65', 86310: '70', 90850: '80' },
        4: { 41100: '30', 47950: '35', 54800: '40', 61650: '45', 68500: '50', 82200: '60', 89050: '65', 95900: '70', 100900: '80' },
        5: { 44400: '30', 51800: '35', 59200: '40', 66600: '45', 74000: '50', 88800: '60', 96200: '65', 103600: '70', 109000: '80' },
        6: { 47700: '30', 55650: '35', 63600: '40', 71550: '45', 79500: '50', 95400: '60', 103350: '65', 111300: '70', 117050: '80' },
        7: { 51000: '30', 59465: '35', 67960: '40', 76455: '45', 84950: '50', 101940: '60', 110435: '65', 118930: '70', 125150: '80' },
        8: { 54300: '30', 63315: '35', 72360: '40', 81405: '45', 90450: '50', 108540: '60', 117585: '65', 126630: '70', 133200: '80' }
    }
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
