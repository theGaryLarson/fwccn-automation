
// Some text fields are marked required.

/*
Ensures the input only contains alpha characters
 */
export const validateName = (name) => {
    const regex = /^[A-Za-z]*$/;
    //this isn't necessary because the input field is marked required
    if (!name.trim()) {
        return "This field is required.";
    }
    if (!regex.test(name)) {
        return "Please enter only alphabetical characters.";
    }
    return null;
};

/*
    Ensures only four numbers are entered.
 */
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

/*
makes sure only numbers are entered.
 */
export function validateHouseHoldIncome(income) {
    const regex = /^\d+$/;
    if (!regex.test(income)) {
        return "Household income should only contain digits";
    }
    return null;
}