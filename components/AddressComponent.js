import styles from "./applicant_form/ApplicantForm.module.css";
import {useState} from "react";
import Link from "next/link";

export default function AddressComponent({ title, formData, onComponentInputChange }) {

    const [isVerified, setIsVerified] = useState(formData?.homeAddress?.verified??false);

    const handleCheckboxChange = () => {
        setIsVerified(!isVerified);
        const updateAddressVerification = {
            ...formData.homeAddress,
            verified: !isVerified,
        }
        onComponentInputChange({
            target: {
                name: 'homeAddress',
                value: updateAddressVerification
            }

        })
    };
    const handleInputChange = (event) => {
        onComponentInputChange(event)
    }

    return (
        <div className={`border-2 border-gray-600 p-4 box mt-4 mb-4`}>

            <h1>{title} Address</h1>
            <div className={styles.componentWrapper}>
                <input
                    type="checkbox"
                    id="landLordIsVerified"
                    className="hidden"
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="landLordIsVerified" className="flex items-center mt-4 select-none">
                <span className={` mr-2 border rounded border-gray-400 w-5 h-5 flex items-center justify-center ${isVerified ? 'bg-green-500' : 'bg-white'}`}>
                    {isVerified && '✓'}
                </span>
                    <span className='font-bold'>Address Verified</span>
                </label>
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="street-1">Street1 *:</label>
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
            <div className={styles.componentWrapper}>
                <label htmlFor="street-2">Street2 *:</label>
                <input
                    type="text"
                    id="street-2"
                    name="homeStreet2"
                    placeholder="Apt. 100"
                    value={formData.homeAddress.homeStreet2}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="city">City *:</label>
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
            <div className={styles.componentWrapper}>
                <label htmlFor="homeState">State *:</label>
                <input
                    type="text"
                    id="homeState"
                    name="homeState"
                    placeholder="WA"
                    pattern = '[A-Z]{2}'
                    title = 'Enter 2-letter state abbreviation'
                    value={formData.homeAddress.homeState}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className={styles.componentWrapper}>
                <label htmlFor="zipCode">Zip Code *:</label>
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
            <Link
                className="text-blue-500 hover:text-blue-700 underline"
                href={"https://gismaps.kingcounty.gov/parcelviewer2/"}
                target={"_blank"}
                rel="noopener noreferrer"
            >
                King County Parcel Viewer
            </Link>
        </div>
    );
}

