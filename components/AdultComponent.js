// other adult household member info. each one will be added to the list
import styles from "./applicant_form/ApplicantForm.module.css";

// applicant other adults information
export default function OtherAdultsComponent({formData, onComponentInputChange }) {

    const handleInputChange = (event) => {
        onComponentInputChange(event)
    }

    return (
        <div>
            {formData.otherAdults.map((adult, index) => (
                <div key={index}>
                    <div className={styles.inputWrapper}>
                        <label htmlFor={`adultFName-${index}`}>First name</label>
                        <input
                            type="text"
                            id={`adultFName-${index}`}
                            name="adultFName"
                            value={adult.adultFName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor={`adultMiddleInitial-${index}`}>Middle initial</label>
                        <input
                            type="text"
                            id={`adultMiddleInitial-${index}`}
                            name="adultMiddleInitial"
                            value={adult.adultMiddleInitial}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor={`adultLName-${index}`}>Last name</label>
                        <input
                            type="text"
                            id={`adultLName-${index}`}
                            name="adultLName"
                            value={adult.adultLName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor={`adultGender-${index}`}>Gender</label>
                        <input
                            type="text"
                            id={`adultGender-${index}`}
                            name="adultGender"
                            value={adult.adultGender}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor={`adultAge-${index}`}>Age</label>
                        <input
                            type="number"
                            id={`adultAge-${index}`}
                            name="adultAge"
                            value={adult.adultAge}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor={`relationshipToAdult-${index}`}>Relationship to adult</label>
                        <input
                            type="text"
                            id={`relationshipToAdult-${index}`}
                            name="relationshipToAdult"
                            value={adult.relationshipToAdult}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
