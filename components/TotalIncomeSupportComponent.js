// total household income from all household members and number of people supported
import styles from "./applicant_form/ApplicantForm.module.css";


// applicant household income information
export default function TotalIncomeSupportComponent({formData, onComponentInputChange}) {

    const handleInputChange = (event) => {
        onComponentInputChange(event)
    }

    // this function specifically handles the onclick event surrounding the checkbox for male / female
    // head of household which allows us to enable or disable the checkbox in a reversible fashion
    const handleCheckboxChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        const updatedFormData = {
            ...formData,
            houseHoldIncome: {
                ...formData.houseHoldIncome,
                [name]: value,
            },
        };

        onComponentInputChange({
            target: {
                name: event.target.name,
                value: value,
            },
        });

        // Update the form data with the new checkbox value
        onComponentInputChange({
            target: {
                name: 'houseHoldIncome',
                value: updatedFormData.houseHoldIncome,
            },
        });
    };



    return (
        <div>
            <h1>Cumulative Household Income</h1>
            <div className={styles.inputWrapper}>
                <label htmlFor="totalHouseholdIncome">Total Household Income</label>
                <input
                    type="number"
                    id="totalHouseholdIncome"
                    name="totalHouseholdIncome"
                    value={formData.houseHoldIncome.totalHouseholdIncome}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="totalSupportMembers">Total Number of Supported Members</label>
                <input
                    type="number"
                    id="totalSupportMembers"
                    name="totalSupportMembers"
                    value={formData.houseHoldIncome.totalSupportMembers}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="singleMaleHeadOfHousehold">Single Male Head of Household</label>
                <input
                    type="checkbox"
                    id="singleMaleHeadOfHousehold"
                    name="singleMaleHeadOfHousehold"
                    checked={formData.houseHoldIncome.singleMaleHeadOfHousehold}
                    onChange={handleCheckboxChange}
                />
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="singleFemaleHeadOfHousehold">Single Female Head of Household</label>
                <input
                    type="checkbox"
                    id="singleFemaleHeadOfHousehold"
                    name="singleFemaleHeadOfHousehold"
                    checked={formData.houseHoldIncome.singleFemaleHeadOfHousehold}
                    onChange={handleCheckboxChange}
                />
            </div>
        </div>
    );
}

