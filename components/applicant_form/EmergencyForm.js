import { useState } from 'react';
import formDataObject from "../../models/form-data-object";

const EmergencyServicesForm = () => {
    const [formData, setFormData] = useState(formDataObject);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="emergency-services-form">
            <h2>Federal Way Community Caregiving Network</h2>
            <p>Emergency Services Client Information Form</p>
            <label htmlFor="date">Date: </label>
            <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
            />
            <br />
            {/* Primary Applicant Information */}
            <h3>Primary Applicant Information</h3>
            <label htmlFor="lastName">Last Name: </label>
            <input
                type="text"
                name="primaryApplicant.lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
            />
            {/* Add the rest of the fields for Primary Applicant similarly */}

            {/* Other Adult Information */}
            <h3>Other Adults Information</h3>
            <label htmlFor="otherAdults">Other Adults (Separate by comma): </label>
            <input
                type="text"
                name="otherAdults"
                id="otherAdults"
                value={formData.otherAdults}
                onChange={handleChange}
            />
            <br />
            {/* Household Information */}
            <h3>Household Information</h3>
            <label htmlFor="currentTotalMonthlyIncome">Current Total Monthly Income: </label>
            <input
                type="number"
                name="currentTotalMonthlyIncome"
                id="currentTotalMonthlyIncome"
                value={formData.currentTotalMonthlyIncome}
                onChange={handleChange}
            />
            {/* Add the rest of the fields for Household Information similarly */}

            {/* Race Information */}
            <h3>Race Information</h3>
            <label htmlFor="americanIndianOrAlaskaNative">American Indian or Alaska Native: </label>
            <input
                type="number"
                name="race.americanIndianOrAlaskaNative"
                id="americanIndianOrAlaskaNative"
                value={formData.race.americanIndianOrAlaskaNative}
                onChange={handleChange}
            />
            {/* Add the rest of the fields for Race Information similarly */}

            <button type="submit">Submit</button>
        </form>
    );
};

export default EmergencyServicesForm;
