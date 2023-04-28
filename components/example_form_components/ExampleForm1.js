import {useEffect, useState} from "react";
import {validateHouseHoldIncome, validateName, validateSSN} from "../../lib/validation";
import styles from "./ExampleForm1.module.css"
import form_data_defaults from "../../models/form_data_defaults";
// remember the form checks the database type through the fetch method using the api/data route.
// where the data.js folder contains two connections. one local mysql connection and another cloud-based
// mongodb connection
function ExampleForm1({ databaseType}) {

    // this creates a global variable and a form to set its state. It is initialized with values of formDataObject
    const [formData, setFormData] = useState(form_data_defaults);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    let newTimeStamp = "";
    function handleInputChange(event) {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
        setErrors({ ...errors, [name]: null }); // Clear any previous errors for this input

    }

    // These methods update changes as soon as they are made rather than on the next render which happens by default
    // Will be great for validation and the final commit to the database.
    useEffect(() => {
        console.log('New state is:', formData);
    }, [formData]);

    useEffect(() => {
        // Check if all input fields are valid
        const formIsValid = Object.values(errors).every(error => error === null);
        console.log("Errors:", errors);
        setIsValid(formIsValid);
    }, [errors]);


    async function handleSubmit(event) {
        event.preventDefault();
        // todo: validate each input in mongoose
        //fixme: timestamp showing blank on first entry in mongo db
        const pacificTimeDiff = 7 * 60 * 60 * 1000;
        newTimeStamp = new Date(Date.now() - pacificTimeDiff)
            .toISOString().slice(0, 19)
            .replace('T', ' ');
        setFormData({...formData, timeStamp: newTimeStamp});
        const response = await fetch("/api/data", {
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

export default ExampleForm1;