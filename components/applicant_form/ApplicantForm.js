import {useEffect, useState} from "react";
import styles from "./ApplicantForm.module.css"
import formDataObject from "../../models/form-data-object";
// remember the form checks the database type through the fetch method using the api/data route.
// where the data.js folder contains two connections. one local mysql connection and another cloud-based
// mongodb connection
function ApplicantForm({ databaseType}) {

    const [formData, setFormData] = useState(formDataObject);
    const [isValid, setIsValid] = useState(false);
    let newTimeStamp = "";
    function handleInputChange(event) {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
        setIsValid(true);
    }

    // These methods update changes as soon as they are made rather than on the next render which happens by default
    // Will be great for validation and the final commit to the database.
    useEffect(() => {
        console.log('New state is:', formData);
    }, [formData]);

    async function handleSubmit(event) {
        event.preventDefault();

        // todo: validate each input.

        //fixme: timestamp showing blank on first entry in mongodb
        const pacificTimeDiff = 7 * 60 * 60 * 1000;
        newTimeStamp = new Date(Date.now() - pacificTimeDiff)
            .toISOString().slice(0, 19)
            .replace('T', ' ');
        setFormData({...formData, timeStamp: newTimeStamp});

        const response = await fetch("/api/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                dbType: databaseType,
                data: formData,
            }),
        });
        console.log(await response.json())
        // await response.json();

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputWrapper}>
                    <label htmlFor="f-name-input">First Name:</label>
                    <input
                        type="text"
                        id="f-name-input"
                        name="fName"
                        placeholder="John"
                        value={formData.fName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor="l-name-input">Last Name:</label>
                    <input
                        type="text"
                        id="l-name-input"
                        name="lName"
                        placeholder="Doe"
                        value={formData.lName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor="social-sec-input">Social Security Last Four:</label>
                    <input
                        type="number"
                        id="social-sec-input"
                        name="socialSecLastFour"
                        placeholder="1234"
                        value={formData.socialSecLastFour}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor="last-help-date-input">Last Help Date:</label>
                    <input
                        type="date"
                        id="last-help-date-input"
                        name="lastHelpDate"
                        value={formData.lastHelpDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor="household-income-input">Monthly Household Income:</label>
                    <input
                        type="number"
                        id="household-income-input"
                        name="monthlyHouseholdIncome"
                        placeholder="100000"
                        value={formData.monthlyHouseholdIncome}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit" disabled={!isValid}>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default ApplicantForm;