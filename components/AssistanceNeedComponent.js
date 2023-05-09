// rent, gas, bus
import styles from "./applicant_form/ApplicantForm.module.css";

// applicant help requested information
export default function HelpRequestedComponent({formData, onComponentInputChange }) {

    const handleInputChange = (event) => {
        onComponentInputChange(event)
    }

    return (
        <div>
            <div className={styles.inputWrapper}>
                <label htmlFor="rent">Rent</label>
                <input
                    type="checkbox"
                    id="rent"
                    name="rent"
                    checked={formData.helpRequested.rent}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="gasoline">Gasoline</label>
                <input
                    type="checkbox"
                    id="gasoline"
                    name="gasoline"
                    checked={formData.helpRequested.gasoline}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="busTicket">Bus Ticket</label>
                <input
                    type="checkbox"
                    id="busTicket"
                    name="busTicket"
                    checked={formData.helpRequested.busTicket}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
}
