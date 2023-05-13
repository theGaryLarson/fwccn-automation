import styles from "./applicant_form/ApplicantForm.module.css";
import AddressComponent from "./AddressComponent";
import HomelessnessComponent from "./HomelessComponent";
import IncomeComponent from "./IncomeComponent";
import ChildComponent from "./ChildComponent";
import AdultComponent from "./AdultComponent";



// applicant contact and identifying information
export default function PrimaryComponent({ formData, onComponentInputChange }) {

    const handleInputChange = (event) => {
        onComponentInputChange(event)
    }

    return (
        <div className={`border-2 border-black p-4 box m-4`}>
            <div className={styles.inputWrapper}>
                <label htmlFor="f-name-input">First Name:</label>
                <input
                    type="text"
                    id="f-name-input"
                    name="fName"
                    placeholder="Larry"
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
                    placeholder="Garson"
                    value={formData.lName}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="applicant-phone">Phone Number:</label>
                <input
                    type="text"
                    id="applicant-phone"
                    name="phone"
                    placeholder="1234567890"
                    value={formData.phone}
                    pattern="[0-9]{10}"
                    title="Please enter 10 digit phone number. (e.g. 1234567890)"
                    onChange={handleInputChange}
                    required
                />
            </div>
            <IncomeComponent formData={formData} onComponentInputChange={handleInputChange}/>
            <div className={styles.inputWrapper}>
                <label htmlFor="has-disability">Do you suffer from a disability?</label>
                <select
                    id="has-disability"
                    name="disabled"
                    value={formData.disabled}
                    onChange={handleInputChange}
                >
                    <option value={"false"}>no</option>
                    <option value={"true"}>yes</option>
                </select>
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="identification">State Identification Or License:</label>
                <input
                    type="text"
                    id="identification"
                    name="driverLicenseOrId"
                    placeholder="WDLARSOGM197PD"
                    value={formData.driverLicenseOrId}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="id-expiration-date">Expiration Date:</label>
                <input
                    type="date"
                    id="id-expiration-date"
                    name="expDate"
                    placeholder="WDLARSOGM197PD"
                    value={formData.expDate}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="social-sec-input">Social Security Last Four:</label>
                <input
                    type="text"
                    id="social-sec-input"
                    name="socialSecLastFour" // same name as json object
                    placeholder="1234"
                    pattern='^[0-9]{4}'
                    title="Enter only the last four digits of applicant's social security number (e.g. 1234)"
                    value={formData.idSource.socialSecLastFour} // must drill down to nested object
                    onChange={handleInputChange}
                    required
                />
            </div>
            <HomelessnessComponent formData={formData} onComponentInputChange={handleInputChange}/>
            {formData.homelessness.isHomeless === 'false' && <AddressComponent title="Home" formData={formData} onComponentInputChange={handleInputChange}/>}
        </div>
    );
}

