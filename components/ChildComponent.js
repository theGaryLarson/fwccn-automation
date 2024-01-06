import {useEffect, useState} from "react";
import {ordinalNumber, usePrevious} from "../lib/util";
import styles from "./applicant_form/ApplicantForm.module.css";
import style from "./ChildComponent.module.css"


export default function ChildComponent({ formData, onComponentInputChange }) {
    const [children, setChildren] = useState(formData?.children?.kids??[]);
    const [hasChildrenUnder18, setHasChildrenUnder18] = useState(
        formData?.children?.hasChildrenUnder18??false
    );

    // had to create custom hook leveraging useRef() to avoid an infinite loop when formData is changed
    const prevFormDataChildren = usePrevious(formData?.children??undefined); // Use the custom hook


    // has the condition to check if data is changed to avoid an infinite loop
    useEffect(() => {
        if (prevFormDataChildren && JSON.stringify(prevFormDataChildren) !== JSON.stringify(formData.children)) {
            if(formData?.children?.kids??false)
            updateChildren(formData.children.kids);
        }
    });

    const updateChildren = (kids) => {
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
                relationsToApplicant: kids.map((kid) => kid.relationshipToApplicant),
                // possibly wrap these in new Set(...) to avoid duplication
                schools: kids.map((kid) => kid.school),
                schoolDistricts: kids.map((kid) => kid.schoolDistrict),

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
                setChildren([])
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
                            relationsToApplicant: [],
                            schools: [],
                            schoolDistricts: [],
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
            updateChildren(updatedChildren);
            onComponentInputChange({
                target: {
                    name: "children",
                    value: {
                        ...formData.children,
                        kids: updatedChildren
                    }
                }
            });
            updateChildren(updatedChildren);
        }
    };

    const handleAddKid = () => {
        const newChild = {
            gender: "undisclosed",
            age: 0,
            school: "",
            schoolDistrict: "",
            relationshipToApplicant: "",
            relationDetails: ""
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
            <div className={styles.componentWrapper}>
                <label htmlFor="children">{'Are there minor children living at the applicant\'s residence?'}</label>
                <select
                    className={'mb-4'}
                    id="children"
                    name="hasChildrenUnder18"
                    value={formData?.children?.hasChildrenUnder18?.toString()??'false'}
                    onChange={(event) => handleInputChange(event, null)}
                >
                    <option value={'false'}>No</option>
                    <option value={'true'}>Yes</option>
                </select>
            </div>
            {hasChildrenUnder18 &&  (<div id='childElements'>
                {children?.map((child, index) => (
                    <div key={index}>
                        <div className={'flex items-center'}>
                            <h2 className={`${style.addRemoveHeader} font-bold`}>{ordinalNumber(index)} Child At Residence</h2>
                                <button className={ `${style.removeButton} `} type="button" onClick={() => handleRemoveKid(index)}>
                                    Remove Child
                                </button>
                        </div>
                        <div className={styles.componentWrapper}>
                            <label htmlFor={`childGender-${index}`}>Gender Assigned at Birth:</label>
                            <select
                                id={`childGender-${index}`}
                                name="gender"
                                value={child?.gender??'undisclosed'}
                                onChange={(event) => handleInputChange(event, index)}
                            >
                                <option value="undisclosed">not disclosed</option>
                                <option value="female">female</option>
                                <option value="male">male</option>
                            </select>
                        </div>
                        <div className={styles.componentWrapper}>
                            <label htmlFor={`kidAge-${index}`}>Age:</label>
                            <input
                                type="number"
                                id={`kidAge-${index}`}
                                name='age'
                                value={child?.age??undefined}
                                onChange={(event) => handleInputChange(event, index)}
                                className={'pl-1'}
                            />
                        </div>
                        <div className={styles.componentWrapper}>
                            <label htmlFor={`kidSchool-${index}`}>School:</label>
                            <input
                                type="text"
                                id={`kidSchool-${index}`}
                                name={`school`}
                                value={child?.school??''}
                                onChange={(event) => handleInputChange(event, index)}
                                className={'pl-1'}
                            />
                        </div>
                        <div className={styles.componentWrapper}>
                            <label htmlFor={`kidSchoolDistrict-${index}`}>School District:</label>
                            <input
                                type="text"
                                id={`kidSchoolDistrict-${index}`}
                                name={`schoolDistrict`}
                                value={child?.schoolDistrict??''}
                                onChange={(event) => handleInputChange(event, index)}
                                className={'pl-1'}
                            />
                        </div>
                        <div className={styles.componentWrapper}>
                            <label htmlFor={`kidRelationship-${index}`}>Relation to Applicant:</label>
                            <input
                                type="text"
                                id={`kidRelationship-${index}`}
                                name={`relationshipToApplicant`}
                                className={'mb-4 pl-1'}
                                value={child?.relationshipToApplicant??''}
                                onChange={(event) => handleInputChange(event, index)}
                            />
                        </div>
                    </div>
                ))}

                <button className={styles.addButton} type="button" onClick={handleAddKid}>
                    Add Child
                </button>

            </div>)}
        </div>
    );
}

