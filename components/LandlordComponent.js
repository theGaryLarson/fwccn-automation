import styles from "./applicant_form/ApplicantForm.module.css";
import {useState} from "react";

export default function LandLordComponent({ formData, onComponentInputChange }) {

    const handleInputChange = (event) => {
        onComponentInputChange(event)
    }
    const [isVerified, setIsVerified] = useState(false);

    const handleCheckboxChange = () => {
        setIsVerified(!isVerified);
        const updatedLandlord = {
            ...formData.landLord,
            verified: !isVerified,
        }
        onComponentInputChange({
            target: {
                name: 'landLord',
                value: updatedLandlord
            }

        })
    };
    return (
        <div>
            <h1>Landlord Information</h1>
            <div className={styles.inputWrapper}>
                <label htmlFor="landlord-full-name">Landlord Full Name</label>
                <input
                    type="text"
                    id="landlord-full-name"
                    name="fullName"
                    placeholder="Zhāng Jìng"
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
                    name="landLordPhone"
                    placeholder="1234567890"
                    value={formData.landLord.landLordPhone}
                    pattern = "^[0-9]{10}$"
                    title = "Enter phone numbers in the following format ##########"
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="landlord-street1">Landlord Street Address Line 1</label>
                <input
                    type="text"
                    id="landlord-street1"
                    name="landLordStreet1"
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
                    name="landLordStreet2"
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
                    name="landLordCity"
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
                    name="landLordZip"
                    placeholder="98101"
                    value={formData.landLord.address.landLordZip}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.inputWrapper}>
                <input
                    type="checkbox"
                    id="landLordIsVerified"
                    className="hidden"
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="landLordIsVerified" className="flex items-center mt-4 select-none">
                <span className={` ${!isVerified ? 'bg-green-500' : ''} mr-2 border rounded border-gray-400 bg-white w-5 h-5 flex items-center justify-center `}>
                    {isVerified && '✓'}
                </span>
                    <span className='font-bold'>Verified</span>
                </label>
            </div>
        </div>
    );
}
// landlord contact and verification information