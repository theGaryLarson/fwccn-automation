import styles from "./applicant_form/ApplicantForm.module.css";

// applicant income information
export default function IncomeComponent({formData, onComponentInputChange }) {

    const handleInputChange = (event) => {
        onComponentInputChange(event)
    }

    return (
        <div>
            <h1>Income Information</h1>
            <div className={styles.componentWrapper}>
                <label htmlFor="monthly-income">Monthly Income:</label>
                <input
                    type="number"
                    id="monthly-income"
                    name="currentMonthlyIncome"
                    placeholder="$0000.00"
                    value={formData.income.currentMonthlyIncome}
                    onChange={handleInputChange}
                    required
                />

            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="income-last-12-months">Total Income Last 12 Months:</label>
                <input
                    type="number"
                    id="income-last-12-months"
                    name="monthlyIncomeLast12Months"
                    placeholder="$0000.00"
                    value={formData.income.monthlyIncomeLast12Months}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="members-supported">Household Members Supported By This Income:</label>
                <input
                    type="number"
                    id="members-supported"
                    name="totalHouseholdMembersIncomeSupports"
                    placeholder="3"
                    value={formData.income.totalHouseholdMembersIncomeSupports}
                    onChange={handleInputChange}
                    required
                />
            </div>
        </div>
    );
}