import styles from "./applicant_form/ApplicantForm.module.css";

// applicant children information
export default function ChildComponent({formData, onComponentInputChange}) {
    const handleInputChange = (event) => {
        onComponentInputChange(event);
    };

    return (
        <div>
            <h1>Child Information</h1>
            <div className={styles.inputWrapper}>
                <label htmlFor="hasChildrenUnder18">Do you have children under 18 living at the residence?</label>
                <select
                    id="hasChildrenUnder18"
                    name="hasChildrenUnder18"
                    value={formData.children.hasChildrenUnder18}
                    onChange={handleInputChange}
                    required
                >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
            </div>
            { formData.children.hasChildrenUnder18 === 'true' && <div>
                <div className={styles.inputWrapper}>
                <label htmlFor="boysCount">Number of boys</label>
                <input
                    type="number"
                    id="boysCount"
                    name="boysCount"
                    value={formData.children.boysCount}
                    onChange={handleInputChange}
                    required
                />
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor="boysAges">Ages of boys</label>
                    <input
                        type="text"
                        id="boysAges"
                        name="boysAges"
                        value={formData.children.boysAges.join(", ")}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor="girlsCount">Number of girls</label>
                    <input
                        type="number"
                        id="girlsCount"
                        name="girlsCount"
                        value={formData.children.girlsCount}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor="girlsAges">Ages of girls</label>
                    <input
                        type="text"
                        id="girlsAges"
                        name="girlsAges"
                        value={formData.children.girlsAges.join(", ")}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor="nonBinaryCount">Number of non-binary children</label>
                    <input
                        type="number"
                        id="nonBinaryCount"
                        name="nonBinaryCount"
                        value={formData.children.nonBinaryCount}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor="nonBinaryAges">Ages of non-binary children</label>
                    <input
                        type="text"
                        id="nonBinaryAges"
                        name="nonBinaryAges"
                        value={formData.children.nonBinaryAges.join(", ")}
                        onChange={handleInputChange}

                        required
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor="relationshipToChildren">Relationship to children</label>
                    <input
                        type="text"
                        id="relationshipToChildren"
                        name="relationshipToChildren"
                        value={formData.children.relationshipToChildren}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor="schoolDistrict">School district</label>
                    <input
                        type="text"
                        id="schoolDistrict"
                        name="schoolDistrict"
                        value={formData.children.schoolDistrict}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor="schools">Schools attended</label>
                    <input
                        type="text"
                        id="schools"
                        name="schools"
                        value={formData.children.schools.join(", ")}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>}
        </div>
    );
}

