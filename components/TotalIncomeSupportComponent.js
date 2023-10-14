// total household income from all household members and number of people supported
import styles from "./applicant_form/ApplicantForm.module.css";
import {useState} from "react";
import IncomeSourcesComponent from "./IncomeSourcesComponent";


// applicant household income information
export default function TotalIncomeSupportComponent({formData, onComponentInputChange}) {
    const [isIncomeVerified, setIsIncomeVerified] = useState(formData?.houseHoldIncome?.isIncomeVerified??false)
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        if(name === "totalHouseholdIncome" || name === "houseHoldIncomePastYear" || name === "totalSupportMembers") {
            onComponentInputChange({target:{name, value: Number(value)}});
        } else {
            onComponentInputChange(event);
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
            <div className={styles.componentWrapper}>
                <input
                    type="checkbox"
                    id="isIncomeVerified"
                    className="hidden pl-1"
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="isIncomeVerified" className="flex items-center mt-4 select-none">
                <span className={`${isIncomeVerified ? 'bg-green-500' : 'bg-white'} mr-2 border rounded border-gray-400 w-5 h-5 flex items-center justify-center `}>
                    {isIncomeVerified && '✓'}
                </span>
                    <span className='font-bold'> Income Verified</span>
                </label>
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="totalHouseholdIncome">Current Monthly Household Income (include all sources):</label>
                <input
                    type="number"
                    id="totalHouseholdIncome"
                    name="totalHouseholdIncome"
                    placeholder="$0000.00"
                    value={formData?.houseHoldIncome?.totalHouseholdIncome??undefined}
                    onChange={handleInputChange}
                    className={'pl-1'}
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="houseHoldIncomePastYear">Annual Income (Past 12 months - regardless of current situation):</label>
                <input
                    type="number"
                    id="houseHoldIncomePastYear"
                    name="houseHoldIncomePastYear"
                    placeholder="$0000.00"
                    value={formData?.houseHoldIncome?.houseHoldIncomePastYear??''}
                    onChange={handleInputChange}
                    className={'pl-1'}
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="totalSupportMembers">Total Number of Supported Members</label>
                <input
                    type="number"
                    id="totalSupportMembers"
                    name="totalSupportMembers"
                    placeholder="3"
                    value={formData?.houseHoldIncome?.totalSupportMembers??''}
                    onChange={handleInputChange}
                    className={'pl-1'}
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="singleHeadOfHouseHold">Is the applicant the single head of household?</label>
                <select
                    id="singleHeadOfHouseHold"
                    name="singleHeadOfHouseHold"
                    value={formData?.houseHoldIncome?.singleHeadOfHouseHold??'NO-DATA'}
                    onChange={handleInputChange}
                >
                    <option value={'No'}>No, Applicant not Single</option>
                    <option value={'Yes-female'}>Yes, Single Female Head of Household</option>
                    <option value={'Yes-male'}>Yes, Single Male Head of Household</option>
                    <option value={'NO-DATA'}>NO DATA.</option>
                </select>
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor='incomeSituation'>Income Situation</label>
                <textarea
                    id={`incomeSituation`}
                    name="incomeSituation"
                    placeholder="Brief explanation to clarify income situation"
                    value={formData?.houseHoldIncome?.incomeSituation??''}
                    onChange={handleInputChange}
                    className={'p-2'}
                />
            </div>
            <IncomeSourcesComponent formData={formData} onComponentInputChange={onComponentInputChange}/>
        </div>
    );
}

