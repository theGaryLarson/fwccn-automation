// if isHomeless, additional homelessness information
import styles from "./applicant_form/ApplicantForm.module.css";

// applicant homelessness information
export default function HomelessnessComponent({formData, onComponentInputChange}) {

    const handleInputChange = (event) => {
        const {name, value } = event.target;
        let newValue = name === 'isHomeless' ? value === 'true' : value;
        // Ensure durationXpHomelessness is not null and assign 0 if empty string
        if (name === 'durationXpHomelessness') {
            newValue = value === '' ? 0 : parseInt(value);
        }
        onComponentInputChange({
            target: {
                name,
                value: newValue
            }
            }
        )
    }

    function isHomeless() {
        return formData?.homelessness?.isHomeless ?? false;
    }

    return (
        <div className={`border-2 border-gray-600 p-4 box mt-4 mb-4`}>
            <h1>Homelessness Information</h1>
            <div className={styles.componentWrapper}>
                <label htmlFor="homeless">Are you currently experiencing homelessness?</label>
                <select
                    id="homeless"
                    name="isHomeless"
                    value={formData?.homelessness?.isHomeless.toString()??'false'}
                    onChange={handleInputChange}
                    required
                >
                    <option value={'false'}>No</option>
                    <option value={'true'}>Yes</option>
                </select>
            </div>
            { isHomeless() && <div>
                <div className={styles.componentWrapper}>
                    <label htmlFor="placeStayedRecently">Where have you stayed recently? *</label>
                    <input
                        type="text"
                        id="placeStayedRecently"
                        name="placeStayedRecently"
                        placeholder="Friend, Shelter, etc."
                        className={'mb-4 pl-1'}
                        value={formData?.homelessness?.placeStayedRecently??''}
                        onChange={handleInputChange}
                        required={isHomeless()}
                        disabled={!isHomeless()}
                    />
                </div>
                <div className={styles.componentWrapper}>
                    <label htmlFor="durationXpHomelessness">How many days have you been experiencing homelessness?</label>
                   <input
                        type="number"
                        id="durationXpHomelessness"
                        name="durationXpHomelessness"
                        placeholder="12"
                        value={formData?.homelessness?.durationXpHomelessness??0}
                        onChange={handleInputChange}
                        className={'pl-1'}
                        required={isHomeless()}
                        disabled={!isHomeless()}
                    />
                </div>
                <div className={styles.componentWrapper}>
                    <label htmlFor="whyHomeless">Why are you experiencing homelessness? *</label>
                    <textarea
                        id="whyHomeless"
                        name="whyHomeless"
                        placeholder="Brief explanation of what lead to applicant being homeless"
                        className={'mb-4 p-2'}
                        value={formData?.homelessness?.whyHomeless??''}
                        onChange={handleInputChange}

                        required={isHomeless()}
                        disabled={!isHomeless()}
                    />
                </div>
                <h1>Temporary Address</h1>
                <div className={styles.componentWrapper}>
                    <label htmlFor="street1">Street 1:</label>
                    <input
                        type="text"
                        id="street1"
                        name="street1"
                        placeholder="123 Main St."
                        value={formData?.homelessness?.tempAddress?.street1 ?? ''}
                        onChange={handleInputChange}
                        className={'pl-1'}
                        required={false}
                        disabled={(formData?.homelessness?.isHomeless ?? true )=== false}
                    />
                </div>
                <div className={styles.componentWrapper}>
                    <label htmlFor="street2">Street 2:</label>
                    <input
                        type="text"
                        id="street2"
                        name="street2"
                        placeholder="Apt. 100"
                        value={formData?.homelessness?.tempAddress?.street2 ?? ''}
                        onChange={handleInputChange}
                        className={'pl-1'}
                        // disabled={!formData?.homelessness?.isHomeless??'false' === 'false'}
                    />
                </div>
                <div className={styles.componentWrapper}>
                    <label htmlFor="city">City *:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Tacoma"
                        value={formData?.homelessness?.tempAddress?.city??''}
                        onChange={handleInputChange}
                        className={'pl-1'}
                        required={formData?.homelessness?.isHomeless??'true' === 'true'}
                        disabled={!formData?.homelessness?.isHomeless??'false' === 'false'}
                    />
                </div>
                <div className={styles.componentWrapper}>
                    <label htmlFor="state">State *:</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        placeholder="WA"
                        value={formData?.homelessness?.tempAddress?.state??''}
                        onChange={handleInputChange}
                        className={'pl-1'}
                        required={formData?.homelessness?.isHomeless??'false' === 'true'}
                        disabled={!formData?.homelessness?.isHomeless??'false' === 'false'}
                    />
                </div>
                <div className={styles.componentWrapper}>
                    <label htmlFor="zip">ZIP code *:</label>
                    <input
                        type="text"
                        id="zip"
                        name="zip"
                        placeholder="98101"
                        value={formData?.homelessness?.tempAddress?.zip??''}
                        onChange={handleInputChange}
                        className={'pl-1'}
                        required={formData?.homelessness?.isHomeless??'false' === 'true'}
                        disabled={!formData?.homelessness?.isHomeless??'false' === 'false'}
                    />
                </div>
            </div>}
        </div>

    )
}