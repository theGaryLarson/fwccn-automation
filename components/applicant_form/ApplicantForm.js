import {useEffect, useState} from "react";
import styles from "./ApplicantForm.module.css"
import form_data_defaults from "../../models/form_data_defaults";
import PrimaryData from "../../components/PrimaryData";
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

    const [formData, setFormData] = useState(form_data_defaults);
    const [isValid, setIsValid] = useState(false);
    function handleInputChange(event) {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});

        // todo: modify boolean value based on client-input validation
        setIsValid(true);
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
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputWrapper}>
                    <PrimaryData onComponentInputChange={handleInputChange} formData={formData}/>


                    <div>
                        <button type="submit" disabled={!isValid}>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ApplicantForm;