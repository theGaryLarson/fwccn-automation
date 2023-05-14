// total household income from all household members and number of people supported
import styles from "./applicant_form/ApplicantForm.module.css";

// applicant household income information
export default function TotalIncomeSupportComponent({formData, onComponentInputChange}) {

    const handleInputChange = (event) => {
        onComponentInputChange(event)
    }

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
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="singleFemaleHeadOfHousehold">Single Female Head of Household</label>
                <input
                    type="checkbox"
                    id="singleFemaleHeadOfHousehold"
                    name="singleFemaleHeadOfHousehold"
                    checked={formData.houseHoldIncome.singleFemaleHeadOfHousehold}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
}
