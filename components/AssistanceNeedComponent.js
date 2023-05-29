import styles from "./applicant_form/ApplicantForm.module.css";

export default function  AssistanceNeedComponent({formData, onComponentInputChange }) {

    const handleInputChange = (event) => {
            onComponentInputChange(event)
    }

    return (
        <div >
            <h1>Type of Request</h1>
            <div className={styles.componentWrapper} >
                <label htmlFor="rent">What type of assistance are you seeking?</label>
                <select
                    id="rent"
                    name="helpRequested"
                    value={formData.helpRequested}
                    onChange={handleInputChange}
                >
                    <option value={'rent'}>Rent Assistance</option>
                    <option value={'gasoline'}>Gas Voucher</option>
                    <option value={'busTicket'}>Bus Ticket</option>

                </select>
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor='explanation-of-need'>Explanation of Need:</label>
                <textarea
                    id={`explanation-of-need`}
                    name="reasonForNeed"
                    placeholder="Brief explanation of why requesting FWCCN services"
                    value={formData.reasonForNeed}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="futurePlans">Future Plans:</label>
                <textarea
                    id="futurePlans"
                    name="futurePlans"
                    placeholder="Brief summary of applicants plans for the future."
                    value={formData.futurePlans}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor='referred-by'>Referred By:</label>
                <input
                    type='text'
                    id='referred-by'
                    name="referredBy"
                    placeholder="Person or agency that referred applicant (if any)"
                    value={formData.referredBy}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
}
