import styles from "./applicant_form/ApplicantForm.module.css";
import {useState} from "react";
import style from "./AdultComponent.module.css";
import { ordinalNumber } from "../lib/util";

export default function OtherLastNamesComponent({formData, onComponentInputChange }) {
    const [hasOtherNames, setHasOtherNames] = useState(formData?.otherNames?.hasOtherNames ?? false)
    const [otherNames, setOtherNames] = useState(formData?.otherNames?.additionalNames ?? [])
    const handleInputChange = (event, index) => {
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
        } else if (index !== null) {
            const updateOtherNames = formData?.otherNames?.additionalNames?.map((otherName, i) => {
                if (i === index) {
                    return {
                        ...otherName,
                        [name]: value
                    };
                }
                return otherName;
            });
            onComponentInputChange({
                target: {
                    name: 'otherNames',
                    value: {
                        ...formData.otherNames,
                        additionalNames: updateOtherNames
                    }
                }
            });
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
        <div className={`border-2 border-gray-600 p-4 box mt-4 mb-4`}>
            <h1>Additional Names</h1>
            <div className={`${styles.componentWrapper} `}>
                <label htmlFor="otherLastNames">Have you gone by any other names?</label>
                <select
                    id="otherLastNames"
                    name="hasOtherNames"
                    value={formData?.otherNames?.hasOtherNames?.toString() ?? ''}
                    onChange={(event) => handleInputChange(event, null)}
                    required
                >
                    <option value={'false'}>No</option>
                    <option value={'true'}>Yes</option>
                </select>
            </div>
            {hasOtherNames &&(
                <div className={styles.componentWrapper}>
                    {formData?.otherNames?.additionalNames?.map((otherName, index) => (
                        <div key = {index}>
                            <div className={'flex items-center'}>
                                <h2 className={'w-full whitespace-nowrap mr-18 font-bold'}>{ordinalNumber(index)} Additional Name</h2>
                                <button className={`${styles.removeButton} mt-4`} type={'button'} onClick={() => handleRemoveName(index)}>
                                    Remove Name
                                </button>
                            </div>
                            <div className={styles.componentWrapper}>
                                <label htmlFor={`otherFirstName-${index}`}>First Name:</label>
                                <input
                                    type="text"
                                    id={`otherFirstName-${index}`}
                                    name="otherFirstName"
                                    placeholder="Larry"
                                    value={otherName?.otherFirstName}
                                    onChange={(event) => handleInputChange(event, index)}
                                    className={'pl-1'}
                                />
                            </div>
                            <div className={styles.componentWrapper}>
                                <label htmlFor={`otherMiddleInitial-${index}`}>Middle Initial:</label>
                                <input
                                    type="text"
                                    id={`otherMiddleInitial-${index}`}
                                    name="otherMiddleInitial"
                                    placeholder="M"
                                    value={otherName?.otherMiddleInitial}
                                    onChange={(event) => handleInputChange(event, index)}
                                    className={'pl-1'}
                                />
                            </div>
                            <div className={styles.componentWrapper}>
                                <label htmlFor={`otherLastName-${index}`}>Last Name:</label>
                                <input
                                    type="text"
                                    id={`otherLastName-${index}`}
                                    name="otherLastName"
                                    placeholder="Garson"
                                    value={otherName?.otherLastName}
                                    onChange={(event) => handleInputChange(event, index)}
                                    className={'pl-1'}
                                />
                            </div>
                        </div>
                    ))}
                    <button className={`${style.addButton} mt-4`} type="button" onClick={handleAddName}>
                        Add Name
                    </button>
                </div>)}
        </div>

    )
}
