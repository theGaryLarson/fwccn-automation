import styles from "./applicant_form/ApplicantForm.module.css";
import AddressComponent from "./AddressComponent";
import IncomeComponent from "./IncomeComponent";



// applicant contact and identifying information
export default function PrimaryComponent({ formData, onComponentInputChange }) {

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
                <label htmlFor="middle-initial-input">Middle Initial:</label>
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
                <label htmlFor="phone-input">Phone Number:</label>
                <input
                    type="text"
                    id="phone-input"
                    name="phone"
                    placeholder="###-###-####"
                    value={formData.phone}
                    onChange={handleInputChange}
                    pattern="^[0-9]{3}-[0-9]{3}-[0-9]{4}$"
                    title={"Please enter phone number in ###-###-#### format."}
                />
            </div>
            <IncomeComponent formData={formData} onComponentInputChange={onComponentInputChange}/>
            {/*todo: figure out how you are going to implememnt the different form functions disability radio button here*/}
            <div className={styles.inputWrapper}>
                <label htmlFor="picture-id">License/ID:</label>
                <input
                    type="text"
                    id="picture-id"
                    name="driverLicenseOrId"
                    placeholder=""
                    value={formData.idSource.driverLicenseOrId}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="social-sec-input">Social Security Last Four:</label>
                <input
                    type="number"
                    id="social-sec-input"
                    name="socialSecLastFour" // same name as json object
                    placeholder="1234"
                    value={formData.idSource.socialSecLastFour} // must drill down to nested object
                    onChange={handleInputChange}
                    required
                />
            </div>
            {/*todo: figure out how you are going to implememnt the different form functions experiencing homelessness radio button here*/}
            <AddressComponent title="Home" formData={formData} onComponentInputChange={handleInputChange}/>
            {/*<RentAssistanceComponent></RentAssistanceComponent>*/}
            {/*<ChildComponent></ChildComponent>*/}
            {/*<AdultComponent></AdultComponent>*/}
            {/*<TotalIncomeSupportComponent></TotalIncomeSupportComponent>*/}
            {/*<RaceComponent></RaceComponent>*/}
        </div>
    );
}

