import {useEffect, useState} from "react";
import styles from "./ApplicantForm.module.css"
import form_data_defaults from "../../models/form_data_defaults";
import PrimaryComponent from "../PrimaryComponent";
import LandlordComponent from "../LandlordComponent";
import RaceComponent from "../RaceComponent";
import ChildComponent from "../ChildComponent";
import AdultComponent from "../AdultComponent";
import AssistanceNeedComponent from "../AssistanceNeedComponent";
import TotalIncomeSupportComponent from "../TotalIncomeSupportComponent";
import {createTimeStamp} from "../../lib/util";


// the form checks the database type through the fetch method using the api/data route.
// where the data.js folder contains two connections. one local mysql connection and another cloud-based


// mongodb connection
function ApplicantForm(props) {
    const { item } = props
    // todo: import Applicant model and modify with useState [applicant, setApplicant]
    const [formData, setFormData] = useState(form_data_defaults);
    const [isValid, setIsValid] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    function handleInputChange(event) {
        //todo: modify Applicant model here
        const {name, value} = event.target;
        const newData = updateFormData(formData, name, value);
        setFormData(newData);

        // todo: modify boolean value based on client-input validation
        setIsValid(true);
    }

    function updateFormData(formData, name, value) {
        const keys = Object.keys(formData);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];

            const currentValue = formData[key];

            if (key === name) {
                return {...formData, [key]: value};
            }

            if (typeof currentValue === 'object') {
                const updatedValue = updateFormData(currentValue, name, value);
                if (updatedValue !== currentValue) {
                    return {...formData, [key]: updatedValue};
                }
            }
        }

        return formData;
    }

    // These methods update changes as soon as they are made rather than on the next render which happens by default
    // Will be great for validation and the final commit to the database.
    useEffect(() => {
    }, [formData]);

    useEffect( () => {
        if (item) {
            setFormData(item)
        }
    }, [item])
    async function handleSubmit(event) {
        event.preventDefault();
        formData.timestamp = createTimeStamp();
        console.log("SUBMITTED")
        // todo: validate each input using input attributes
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
                        value={formData.interviewer}
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
                            <button className={styles.submitButton} type="submit" disabled={!isValid}>Submit</button>
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