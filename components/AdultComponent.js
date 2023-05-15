import { useState } from "react";
import styles from "./applicant_form/ApplicantForm.module.css";
import style from "./AdultComponent.module.css"

export default function AdultComponent({ formData, onComponentInputChange }) {
    const [adultCount, setAdultCount] = useState(0);
    const [adults, setAdults] = useState(formData.otherAdults.adults || [])
    const [isOtherAdults, setIsOtherAdults] = useState(false);

    const handleInputChange = (event, index) => {
        const { name, value } = event.target;

        // Update the isOtherAdultsAtResidence field
        if (name === 'isOtherAdultsAtResidence') {

            const newValue = value === 'true';
            setIsOtherAdults(newValue);
            if (!newValue) {
                setAdults([]);
                // clears adult data
                onComponentInputChange({
                    target: {
                        name: "otherAdults",
                        value: {
                            ...formData.otherAdults,
                            isOtherAdultsAtResidence: newValue,
                            adults: [],

                        },
                    },
                });
            } else {
                onComponentInputChange({
                    target: {
                        name,
                        value: newValue
                    }
                });
            }

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
        setAdults(updatedOtherAdults);
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
        const updatedOtherAdults = [...adults]
        updatedOtherAdults.splice(index, 1)
        setAdults(updatedOtherAdults)
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

    return (
        <div>
            <h1> Other Adult Information</h1>
            <div className={styles.inputWrapper}>
                <label htmlFor="adults">{'Is there other adults living at applicant\'s residence?'}</label>
                <select
                    className={'mb-4'}
                    id="adults"
                    name="isOtherAdultsAtResidence"
                    value={formData.otherAdults.isOtherAdultsAtResidence.toString()}
                    onChange={(event) => handleInputChange(event, null)}
                >
                    <option value={'false'}>No</option>
                    <option value={'true'}>Yes</option>
                </select>
            </div>
                {isOtherAdults && (
                    <div className={styles.inputWrapper}>
                    {formData.otherAdults.adults.map((adult, index) => (
                        <div key={index}>
                            <div className={'flex items-center'}>
                                <h2 className={'mr-36 font-bold'}>Adult {index + 1} At Residence</h2>
                                <button className={`${style.removeButton} `} type="button" onClick={() => handleRemoveAdult(index)}>
                                    Remove Adult
                                </button>
                            </div>
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
                            <div className={`${styles.inputWrapper}`}>
                                <label htmlFor={`relationshipToAdult-${index}`}>Relation to Applicant</label>
                                <select
                                    id={`relationshipToAdult-${index}`}
                                    name="relationshipToAdult"
                                    className={'mb-4'}
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
                <button className={`${style.addAdultButton}`} type="button" onClick={handleAddAdult}>
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
            </div>)}
        </div>
    );
}
