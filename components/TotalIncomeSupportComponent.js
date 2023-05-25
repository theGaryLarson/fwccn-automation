// total household income from all household members and number of people supported
import styles from "./applicant_form/ApplicantForm.module.css";
import {useState} from "react";


// applicant household income information
export default function TotalIncomeSupportComponent({formData, onComponentInputChange}) {
    const [isIncomeVerified, setIsIncomeVerified] = useState(formData.houseHoldIncome.isIncomeVerified || false)
    const handleInputChange = (event) => {
        const {name, value} = event.target;

        if (name === "headOfHousehold") {
            const updatedHeadOfHousehold = {
                ...formData,
                houseHoldIncome: {
                    singleMaleHeadOfHousehold: false,
                    singleFemaleHeadOfHousehold: false,
                    totalHouseholdIncome: formData.houseHoldIncome.totalHouseholdIncome,
                    houseHoldIncomePastYear: formData.houseHoldIncome.houseHoldIncomePastYear,
                    totalSupportMembers: formData.houseHoldIncome.totalSupportMembers
                }
            }
            if (value !== 'neither') {
                updatedHeadOfHousehold.houseHoldIncome[value] = true;
            }
            onComponentInputChange( {target:{
            name:'houseHoldIncome',
            value: updatedHeadOfHousehold.houseHoldIncome
        }})
        } else {
            if(name === "totalHouseholdIncome" || name === "houseHoldIncomePastYear" || name === "totalSupportMembers") {
                onComponentInputChange({target:{name, value: Number(value)}});
            } else {
                onComponentInputChange(event);
            }
        }
    }
    const handleCheckboxChange = () => {
        setIsIncomeVerified(!isIncomeVerified);
        const updatedIncomeVerification = {
            ...formData.houseHoldIncome,
            isIncomeVerified: !isIncomeVerified,
        }
        onComponentInputChange({
            target: {
                name: 'houseHoldIncome',
                value: updatedIncomeVerification
            }

        })
    };

    return (
        <div>
            <h1>Cumulative Household Income</h1>
            <div className={styles.inputWrapper}>
                <label htmlFor="totalHouseholdIncome">Current Monthly Household Income (include all sources):</label>
                <input
                    type="number"
                    id="totalHouseholdIncome"
                    name="totalHouseholdIncome"
                    placeholder="$0000.00"
                    value={formData.houseHoldIncome.totalHouseholdIncome}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="houseHoldIncomePastYear">Monthly Income Last 12 Months:</label>
                <input
                    type="number"
                    id="houseHoldIncomePastYear"
                    name="houseHoldIncomePastYear"
                    placeholder="$0000.00"
                    value={formData.houseHoldIncome.houseHoldIncomePastYear}
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
                    placeholder="3"
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
            <div className={styles.inputWrapper}>
                <input
                    type="checkbox"
                    id="isIncomeVerified"
                    className="hidden"
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="isIncomeVerified" className="flex items-center mt-4 select-none">
                <span className={` ${!isIncomeVerified ? 'bg-green-500' : ''} mr-2 border rounded border-gray-400 bg-white w-5 h-5 flex items-center justify-center `}>
                    {isIncomeVerified && '✓'}
                </span>
                    <span className='font-bold'> Income Verified</span>
                </label>
            </div>
        </div>
    );
}

