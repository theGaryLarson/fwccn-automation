import {useEffect, useState} from "react";
import styles from "./ApplicantForm.module.css"
import form_data_auto_fill_test from "../../models/form_data_auto_fill_test";
import form_data_defaults from "../../models/form_data_defaults";
import PrimaryComponent from "../PrimaryComponent";
import LandlordComponent from "../LandlordComponent";
import RaceComponent from "../RaceComponent";
import ChildComponent from "../ChildComponent";
import AdultComponent from "../AdultComponent";
import AssistanceNeedComponent from "../AssistanceNeedComponent";
import TotalIncomeSupportComponent from "../TotalIncomeSupportComponent";
import {createTimeStamp} from "../../lib/util";

function ApplicantForm(props) {
    const { item, updateApplicant, onUpdate } = props
    const [formData, setFormData] = useState(item??form_data_defaults);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect( () => {
        if (item) {
            onUpdate(item)
        }
    }, [onUpdate, item, formData]);

    function handleInputChange(event) {
        const {name, value} = event.target;
        const newData = updateFormData({...formData}, name, value);
        setFormData(newData);
    }

    function updateFormData(formData, name, value) {
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
                //check if data was loaded successfully
                if (data && data._id) {
                    setIsDataLoaded(true);
                }

        })
            .catch((error) => {
                console.error("Error loading data:", error)
                setIsDataLoaded(false);
            });
    }

    return (
        <div className={"mt-4"}>
            <form onSubmit={handleSubmit}>
                <div className={`${styles.componentWrapper} border-2 border-black p-4 box m-4`}>
                    <label htmlFor='interviewer'>Interviewer Name:</label>
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
                {/*<div className={`${styles.inputWrapper} border-2 border-black p-4 box m-4`}>*/}
                {/*    <IncomeComponent formData={formData} onComponentInputChange={handleInputChange}/>*/}
                {/*</div>*/}
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
                    <RaceComponent formData={formData} onComponentInputChange={handleInputChange}/>
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
                                            if (onUpdate) {
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
            {/*todo: fix how submission message is rendered*/}
            {isDataLoaded && (
                <div>Data loaded successfully!</div>
            )}
            {/*{!isDataLoaded && (*/}
            {/*    <div>Error loading data. Please try again.</div>*/}
            {/*)}*/}
        </div>
    );
}

export default ApplicantForm;