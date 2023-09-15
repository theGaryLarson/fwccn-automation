import styles from "./applicant_form/ApplicantForm.module.css";
export default function LandLordComponent({ formData, onComponentInputChange }) {

    const handleInputChange = (event) => {
        onComponentInputChange(event)
    }

    return (
        <div>
            <h1>Landlord Information</h1>
            <div className={styles.componentWrapper}>
                <label htmlFor="landlord-full-name">Landlord Full Name</label>
                <input
                    type="text"
                    id="landlord-full-name"
                    name="fullName"
                    placeholder="Zhāng Jìng"
                    value={formData?.landLord?.fullName??''}
                    onChange={handleInputChange}
                    className={'pl-1'}
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="landlord-phone">Landlord Phone Number</label>
                <input
                    type="tel"
                    id="landlord-phone"
                    name="landLordPhone"
                    placeholder="1234567890"
                    value={formData?.landLord?.landLordPhone??''}
                    pattern = "^[0-9]{10}$"
                    title = "Enter phone numbers in the following format ##########"
                    onChange={handleInputChange}
                    className={'pl-1'}
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="landlord-street1">Landlord Street Address Line 1</label>
                <input
                    type="text"
                    id="landlord-street1"
                    name="landLordStreet1"
                    placeholder="123 Main St"
                    value={formData?.landLord?.landLordAddress?.landLordStreet1??''}
                    onChange={handleInputChange}
                    className={'pl-1'}
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="landlord-street2">Landlord Street Address Line 2</label>
                <input
                    type="text"
                    id="landlord-street2"
                    name="landLordStreet2"
                    placeholder="Apt. 100"
                    value={formData?.landLord?.landLordAddress?.landLordStreet2??''}
                    onChange={handleInputChange}
                    className={'pl-1'}
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="landlord-city">Landlord City</label>
                <input
                    type="text"
                    id="landlord-city"
                    name="landLordCity"
                    placeholder="Seattle"
                    value={formData?.landLord?.landLordAddress?.landLordCity??''}
                    onChange={handleInputChange}
                    className={'pl-1'}
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="landlord-state">Landlord State</label>
                <input
                    type="text"
                    id="landlord-state"
                    name="landLordState"
                    placeholder="WA"
                    value={formData?.landLord?.landLordAddress?.landLordState??''}
                    onChange={handleInputChange}
                    className={'pl-1'}
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="landlord-zip">Landlord Zip Code</label>
                <input
                    type="number"
                    id="landlord-zip"
                    name="landLordZip"
                    placeholder="98101"
                    value={formData?.landLord?.landLordAddress?.landLordZip??''}
                    onChange={handleInputChange}
                    className={'pl-1'}
                />
            </div>
        </div>
    );
}
// landlord contact and verification information