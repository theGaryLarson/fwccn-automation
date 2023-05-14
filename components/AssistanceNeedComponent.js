// rent, gas, bus
import styles from "./applicant_form/ApplicantForm.module.css";
import valueProcessor from "next/dist/build/webpack/loaders/resolve-url-loader/lib/value-processor";

// applicant help requested information
export default function  AssistanceNeedComponent({formData, onComponentInputChange }) {

    const handleInputChange = (event) => {
            onComponentInputChange(event)
    }

    return (
        <div >
            <h1>Type of Request</h1>
            <div className={styles.inputWrapper} >
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
            <div className={styles.inputWrapper}>
                <label htmlFor='explanation-of-need'>Explanation of Need:</label>
                <textarea
                    id={`explanation-of-need`}
                    name="reasonForNeed"
                    value={formData.reasonForNeed}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor='referred-by'>Referred By:</label>
                <input
                    type='text'
                    id='referred-by'
                    name="referredBy"
                    value={formData.referredBy}
                    onChange={handleInputChange}
                />
            </div>


        </div>
    );
}
