import {useEffect, useState} from "react";
import styles from "./applicant_form/ApplicantForm.module.css";
import {usePrevious} from "../lib/previous";

export default function ChildComponent({ formData, onComponentInputChange }) {
    const [children, setChildren] = useState(formData.children.kids || []);
    const [hasChildrenUnder18, setHasChildrenUnder18] = useState(
        formData.children.hasChildrenUnder18 || false
    );

    // had to create custom hook leveraging useRef() to avoid an infinite loop when formData is changed
    const prevFormDataChildren = usePrevious(formData.children); // Use the custom hook


    // has the condition to check if data is changed to avoid an infinite loop
    useEffect(() => {
        if (prevFormDataChildren && JSON.stringify(prevFormDataChildren) !== JSON.stringify(formData.children)) {
            updateChildCounts(formData.children.kids);
        }
    }, [formData, onComponentInputChange, prevFormDataChildren]);

    const updateChildCounts = (kids) => {
        const boys = kids.filter((child) => child.gender === 'male');
        const girls = kids.filter((child) => child.gender === 'female');
        const updatedFormData = {
            ...formData,
            children: {
                ...formData.children,
                kids: kids,
                boysCount: boys.length,
                boysAges: boys.map((boy) => boy.age),
                girlsCount: girls.length,
                girlsAges: girls.map((girl) => girl.age),
            },
        };
        onComponentInputChange({
            target: {
                name: "children",
                value: updatedFormData.children,
            },
        });
    };


    const handleInputChange = (event, index) => {
        const { name, value } = event.target;

        if (name === "hasChildrenUnder18") {
            const newValue = value === "true";
            setHasChildrenUnder18(newValue);

            if (!newValue) {
                // Clear the kids data when there are no kids living at the residence
                onComponentInputChange({
                    target: {
                        name: "children",
                        value: {
                            ...formData.children,
                            hasChildrenUnder18: newValue,
                            kids: [],
                            boysCount: 0,
                            boysAges: [],
                            girlsCount: 0,
                            girlsAges: [],
                        },
                    },
                });
            } else {
                onComponentInputChange({
                    target: {
                        name: "children",
                        value: {
                            ...formData.children,
                            hasChildrenUnder18: newValue,
                        },
                    },
                });
            }
        } else {
            const updatedChildren = [...formData.children.kids];
            updatedChildren[index][name] = value;
            setChildren(updatedChildren);
            updateChildCounts(updatedChildren);
            onComponentInputChange({
                target: {
                    name: "children",
                    value: {
                        ...formData.children,
                        kids: updatedChildren
                    }
                }
            });
            updateChildCounts(updatedChildren);
        }
    };

    const handleAddKid = () => {
        const newChild = {
            gender: "female",
            age: "",
            school: "",
            schoolDistrict: "",
            relationshipToApplicant: "",
        };
        const updatedChildren = [...children, newChild]
        setChildren(updatedChildren);
        onComponentInputChange({
            target: {
                name: "children",
                value: {
                    ...formData.children,
                    kids: updatedChildren
                }
            }
        });
    };


    const handleRemoveKid = (index) => {
        const updatedChildren = [...children];
        updatedChildren.splice(index, 1);
        setChildren(updatedChildren);
        onComponentInputChange({
            target: {
                name: "children",
                value: {
                    ...formData.children,
                    kids: updatedChildren
                },
            },
        });
    };

    return (
        <div>
            <h1>Child Information</h1>
            <div className={styles.inputWrapper}>
                <label htmlFor="children">{'Is there children living at applicant\'s residence?'}</label>
                <select
                    className={'mb-4'}
                    id="children"
                    name="hasChildrenUnder18"
                    value={formData.children.hasChildrenUnder18.toString()}
                    onChange={(event) => handleInputChange(event, null)}
                >
                    <option value={'false'}>No</option>
                    <option value={'true'}>Yes</option>
                </select>
            </div>
            {hasChildrenUnder18 && <div>
                {children.map((child, index) => (
                    <div key={index}>
                        <hr />
                        <h2 className={'font-bold'}>Child {index + 1}</h2>
                        <div className={styles.inputWrapper}>
                            <button type="button" onClick={() => handleRemoveKid(index)}>
                                Remove Child
                            </button>
                        </div>
                        <div className={styles.inputWrapper}>
                            <label htmlFor={`childGender-${index}`}>Gender assigned at Birth:</label>
                            <select
                                id={`childGender-${index}`}
                                name="gender"
                                value={child.gender}
                                onChange={(event) => handleInputChange(event, index)}
                                required
                            >
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                            </select>
                        </div>
                        <div className={styles.inputWrapper}>
                            <label htmlFor={`kidAge-${index}`}>Age</label>
                            <input
                                type="number"
                                id={`kidAge-${index}`}
                                name='age'
                                value={child.age}
                                onChange={(event) => handleInputChange(event, index)}
                                required
                            />
                        </div>
                        <div className={styles.inputWrapper}>
                            <label htmlFor={`kidSchool-${index}`}>School</label>
                            <input
                                type="text"
                                id={`kidSchool-${index}`}
                                name={`school`}
                                value={child.school}
                                onChange={(event) => handleInputChange(event, index)}
                                required
                            />
                        </div>
                        <div className={styles.inputWrapper}>
                            <label htmlFor={`kidSchoolDistrict-${index}`}>School District</label>
                            <input
                                type="text"
                                id={`kidSchoolDistrict-${index}`}
                                name={`schoolDistrict`}
                                value={child.schoolDistrict}
                                onChange={(event) => handleInputChange(event, index)}
                                required
                            />
                        </div>
                        <div className={styles.inputWrapper}>
                            <label htmlFor={`kidRelationship-${index}`}>Relation to Applicant:</label>
                            <input
                                type="text"
                                id={`kidRelationship-${index}`}
                                name={`relationshipToApplicant`}
                                value={child.relationshipToApplicant}
                                onChange={(event) => handleInputChange(event, index)}
                                required
                            />
                        </div>
                    </div>
                ))}
                <div className={styles.inputWrapper}>
                    <button type="button" onClick={handleAddKid}>
                        Add Child
                    </button>
                </div>
            </div>}
        </div>
    );
}

