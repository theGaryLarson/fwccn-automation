import styles from "./applicant_form/ApplicantForm.module.css";
import AddressComponent from "./AddressComponent";
import HomelessnessComponent from "./HomelessComponent";
import OtherLastNamesComponent from "./OtherLastNamesComponent";
import RentAssistanceComponent from "./RentAssistanceComponent";
import {useState} from "react";


// applicant contact and identifying information
export default function PrimaryComponent(props) {
    const  { formData, onComponentInputChange } = props
    const [isLicenseVerified, setIsLicenseVerified] = useState(formData.idSource?.isValidLicense ?? false)
    const [isBusPrimaryTransport, setIsBusPrimaryTransport] = useState(formData?.isBusPrimaryTransport ?? false)
    const handleInputChange = (event) => {
        onComponentInputChange(event)
    }
    const handleCheckboxChange = (event) => {
        const  name = event.target.name

        if (name === 'isValidLicense') {
            setIsLicenseVerified(!isLicenseVerified);
            const updatedLicenseVerification = {
                ...formData.idSource,
                isValidLicense: !isLicenseVerified,
            }
            onComponentInputChange({
                target: {
                    name: 'idSource',
                    value: updatedLicenseVerification
                }
            })
        } else if (name === 'isBusPrimaryTransport') {
            setIsBusPrimaryTransport(!isBusPrimaryTransport);
            onComponentInputChange({
                target: {
                    name: 'isBusPrimaryTransport',
                    value: !isBusPrimaryTransport
                }
            })
        }
    };

    return (
        <div>
            <h1>Applicant Information</h1>
            <div className={styles.componentWrapper}>
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
            <div className={styles.componentWrapper}>
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
            <div className={styles.componentWrapper}>
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
            <div className={styles.componentWrapper}>
                <label htmlFor={"applicantGender"}>Gender assigned at Birth:</label>
                <select
                    id={"applicantGender"}
                    name="applicantGender"
                    value={formData.applicantGender}
                    onChange={handleInputChange}
                    required
                >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                </select>
            </div>

            <div className={styles.componentWrapper}>
                <label htmlFor={"applicantAge"}>Applicant Age:</label>
                <input
                    type="text"
                    id={"applicantAge"}
                    name="applicantAge"
                    value={formData.applicantAge}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="applicant-phone">Phone Number:</label>
                <input
                    type="text"
                    id="applicant-phone"
                    name="phone"
                    placeholder="1234567890"
                    value={formData?.phone?? ''}
                    pattern="[0-9]{10}"
                    title="Please enter 10 digit phone number. (e.g. 1234567890)"
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.componentWrapper}>
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
            <div className={styles.componentWrapper}>
                <label htmlFor="social-sec-input">Social Security Last Four:</label>
                <input
                    type="text"
                    id="social-sec-input"
                    name="socialSecLastFour" // same name as json object
                    placeholder="1234"
                    pattern='^[0-9]{4}'
                    title="Enter only the last four digits of applicant's social security number (e.g. 1234)"
                    value={formData?.idSource?.socialSecLastFour ?? ''} // must drill down to nested object
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={`border-2 border-gray-600 p-4 box mt-4 `}>
                <div className={styles.componentWrapper}>
                    <label htmlFor="identification">{formData.helpRequested === 'gasoline' ? 'Driver\'s License:' : 'State Identification Or License:'}</label>
                    <input
                        type="text"
                        id="identification"
                        name="driverLicenseOrId"
                        placeholder="WDGARSOLM197PD"
                        value={formData?.idSource?.driverLicenseOrId ?? ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={styles.componentWrapper}>
                    <label htmlFor="idStateIssued">{'State Issued:'}</label>
                    <input
                        type="text"
                        id="idStateIssued"
                        name="idStateIssued"
                        placeholder="WA"
                        pattern={'[A-Z]{2}'}
                        title='Please enter 2 letter abbreviation for state. (e.g. WA)'
                        value={formData?.idSource?.idStateIssued ?? ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={styles.componentWrapper}>
                    <label htmlFor="id-expiration-date">Expiration Date:</label>
                    <input
                        type="date"
                        id="id-expiration-date"
                        name="expDate"
                        placeholder="WDLARSOGM197PD"
                        value={formData?.idSource?.expDate.slice(0, 10) ?? undefined} // must slice for data to load correctly needs YYY-MM-DD format
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {formData.helpRequested === 'gasoline' && (<div>
                    <div className={styles.componentWrapper}>
                        <label htmlFor="licensePlate">License Plate Number:</label>
                        <input
                            type="text"
                            id="licensePlate"
                            name="licensePlate"
                            placeholder="CBY2970"
                            value={formData?.licensePlate ?? ''}
                            onChange={handleInputChange}
                            required
                        />
                        <div className={styles.componentWrapper}>
                            <label htmlFor="licensePlateState">{'Which state issued license plate?'}</label>
                            <input
                                type="text"
                                id="licensePlateState"
                                name="licensePlateState"
                                placeholder="WA"
                                pattern={'[A-Z]{2}'}
                                title='Please enter 2 letter abbreviation for state. (e.g. WA)'
                                value={formData?.licensePlateState ?? ''}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className={styles.componentWrapper}>
                            <input
                                type="checkbox"
                                id="isValidLicense"
                                name="isValidLicense"
                                className="hidden"
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="isValidLicense" className="flex items-center mt-4 select-none">
                                <span className={` ${isLicenseVerified ? 'bg-green-500' : 'bg-white'} mr-2 border rounded border-gray-400 w-5 h-5 flex items-center justify-center `}>
                                    {isLicenseVerified && '✓'}
                                </span>
                                <span className='font-bold'> License Verified</span>
                            </label>
                        </div>

                    </div>
                </div>)}
                {(formData?.helpRequested ?? 'not busTicket' === 'busTicket') && (
                    <div className={styles.componentWrapper}>
                        <input
                            type="checkbox"
                            id="isBusPrimaryTransport"
                            name="isBusPrimaryTransport"
                            className="hidden"
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="isBusPrimaryTransport" className="flex items-center mt-4 select-none">
                                <span className={` mr-2 border rounded border-gray-400 w-5 h-5 flex items-center justify-center ${isBusPrimaryTransport ? 'bg-green-500' : 'bg-white'}`}>
                                    {isBusPrimaryTransport && '✓'}
                                </span>
                            <span className='font-bold'> Bus Primary Transport Verified</span>
                        </label>
                    </div>
                )}
            </div>
            <div className={styles.componentWrapper}>
                < OtherLastNamesComponent formData={formData} onComponentInputChange={handleInputChange} />
            </div>
            <HomelessnessComponent formData={formData} onComponentInputChange={handleInputChange}/>
            {((formData?.homelessness?.isHomeless ?? '') === "false" || (formData?.homelessness?.isHomeless ?? true) === false) && ( <AddressComponent title="Home" formData={formData} onComponentInputChange={handleInputChange}/>)}
            {(formData?.helpRequested ?? 'not rent') === 'rent' && (<RentAssistanceComponent formData={formData} onComponentInputChange={handleInputChange}/>)}
        </div>
    );
}

