// total household income from all household members and number of people supported
import styles from "./applicant_form/ApplicantForm.module.css";


// applicant household income information
export default function TotalIncomeSupportComponent({formData, onComponentInputChange}) {

    const handleInputChange = (event) => {
        const {name, value} = event.target;

        if (name === "headOfHousehold") {
            const updatedHeadOfHousehold = {
                ...formData,
                houseHoldIncome: {
                singleMaleHeadOfHousehold: false,
                singleFemaleHeadOfHousehold: false,
                totalHouseholdIncome: formData.houseHoldIncome.totalHouseholdIncome,
                totalSupportMembers: formData.houseHoldIncome.totalSupportMembers}
            }
            if (value !== 'neither') {
                updatedHeadOfHousehold.houseHoldIncome[value] = true;
            }
            onComponentInputChange( {target:{
            name:'houseHoldIncome',
            value: updatedHeadOfHousehold.houseHoldIncome
        }})
        } else {
            onComponentInputChange(event)
        }
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
                <label htmlFor="singleMaleHeadOfHousehold">Is applicant single head of household?</label>
                <select
                    id="singleMaleHeadOfHousehold"
                    name="headOfHousehold"
                    onChange={handleInputChange}
                >
                    <option value={'neither'}>No, Applicant not Head of Household</option>
                    <option value={'singleMaleHeadOfHousehold'}>Yes, Male Head of Household</option>
                    <option value={'singleFemaleHeadOfHousehold'}>Yes, Single Female Head of Household</option>
                </select>
            </div>
        </div>
    );
}

