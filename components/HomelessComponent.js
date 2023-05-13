// if isHomeless, additional homelessness information
import styles from "./applicant_form/ApplicantForm.module.css";

// applicant homelessness information
export default function HomelessnessComponent({formData, onComponentInputChange}) {

    const handleInputChange = (event) => {
        onComponentInputChange(event)
    }

    function isHomeless() {
        return formData.homelessness.isHomeless === "true";
    }

    return (
        <div>
            <h1>Homeless Data</h1>
            <div className={styles.inputWrapper}>
                <label htmlFor="homeless">Are you currently homeless?</label>
                <select
                    id="homeless"
                    name="isHomeless"
                    value={formData.homelessness.isHomeless.toString()}
                    onChange={handleInputChange}
                    required
                >
                    <option value={'false'}>No</option>
                    <option value={'true'}>Yes</option>
                </select>
            </div>
            { isHomeless() && <div>
                <div className={styles.inputWrapper}>
                    <label htmlFor="durationXpHomelessness">How many days have you been experiencing homelessness?</label>
                   <input
                        type="number"
                        id="durationXpHomelessness"
                        name="durationXpHomelessness"
                        value={formData.homelessness.durationXpHomelessness}
                        onChange={handleInputChange}
                        required={isHomeless()}
                        disabled={!isHomeless()}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <label className={styles.textAreaLabel} htmlFor="whyHomeless">Why are you homeless?</label>
                    <textarea
                        id="whyHomeless"
                        name="whyHomeless"
                        value={formData.homelessness.whyHomeless}
                        onChange={handleInputChange}
                        required={formData.homelessness.isHomeless}
                        disabled={!formData.homelessness.isHomeless}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor="street1">Temporary Address (if applicable): Street 1</label>
                    <input
                        type="text"
                        id="street1"
                        name="street1"
                        value={formData.homelessness.tempAddress.street1}
                        onChange={handleInputChange}
                        required={formData.homelessness.isHomeless}
                        disabled={!formData.homelessness.isHomeless}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor="street2">Temporary Address: Street 2 (optional)</label>
                    <input
                        type="text"
                        id="street2"
                        name="street2"
                        value={formData.homelessness.tempAddress.street2}
                        onChange={handleInputChange}
                        required={formData.homelessness.isHomeless}
                        disabled={!formData.homelessness.isHomeless}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor="city">Temporary Address: City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.homelessness.tempAddress.city}
                        onChange={handleInputChange}
                        required={formData.homelessness.isHomeless}
                        disabled={!formData.homelessness.isHomeless}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor="state">Temporary Address: State</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.homelessness.tempAddress.state}
                        onChange={handleInputChange}
                        required={formData.homelessness.isHomeless}
                        disabled={!formData.homelessness.isHomeless}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor="zip">Temporary Address: ZIP code</label>
                    <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={formData.homelessness.tempAddress.zip}
                        onChange={handleInputChange}
                        required={formData.homelessness.isHomeless}
                        disabled={!formData.homelessness.isHomeless}
                    />
                </div>
            </div>}
        </div>

    )
}