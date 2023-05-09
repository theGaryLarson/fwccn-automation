import styles from "./applicant_form/ApplicantForm.module.css";

export default function LandLordComponent({ formData, onComponentInputChange }) {

    const handleInputChange = (event) => {
        onComponentInputChange(event)
    }

    return (
        <div>
            <div className={styles.inputWrapper}>
                <label htmlFor="landlord-full-name">Landlord Full Name</label>
                <input
                    type="text"
                    id="landlord-full-name"
                    name="landLord.fullName"
                    placeholder="John Smith"
                    value={formData.landLord.fullName}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="landlord-phone">Landlord Phone Number</label>
                <input
                    type="tel"
                    id="landlord-phone"
                    name="landLord.landLordPhone"
                    placeholder="123-456-7890"
                    value={formData.landLord.landLordPhone}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="landlord-street1">Landlord Street Address Line 1</label>
                <input
                    type="text"
                    id="landlord-street1"
                    name="landLord.address.landLordStreet1"
                    placeholder="123 Main St"
                    value={formData.landLord.address.landLordStreet1}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="landlord-street2">Landlord Street Address Line 2</label>
                <input
                    type="text"
                    id="landlord-street2"
                    name="landLord.address.landLordStreet2"
                    placeholder="Apt. 100"
                    value={formData.landLord.address.landLordStreet2}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="landlord-city">Landlord City</label>
                <input
                    type="text"
                    id="landlord-city"
                    name="landLord.address.landLordCity"
                    placeholder="Seattle"
                    value={formData.landLord.address.landLordCity}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="landlord-zip">Landlord Zip Code</label>
                <input
                    type="number"
                    id="landlord-zip"
                    name="landLord.address.landLordZip"
                    placeholder="98101"
                    value={formData.landLord.address.landLordZip}
                    onChange={handleInputChange}
                    required
                />
            </div>
        </div>
    );
}
// landlord contact and verification information