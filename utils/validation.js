
// Some text fields are marked required.
export const validateName = (name) => {
    const regex = /^[A-Za-z]*$/;
    if (!name.trim()) {
        return "This field is required.";
    }
    if (!regex.test(name)) {
        return "Please enter only alphabetical characters.";
    }
    return null;
};

export const validateSSN = (lastFour) => {
    const regex = /^[0-9]{4}$/;
    if (!lastFour.trim()) {
        return "Please enter the last four digits of your social security number."
    }
    if (!regex.test(lastFour)) {
        return "Please only enter the last 4 digits of your social security number."
    }
    return null;
}

export function validateHouseHoldIncome(income) {
    const regex = /^\d+$/;
    if (!regex.test(income)) {
        return "Household income should only contain digits";
    }
    return null;
}