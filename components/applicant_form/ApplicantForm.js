import { useState } from "react";
import styles from "./ApplicantForm.module.css"
// TODO: remember the form checks the database type through the api call to api/data on line 13 where the data.js folder
//  contains two connections. one local mysql connection and another cloud-based mongodb connection
// TODO: ensure handleSubmit passes the correct information along and method, headers, and body is correct
function ApplicantForm({ databaseType, database, collection }) {
    const [result, setResult]
        = useState({
        fName: "",
        lName: "",
        socialSecLastFour: "",
        lastHelpDate: "",
        householdIncome: "",
    });

    // TODO: find way to test and ensure setApplicantInfo is working correctly. (i.e. updating json fields and replacing
    //  setResult correctly
    function setApplicantInfo(value) {
        console.log("Updating state with value: ", value);
        setResult((prevState) => ({ ...prevState, ...value }));
        console.log("New state is: ", result)
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await fetch("/api/data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                dbType: databaseType,
                database,
                collection,
                // todo: update iteratively as fields are decided and frontend matures
                // fixme: do not hardcode here. Need to update from state change
                data: {
                    fName: "John",
                    lName: "Doe",
                    socialSecLastFour: "1111",
                    lastHelpDate: "2023-04-09",
                    householdIncome: "45000",
                },
            }),
        });

        const result = await response.json();
        setApplicantInfo(result);
        const { fName, lName, socialSecLastFour, lastHelpDate, householdIncome } =
            result;
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
                        value={result.fName}
                        onChange={(event) =>
                            setApplicantInfo({fName: event.target.value})}
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
                        value={result.lName}
                        onChange={(event) =>
                            setApplicantInfo({lName: event.target.value})}
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
                        value={result.socialSecLastFour}
                        onChange={(event) =>
                            setApplicantInfo({socialSecLastFour: event.target.value})}
                        required
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor="last-help-date-input">Last Help Date:</label>
                    <input
                        type="date"
                        id="last-help-date-input"
                        name="lastHelpDate"
                        value={result.lastHelpDate}
                        onChange={(event) =>
                            setApplicantInfo({lastHelpDate: event.target.value})}
                        required
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor="household-income-input">Monthly Household Income:</label>
                    <input
                        type="number"
                        id="household-income-input"
                        name="householdIncome"
                        placeholder="100000"
                        value={result.householdIncome}
                        onChange={(event) =>
                            setApplicantInfo({householdIncome: event.target.value})}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default ApplicantForm;