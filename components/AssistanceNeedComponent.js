import styles from "./applicant_form/ApplicantForm.module.css";

export default function  AssistanceNeedComponent({formData, onComponentInputChange }) {

    const handleInputChange = (event) => {
        let {name, value} = event.target;
        if (name === "isMoreThanMonthBehind") {
            value = value === "true"
        }
        onComponentInputChange({
            target : {
                name: name,
                value: value
            }
        });
    }

    return (
        <div >
            <h1>Type of Request</h1>
            <div className={styles.componentWrapper} >
                <label htmlFor="rent">What type of assistance are you seeking?</label>
                <select
                    id="rent"
                    name="helpRequested"
                    value={formData?.helpRequested}
                    onChange={handleInputChange}
                >
                    <option value={'rent'}>Rent Assistance</option>
                    <option value={'gasoline'}>Gas Voucher</option>
                    <option value={'busTicket'}>Bus Ticket</option>

                </select>
            </div>
            { formData?.helpRequested === "rent" &&
                (<div className={styles.componentWrapper} >
                    <label htmlFor="isMoreThanMonthBehind">Are you more than a month behind on the rent?</label>
                    <select
                        id="isMoreThanMonthBehind"
                        name="isMoreThanMonthBehind"
                        value={formData?.homeAddress?.isMoreThanMonthBehind?.toString()??'false'}
                        onChange={handleInputChange}
                    >
                        <option value={'false'}>No</option>
                        <option value={'true'}>Yes</option>
                    </select>
                </div>)
            }
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
