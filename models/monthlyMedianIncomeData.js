export const getIncomeCategory = (year, monthlyHouseholdIncome, familySize) => {
    if (Number.isNaN(year) || Number.isNaN(monthlyHouseholdIncome) || Number.isNaN(familySize)) {
        throw new Error('Requires a valid year, family size and totalHouseholdIncome')
    }
    const medianIncome = getMedianIncome(year, familySize);
    const percentage = getPercentOfMedianIncome(monthlyHouseholdIncome, medianIncome);
    return categorizeByPercentOfMedianIncome(percentage);
};

export const getKingAnnualIncomeCategory = (year, annualHouseholdIncome, familySize) => {
    if (Number.isNaN(year) || Number.isNaN(annualHouseholdIncome) || Number.isNaN(familySize)) {
        throw new Error('Requires a valid year, family size and totalHouseholdIncome')
    }
    const percentage = getPercentOfKingAMI(year, familySize, annualHouseholdIncome);
    return categorizeByPercentOfMedianIncome(percentage);
};

function getMedianIncome(year, familySize) {
    if(year < 2016) {
        throw new Error('Year must be 2016 or later.')
    }
    if (familySize > 10) {
        const additionalFamilyMembers = familySize - 10;
        const costPerAdditionalMember = monthlyMedianIncomeData[year]['additional'];
        return costPerAdditionalMember * additionalFamilyMembers + monthlyMedianIncomeData[year][10];
    } else {
        return monthlyMedianIncomeData[year][familySize];
    }
}

function getKingCountyMedianIncome(year, familySize) {
    if( familySize > 10 || year < 2023) {
        throw new Error('Year must be 2023 and family size must be less than 11.')
    }
    return monthlyMedianIncomeData[year][familySize];
}

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
    const annualMedianIncome = kingAnnualAMI[year][familySize];
    return annualHouseholdIncome / annualMedianIncome * 100;
}

function getPercentOfMedianIncome(monthlyHouseholdIncome, monthlyMedianIncome) {
    return monthlyHouseholdIncome / monthlyMedianIncome * 100;
}

// https://communities-rise.org/king-county-hud-income-eligibility/
const kingAnnualAMI = {
    '2023': {
        "1": "88312.50",
        "2": "100937.50",
        "3": "113562.50",
        "4": "126125",
        "5": "136250",
        "6": "146312.50",
        "7": "156437.50",
        "8": "166500",
        "9": "176625",
        "10": "186687.50"
    }
}

// https://www.dshs.wa.gov/esa/eligibility-z-manual-ea-z/state-median-income-chart
export const monthlyMedianIncomeData = {
    "2023": {
        "1": 4915,
        "2": 6428,
        "3": 7940,
        "4": 9453,
        "5": 10965,
        "6": 12478,
        "7": 12762,
        "8": 13046,
        "9": 13330,
        "10": 13614,
        "additional": 284
    },
    "2022": {
        "1": 4687,
        "2": 6129,
        "3": 7571,
        "4": 9014,
        "5": 10456,
        "6": 11898,
        "7": 12168,
        "8": 12438,
        "9": 12708,
        "10": 12978,
        "additional": 270
    },
    "2021": {
        "1": 4460,
        "2": 5830,
        "3": 7200,
        "4": 8570,
        "5": 9940,
        "6": 11310,
        "7": 11574,
        "8": 11838,
        "9": 12102,
        "10": 12366,
        "additional": 264
    },
    "2020": {
        "1": 4233,
        "2": 5531,
        "3": 6829,
        "4": 8127,
        "5": 9425,
        "6": 10723,
        "7": 10980,
        "8": 11237,
        "9": 11494,
        "10": 11751,
        "additional": 257
    },
    "2019": {
        "1": 4006,
        "2": 5232,
        "3": 6458,
        "4": 7684,
        "5": 8910,
        "6": 10136,
        "7": 10386,
        "8": 10636,
        "9": 10886,
        "10": 11136,
        "additional": 250
    },
    "2018": {
        "1": 3779,
        "2": 4933,
        "3": 6087,
        "4": 7241,
        "5": 8395,
        "6": 9549,
        "7": 9792,
        "8": 10035,
        "9": 10278,
        "10": 10521,
        "additional": 243
    },
    "2017": {
        "1": 3552,
        "2": 4634,
        "3": 5716,
        "4": 6798,
        "5": 7880,
        "6": 8962,
        "7": 9198,
        "8": 9434,
        "9": 9670,
        "10": 9906,
        "additional": 236
    },
    "2016": {
        "1": 3325,
        "2": 4335,
        "3": 5345,
        "4": 6355,
        "5": 7365,
        "6": 8375,
        "7": 8604,
        "8": 8833,
        "9": 9062,
        "10": 9291,
        "additional": 229
    }
};
