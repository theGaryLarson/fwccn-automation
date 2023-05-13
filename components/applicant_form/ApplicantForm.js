import {useEffect, useState} from "react";
import styles from "./ApplicantForm.module.css"
import form_data_defaults from "../../models/form_data_defaults";
import PrimaryComponent from "../PrimaryComponent";
import IncomeComponent from "../IncomeComponent";
import LandlordComponent from "../LandlordComponent";
import RaceComponent from "../RaceComponent";
import HomelessnessComponent from "../HomelessComponent";
import ChildComponent from "../ChildComponent";
import AdultComponent from "../AdultComponent";
import AssistanceNeedComponent from "../AssistanceNeedComponent";
import HouseholdIncomeComponent from "../TotalIncomeSupportComponent";
import TotalIncomeSupportComponent from "../TotalIncomeSupportComponent";







// the form checks the database type through the fetch method using the api/data route.
// where the data.js folder contains two connections. one local mysql connection and another cloud-based
function createTimeStamp() {
    const pacificTimeDiff = 7 * 60 * 60 * 1000;
   return new Date(Date.now() - pacificTimeDiff)
       .toISOString().slice(0, 19)
       .replace('T', ' ');
}

// mongodb connection
function ApplicantForm({ databaseType}) {
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
        console.log(keys);
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
        console.log('New state is:', formData);
    }, [formData]);

    async function handleSubmit(event) {
        event.preventDefault();
        formData.timestamp = createTimeStamp();

        // todo: validate each input using input attributes
        await fetch("/api/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                dbType: databaseType,
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
        <div className={"flex min-h-screen flex-col items-center justify-between p-4"}>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputWrapper}>
                    <AssistanceNeedComponent formData={formData} onComponentInputChange={handleInputChange}/>
                </div>
                <div className={styles.inputWrapper}>
                    <PrimaryComponent formData={formData} onComponentInputChange={handleInputChange}/>
                </div>
                <div className={styles.inputWrapper}>
                    <ChildComponent formData={formData} onComponentInputChange={handleInputChange}/>
                </div>
                <div className={styles.inputWrapper}>
                    <AdultComponent formData={formData} onComponentInputChange={handleInputChange}/>
                </div>
                <div className={styles.inputWrapper}>
                    <TotalIncomeSupportComponent formData={formData} onComponentInputChange={handleInputChange}/>
                </div>
                <div className={styles.inputWrapper}>
                    <RaceComponent formData={formData} onComponentInputChange={handleInputChange}/>
                </div>
                <div className={styles.inputWrapper}>
                    <LandlordComponent formData={formData} onComponentInputChange={handleInputChange}/>
                </div>


                <div >
                    <button className={styles.submitButton} type="submit" disabled={!isValid}>Submit</button>
                </div>
            </form>
            {isDataLoaded && (
                <div>Data loaded successfully!</div>
            )}
            {isDataLoaded === false && (
                <div>Error loading data. Please try again.</div>
            )}
        </div>
    );
}

export default ApplicantForm;