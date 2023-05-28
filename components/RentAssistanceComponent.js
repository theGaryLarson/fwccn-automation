// section 8 and other rental assistance information
// cash assistance is reduced for members on assistance
import {useState} from "react";
import {ordinalNumber} from "../lib/util";
import styles from "./applicant_form/ApplicantForm.module.css";
import style from "./RentAssistanceComponent.module.css"

export default function RentAssistanceComponent({ formData, onComponentInputChange }) {
    const [assistancePrograms, setAssistancePrograms] = useState(formData.rentAssistance.otherAssistance || []);
    const [hasSection8, setHasSection8] = useState(formData.rentAssistance.hasSection8Assistance || false)
    const [hasRentAssistance, setHasRentAssistance] = useState(
        formData.rentAssistance.hasRentAssistance || false
    );
    const handleInputChange = (event, index) => {
        const { name, value } = event.target;
        if (name === "hasRentAssistance") {
            const newValue = value === "true";
            setHasRentAssistance(newValue);
            if (!newValue) {
                // Clear the otherAssistance data when there is no other assistance
                setAssistancePrograms([])
                onComponentInputChange({
                    target: {
                        name: "rentAssistance",
                        value: {
                            ...formData.rentAssistance,
                            hasRentAssistance: newValue,
                            hasSection8Assistance: false,
                            monthlyRentPaidBySection8: 0,
                            otherAssistance: []
                        },
                    },
                });
            } else {
                onComponentInputChange({
                    target: {
                        name: "rentAssistance",
                        value: {
                            ...formData.rentAssistance,
                            hasRentAssistance: newValue,
                        },
                    },
                });
            }
        } else if (name === 'rentAssistanceProgram' || name === 'amountPaidByProgram'){
            // Update the array of rent assistance programs
            const updatedRentAssistance = formData.rentAssistance.otherAssistance.map((program, i) => {
                if (i === index) {
                    return {
                        ...program,
                        [name]: value
                    };
                }
                return program;
            });
            setAssistancePrograms(updatedRentAssistance)
            onComponentInputChange({
                target: {
                    name: 'rentAssistance',
                    value: {
                        ...formData.rentAssistance,
                        otherAssistance: updatedRentAssistance
                    }
                }
            });
        } else if (name === 'hasSection8Assistance') {
            const newValue = value === "true";
            setHasSection8(newValue);
            onComponentInputChange({
                target: {
                    name: "rentAssistance",
                    value: {
                        ...formData.rentAssistance,
                        hasSection8Assistance: newValue,
                    },
                },
            });
        } else {
            onComponentInputChange(event);
        }
    };
    const handleAddRentAssistanceProgram = () => {
        const newAssistanceProgram = {
            rentAssistanceProgram: '',
            amountPaidByProgram: 0
        };
        const updatedAssistancePrograms = [...formData.rentAssistance.otherAssistance, newAssistanceProgram]
        setAssistancePrograms(updatedAssistancePrograms);
        onComponentInputChange({
            target: {
                name: "rentAssistance",
                value: {
                    ...formData.rentAssistance,
                    otherAssistance: updatedAssistancePrograms
                }
            }
        });
    };
    const handleRemoveRentAssistanceProgram = (index) => {
        const updatedAssistancePrograms = [...assistancePrograms];
        updatedAssistancePrograms.splice(index, 1);
        setAssistancePrograms(updatedAssistancePrograms);
        onComponentInputChange({
            target: {
                name: "rentAssistance",
                value: {
                    ...formData.rentAssistance,
                    otherAssistance: updatedAssistancePrograms
                },
            },
        });
    };
    return (
        <div className={`border-2 border-gray-600 p-4 box mt-4 mb-4`}>
            <h1>Rent Assistance Information</h1>
            <div className={styles.componentWrapper}>
                <label htmlFor="monthlyRentPaidByApplicant">{'Monthly Rent Paid By Applicant:'}</label>
                <input
                    type="text"
                    id="monthlyRentPaidByApplicant"
                    name="monthlyRentPaidByApplicant"
                    value={formData.rentAssistance.monthlyRentPaidByApplicant}
                    onChange={(event) => handleInputChange(event, null)}
                    required
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="hasRentAssistance">{'Do you receive any form of rent assistance?'}</label>
                <select
                    className={'mb-4'}
                    id="hasRentAssistance"
                    name="hasRentAssistance"
                    value={formData.rentAssistance.hasRentAssistance.toString()}
                    onChange={(event) => handleInputChange(event, null)}
                >
                    <option value={'false'}>No</option>
                    <option value={'true'}>Yes</option>
                </select>
            </div>
            {hasRentAssistance &&  (<div id='childElements'>
                <div className={styles.componentWrapper}>
                    <label htmlFor={`hasSection8Assistance`}>{'Do you receive Section 8 (Seattle Housing Choice Voucher)?'}</label>
                    <select
                        id="hasSection8Assistance"
                        name="hasSection8Assistance"
                        value={formData.rentAssistance.hasSection8Assistance.toString()}
                        onChange={(event) => handleInputChange(event, null)}
                    >
                        <option value={'false'}>No</option>
                        <option value={'true'}>Yes</option>
                    </select>
                </div>
                    {hasSection8 && (<div className={styles.componentWrapper}>
                        <label htmlFor={`monthlyRentPaidBySection8`}>Total Rent Paid By Section 8:</label>
                        <input
                            type="number"
                            id={`monthlyRentPaidBySection8`}
                            name='monthlyRentPaidBySection8'
                            value={formData.rentAssistance.monthlyRentPaidBySection8}
                            onChange={(event) => handleInputChange(event, null)}
                            required
                        />
                    </div>)}
                {assistancePrograms.map((rentAssistance, index) => (
                    <div key={index}>
                        <div className={'flex items-center'}>
                            <h2 className={`${style.addRemoveHeader} font-bold `}>{ordinalNumber(index)} Additional Program</h2>
                            <button className={ `${style.removeButton} mt-4`} type="button" onClick={() => handleRemoveRentAssistanceProgram(index)}>
                                Remove Assistance
                            </button>
                        </div>
                        <div className={styles.componentWrapper}>
                            <label htmlFor={`rentAssistanceProgram-${index}`}>Name of Assistance Program:</label>
                            <input
                                type='text'
                                id={`rentAssistanceProgram-${index}`}
                                name="rentAssistanceProgram"
                                value={rentAssistance.rentAssistanceProgram} //assigned from map does not map to formData
                                onChange={(event) => handleInputChange(event, index)}
                                required
                            />
                        </div>
                        <div className={`${styles.componentWrapper} mb-0`}>
                            <label htmlFor={`amountPaidByProgram-${index}`}>Total Rent Paid By Program:</label>
                            <input
                                type="number"
                                id={`amountPaidByProgram-${index}`}
                                name='amountPaidByProgram'
                                value={rentAssistance.amountPaidByProgram} //assigned from map does not map to formData
                                onChange={(event) => handleInputChange(event, index)}
                                required
                            />
                        </div>
                    </div>
                ))}
                <button className={`${style.addButton} mt-4 mb-4` } type="button" onClick={handleAddRentAssistanceProgram}>
                    Add Additional Assistance
                </button>

            </div>)}
        </div>
    );
}

