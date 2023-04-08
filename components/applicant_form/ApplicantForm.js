import { useState } from "react";
import styles from "./ApplicantForm.module.css"
// TODO: remember the form checks the database type through the api call to api/data on line 13 where the data.js folder
//  contains two connections. one local mysql connection and another cloud-based mongodb connection
// TODO: ensure handleSubmit passes the correct information along and method, headers, and body is correct
function ApplicantForm({ databaseType, database, collection }) {
    const [result, setResult] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        const filter = JSON.parse(event.target.filter.value);
        const projection = JSON.parse(event.target.projection.value);

        const response = await fetch("/api/data?dbType=" + databaseType, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ database, collection, filter, projection }),
        });

        const result = await response.json();
        setResult(result);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputWrapper}>
                    <label htmlFor="filter-input">Filter:</label>
                    <input
                        type="text"
                        id="filter-input"
                        name="filter"
                        placeholder="lorem ipsum"
                        required
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor="projection-input">Projection:</label>
                    <input
                        type="text"
                        id="projection-input"
                        name="projection"
                        placeholder="lorem ipsum"
                        required
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <button type="submit">Find One</button>
                </div>
            </form>
        </div>
    );
}

export default ApplicantForm;