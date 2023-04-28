import React, { useState } from 'react';
import ApplicantNeed from "./ApplicantNeed";
import ResidentCriteria from "./ResidentCriteria";

function ExampleForm() {
    const [textValue, setTextValue] = useState('');
    const [numberValue, setNumberValue] = useState(0);
    const [checkboxValue, setCheckboxValue] = useState(false);
    const [radioValue, setRadioValue] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Text value: ${textValue}`);
        console.log(`Number value: ${numberValue}`);
        console.log(`Checkbox value: ${checkboxValue}`);
        console.log(`Radio value: ${radioValue}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Text input:
                <input type="text"
                       name="fName"
                       value={textValue}
                       onChange={(event) => setTextValue(event.target.value)}
                       required
                       pattern="/^[A-Za-z]*$/"
                />
            </label>
            <br />
            <label>
                Number input:
                <input type="number" value={numberValue} onChange={(event) => setNumberValue(event.target.value)} />
            </label>
            <br />
            <label>
                Checkbox:
                <input type="checkbox" checked={checkboxValue} onChange={(event) => setCheckboxValue(event.target.checked)} />
            </label>
            <ResidentCriteria></ResidentCriteria>
            <ApplicantNeed></ApplicantNeed>


            <input type="submit" value="Submit" />
        </form>
    );
}

export default ExampleForm;
