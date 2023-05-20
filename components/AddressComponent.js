import styles from "./applicant_form/ApplicantForm.module.css";




export default function AddressComponent({ title, formData, onComponentInputChange }) {

    const handleInputChange = (event) => {
        onComponentInputChange(event)
    }

    return (
        <div>
            <h1>{title} Address</h1>
            <div className={styles.inputWrapper}>
                <label htmlFor="street-1">Street1:</label>
                <input
                    type="text"
                    id="street-1"
                    name="homeStreet1"
                    placeholder="12345 Oak St."
                    value={formData.homeAddress.homeStreet1}
                    onChange={handleInputChange}
                    required
                />

            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="street-2">Street2:</label>
                <input
                    type="text"
                    id="street-2"
                    name="homeStreet2"
                    placeholder="Apt. 100"
                    value={formData.homeAddress.homeStreet2}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="city">City:</label>
                <input
                    type="text"
                    id="city"
                    name="homeCity"
                    placeholder="Tacoma"
                    value={formData.homeAddress.homeCity}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="homeState">State:</label>
                <input
                    type="text"
                    id="city"
                    name="homeState"
                    placeholder="Tacoma"
                    pattern = '[A-Z]{2}'
                    title = 'Enter 2-letter state abbreviation'
                    value={formData.homeAddress.homeState}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className={styles.inputWrapper}>
                <label htmlFor="zipCode">Zip Code:</label>
                <input
                    type="number"
                    id="zipCode"
                    name="homeZip" // same name as json object
                    placeholder="98422"
                    value={formData.homeAddress.homeZip} // must drill down to nested object
                    onChange={handleInputChange}
                    required
                />
            </div>
        </div>
    );
}

