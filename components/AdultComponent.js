import { useState } from "react";
import styles from "./applicant_form/ApplicantForm.module.css";

export default function AdultComponent({ formData, onComponentInputChange }) {
    const [adultCount, setAdultCount] = useState(1);

    const handleInputChange = (event, index) => {
        const { name, value } = event.target;

        // Update the isOtherAdultsAtResidence field
        if (name === 'isOtherAdultsAtResidence') {
            onComponentInputChange({
                target: {
                    name,
                    value: value === 'true'
                }
            });
        } else {
            // Update the array of adults
            const updatedOtherAdults = formData.otherAdults.adults.map((adult, i) => {
                if (i === index) {
                    return {
                        ...adult,
                        [name]: value
                    };
                }
                return adult;
            });

            onComponentInputChange({
                target: {
                    name: 'otherAdults',
                    value: {
                        ...formData.otherAdults,
                        adults: updatedOtherAdults
                    }
                }
            });
        }
    };

    const handleAddAdult = () => {
        const newAdult = {
            adultFName: "",
            adultMiddleInitial: "",
            adultLName: "",
            adultGender: "",
            adultAge: 0,
            relationshipToAdult: ""
        };

        const updatedOtherAdults = [...formData.otherAdults.adults, newAdult];
        onComponentInputChange({
            target: {
                name: "otherAdults",
                value: {
                    ...formData.otherAdults,
                    adults: updatedOtherAdults
                }
            }
        });

        setAdultCount(adultCount + 1);
    };

    const handleRemoveAdult = (index) => {
        const updatedOtherAdults = formData.otherAdults.adults.filter((_, i) => i !== index);
        onComponentInputChange({
            target: {
                name: "otherAdults",
                value: {
                    ...formData.otherAdults,
                    adults: updatedOtherAdults
                }
            }
        });
    };

    function isOtherAdults() {
        return formData.otherAdults.isOtherAdultsAtResidence;
    }

    return (
        <div>
            <div className={styles.inputWrapper}>
                <label htmlFor="adults">Is there other adults living at applicants residence?</label>
                <select
                    id="adults"
                    name="isOtherAdultsAtResidence"
                    value={formData.otherAdults.isOtherAdultsAtResidence.toString()}
                    onChange={(event) => handleInputChange(event, null)}
                >
                    <option value={'false'}>No</option>
                    <option value={'true'}>Yes</option>
                </select>
            </div>
            {isOtherAdults() && <div className={styles.inputWrapper}>
            {formData.otherAdults.adults.map((adult, index) => (
                <div key={index}>
                    <button type="button" onClick={() => handleRemoveAdult(index)}>
                        Remove Adult {index + 1}
                    </button>
                    <hr/>
                    <h1 className={"font-bold"}>Adult {index + 1} At Residence</h1>
                    <div className={styles.inputWrapper}>
                        <label htmlFor={`adultFName-${index}`}>First name</label>
                        <input
                            type="text"
                            id={`adultFName-${index}`}
                            name="adultFName"
                            value={adult.adultFName}
                            onChange={(event) => handleInputChange(event, index)}
                            required
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor={`adultMiddleInitial-${index}`}>Middle Initial</label>
                        <input
                            type="text"
                            id={`adultMiddleInitial-${index}`}
                            name="adultMiddleInitial"
                            value={adult.adultMiddleInitial}
                            onChange={(event) => handleInputChange(event, index)}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor={`adultLName-${index}`}>Last Name</label>
                        <input
                            type="text"
                            id={`adultLName-${index}`}
                            name="adultLName"
                            value={adult.adultLName}
                            onChange={(event) => handleInputChange(event, index)}
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
                            onChange={(event) => handleInputChange(event, index)}
                            required
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor={`adultGender-${index}`}>Gender</label>
                        <select
                            id={`adultGender-${index}`}
                            name="adultGender"
                            value={adult.adultGender}
                            onChange={(event) => handleInputChange(event, index)}
                            required
                        >
                            <option value={'female'}>female</option>
                            <option value={'male'}>male</option>
                            <option value={'nonbinary'}>nonbinary</option>
                        </select>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor={`relationshipToAdult-${index}`}>Relation to Applicant</label>
                        <select
                            id={`relationshipToAdult-${index}`}
                            name="relationshipToAdult"
                            value={adult.relationshipToAdult}
                            onChange={(event) => handleInputChange(event, index)}
                            required
                        >
                            <option value={'spouse'}>spouse</option>
                            <option value={'roommate'}>roommate</option>
                            <option value={'relative'}>relative</option>
                        </select>
                    </div>
                </div>
            ))}

            {/* Button to add a new adult */}
            <button type="button" onClick={handleAddAdult}>
                Add Adult
            </button>

            {/* Displaying each adult and their info */}
            {/*<div>*/}
            {/*    <h3>Other Adults:</h3>*/}
            {/*    {formData.otherAdults.adults.map((adult, index) => (*/}
            {/*        <div key={index}>*/}
            {/*            <p>*/}
            {/*                <strong>Adult {index + 1}:</strong> {adult.adultFName} {adult.adultMiddleInitial + '.'} {adult.adultLName}*/}
            {/*            </p>*/}
            {/*            <p>Age: {adult.adultAge}</p>*/}
            {/*            <p>Gender: {adult.adultGender}</p>*/}
            {/*            <p>Relationship to Adult: {adult.relationshipToAdult}</p>*/}
            {/*            <hr />*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}
        </div>}
        </div>
    );
}
