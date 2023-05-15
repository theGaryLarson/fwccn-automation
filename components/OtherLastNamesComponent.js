import styles from "./applicant_form/ApplicantForm.module.css";
import {useState} from "react";
import style from "./AdultComponent.module.css";

// applicant race information
export default function OtherLastNamesComponent({formData, onComponentInputChange }) {
    const [hasOtherNames, setHasOtherNames] = useState(formData.otherNames.hasOtherNames || false)
    const [otherNames, setOtherNames] = useState(formData.otherNames.additionalNames || [])
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        if (name === 'hasOtherNames') {
            const booleanValue = value === 'true';
            setHasOtherNames(booleanValue)
            if (!booleanValue) {
                setOtherNames([])
                // clear other names data
                onComponentInputChange({
                    target: {
                        name: 'otherNames',
                        value: {
                            ...formData.otherNames,
                            hasOtherNames: booleanValue,
                            additionalNames: []
                        }
                    }
                })
            } else {
                onComponentInputChange({
                    target: {
                        name: name,
                        value: booleanValue
                    }
                });
            }


        } else {
            const updateOtherNames = formData.otherNames.additionalNames
        }

    }

    const handleAddName = () => {
        const otherName = {
            otherFirstName: '',
            otherMiddleInitial: '',
            otherLastName: '',
        };

        const updatedNames = [...formData.otherNames.additionalNames, otherName];
        setOtherNames(updatedNames);
        onComponentInputChange({
            target: {
                name: "otherNames",
                value: {
                    ...formData.otherNames,
                    additionalNames: updatedNames
                }
            }
        });

    };

    const handleRemoveName = (index) => {
        const updatedNames = [...otherNames]
        updatedNames.splice(index, 1)
        setOtherNames(updatedNames)
        onComponentInputChange({
            target: {
                name: "otherNames",
                value: {
                    ...formData.otherNames,
                    additionalNames: updatedNames
                }
            }
        });
    };

    return (
        <div>
            <div className={`${styles.inputWrapper} mt-4`}>
                <label htmlFor="otherLastNames">Have you gone by any other names?</label>
                <select
                    id="otherLastNames"
                    name="hasOtherNames"
                    value={formData.otherNames.hasOtherNames.toString()}
                    onChange={handleInputChange}
                    required
                >
                    <option value={'false'}>No</option>
                    <option value={'true'}>Yes</option>
                </select>
            </div>
            {hasOtherNames &&(
                <div className={styles.inputWrapper}>
                    {formData.otherNames.additionalNames.map((otherName, index) => (
                        <div key = {index}>
                            <div className={'flex items-center'}>
                                <h2 className={'mr-36 font-bold'}>{index}: Additional Name</h2>
                                <button className={`${styles.removeButton}`} type={'button'} onClick={() => handleRemoveName(index)}>
                                    Remove Name
                                </button>
                            </div>
                            <div className={styles.inputWrapper}>
                                <label htmlFor={`otherFirstName-${index + 1}`}>Additional First Name:</label>
                                <input
                                    type="text"
                                    id={`otherFirstName-${index + 1}`}
                                    name="otherFirstName"
                                    placeholder="Larry"
                                    value={otherName.otherFirstName}
                                    onChange={handleInputChange}
                                />

                            </div>
                            <div className={styles.inputWrapper}>
                                <label htmlFor={`otherMiddleInitial-${index}`}>Middle Initial:</label>
                                <input
                                    type="text"
                                    id={`otherMiddleInitial-${index}`}
                                    name="otherMiddleInitial"
                                    placeholder="M"
                                    value={otherName.otherMiddleInitial}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.inputWrapper}>
                                <label htmlFor={`otherMiddleInitial-${index}`}>Last Name:</label>
                                <input
                                    type="text"
                                    id={`otherMiddleInitial-${index}`}
                                    name="otherLastName"
                                    placeholder="Garson"
                                    value={otherName.otherLastName}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    ))}
                    <button className={`${style.addAdultButton}`} type="button" onClick={handleAddName}>
                        Add Adult
                    </button>
                </div>)}
        </div>

    )
}
