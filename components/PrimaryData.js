import styles from "./applicant_form/ApplicantForm.module.css";




export default function PrimaryData( { formData, onComponentInputChange }) {

    const handleInputChange = (event) => {
        onComponentInputChange(event)
    }

    return (
        <div>
            <div className={styles.inputWrapper}>
                <label htmlFor="f-name-input">First Name:</label>
                <input
                    type="text"
                    id="f-name-input"
                    name="fName"
                    placeholder="Gary"
                    value={formData.fName}
                    onChange={handleInputChange}
                    required
                />

            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="mi-input">Middle Initial:</label>
                <input
                    type="text"
                    id="middle-initial-input"
                    name="middleInitial"
                    placeholder="M"
                    value={formData.middleInitial}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="l-name-input">Last Name:</label>
                <input
                    type="text"
                    id="l-name-input"
                    name="lName"
                    placeholder="Larson"
                    value={formData.lName}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="social-sec-input">Social Security Last Four:</label>
                <input
                    type="number"
                    id="social-sec-input"
                    name="socialSecLastFour"
                    placeholder="1234"
                    value={formData.socialSecLastFour}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="last-help-date-input">Last Help Date:</label>
                <input
                    type="date"
                    id="last-help-date-input"
                    name="lastHelpDate"
                    value={formData.lastHelpDate}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="household-income-input">Monthly Household Income:</label>
                <input
                    type="number"
                    id="household-income-input"
                    name="monthlyHouseholdIncome"
                    placeholder="100000"
                    value={formData.monthlyHouseholdIncome}
                    onChange={handleInputChange}
                    required
                />
            </div>
        </div>
    );
}

