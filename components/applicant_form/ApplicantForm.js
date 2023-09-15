import {useEffect, useState} from "react";
import styles from "./ApplicantForm.module.css"
import form_data_auto_fill_test from "../../models/form_data_auto_fill_test";
import form_data_defaults from "../../models/form_data_defaults";
import PrimaryComponent from "../PrimaryComponent";
import LandlordComponent from "../LandlordComponent";
import DemographicComponent from "../DemographicComponent";
import ChildComponent from "../ChildComponent";
import AdultComponent from "../AdultComponent";
import AssistanceNeedComponent from "../AssistanceNeedComponent";
import TotalIncomeSupportComponent from "../TotalIncomeSupportComponent";
import {createTimeStamp} from "../../lib/util";
import {toast} from "react-toastify";

function ApplicantForm(props) {
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const { item, updateApplicant, onUpdate } = props
    const [formData, setFormData] = useState(item??form_data_defaults);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (hasUnsavedChanges) {
                event.preventDefault();
                event.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [hasUnsavedChanges]);

    useEffect( () => {
        if (item) {
            onUpdate(item)
        }
    }, [onUpdate, item, formData]);

    function handleInputChange(event) {
        setHasUnsavedChanges(true);
        const { name, value } = event.target;
        console.log(name, value);
        const newData = updateFormData({...formData}, name, value);
        setFormData(newData);
    }

    function updateFormData(formData, name, value) {
        setHasUnsavedChanges(true);
        const keys = Object.keys(formData);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];

            const currentValue = formData[key];
            if (key === name) {
                return {...formData, [key]: value};
            }

            if ( currentValue && typeof currentValue === 'object') {
                const updatedValue = updateFormData(currentValue, name, value);
                if (updatedValue !== currentValue) {
                    return {...formData, [key]: updatedValue};
                }
            }
        }
        return formData;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        formData.timestamp = createTimeStamp();
        await fetch("/api/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                data: formData,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Check if application was created successfully
                if (data && data._id) {
                    toast.success('Application created successfully!')
                    setHasUnsavedChanges(false);
                } else {
                    // If data is not valid, display a toast error
                    toast.error('Error creating client\'s application');
                }
            })
            .catch((error) => {
                console.error("Error creating application. Error: ", error);
                toast.error('Error creating client\'s application');
            });
    }

    return (
        <div className={"mt-4"}>
            <form onSubmit={handleSubmit}>
                <div className={`${styles.componentWrapper} border-2 border-black p-4 box m-4`}>
                    <label htmlFor='interviewer'>Interviewer Name *:</label>
                    <input
                        type='text'
                        id='interviewer'
                        name='interviewer'
                        placeholder='Interviewer first and last name'
                        value={formData?.interviewer??''}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={`${styles.componentWrapper} border-2 border-black p-4 box m-4`}>
                    <AssistanceNeedComponent formData={formData} onComponentInputChange={handleInputChange}/>
                </div>
                <div className={`${styles.componentWrapper} border-2 border-black p-4 box m-4`}>
                    <PrimaryComponent formData={formData} onComponentInputChange={handleInputChange}/>
                </div>
                <div className={`${styles.componentWrapper} border-2 border-black p-4 box m-4`}>
                    <ChildComponent formData={formData} onComponentInputChange={handleInputChange}/>
                </div>
                <div className={`${styles.componentWrapper} border-2 border-black p-4 box m-4`}>
                    <AdultComponent formData={formData} onComponentInputChange={handleInputChange}/>
                </div>
                <div className={`${styles.componentWrapper} border-2 border-black p-4 box m-4`}>
                    <TotalIncomeSupportComponent formData={formData} onComponentInputChange={handleInputChange}/>
                </div>
                <div className={`${styles.componentWrapper} border-2 border-black p-4 box m-4`}>
                    <DemographicComponent formData={formData} onComponentInputChange={handleInputChange}/>
                </div>
                <div className={`${styles.componentWrapper} border-2 border-black p-4 box m-4`}>
                    <LandlordComponent formData={formData} onComponentInputChange={handleInputChange}/>
                </div>
                { !item &&
                    (
                        <div>
                            <button
                                type="submit"
                                className={styles.submitButton}
                            >
                                SAVE RECORD
                            </button>
                        </div>
                    )
                }
                { item &&
                    (
                        <div>
                            <button
                                type="button"
                                onClick={ async ()  => {
                                    await updateApplicant(formData)
                                        .then(r => {
                                            if (onUpdate && r) {
                                                onUpdate(r.record);
                                            }
                                        })

                                }}
                                className={styles.submitButton}
                            >
                                UPDATE RECORD
                            </button>
                        </div>
                    )
                }
            </form>
        </div>
    );
}

export default ApplicantForm;