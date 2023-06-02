import {useEffect, useRef, useState} from "react";
import styles from "./applicant_form/ApplicantForm.module.css";
import {isEmptyObject} from "../lib/util";

export default function NeedSummaryComponent(props) {
    const { firstItem, focusedItem } = props;
    const textAreaRef = useRef(focusedItem.reasonForNeed)
    const [status, setStatus] = useState("PENDING")
    const [text, setText] = useState(focusedItem.reasonForNeed || "")
    const [ isTextAreaCollapsed, setIsTextAreaCollapsed] = useState(false)
    const [ hasChildren, setHasChildren] = useState( false);
    const [hasAdults, setHasAdults] = useState( false)

    useEffect( () => {
        if (!isEmptyObject(focusedItem)) {
            setText(text)
            console.log('focusedItem: ', focusedItem)
            setHasChildren(focusedItem.children.hasChildrenUnder18)
            setHasAdults((focusedItem.otherAdults.isOtherAdultsAtResidence))
            console.log("firstItem: ", firstItem)
        }
        textAreaRef.current.addEventListener(
            "input",
            adjustTextAreaSize
        );


    },[setText, setHasChildren, text, firstItem, focusedItem] )

    function handleStatusChange(event) {
        const {value} = event.target
        focusedItem.status = value
        setStatus(value)
    }
    const collapseTextArea = () => {
        setIsTextAreaCollapsed(!isTextAreaCollapsed);
        const textarea = textAreaRef.current;

        if (isTextAreaCollapsed) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } else {
            textarea.style.height = "100px";
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    const adjustTextAreaSize = () => {
        const textarea = textAreaRef.current
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`
        }
    };

    return (
        <div>
            { focusedItem &&
                (
                    <div>
                        <div className={`flex flex-row w-full bg-gray-100 p-2 `}>
                            <div className="w-full left">
                                <div className={`flex flex-col left pl-4`}>
                                    <h1><span className={"font-bold"}>Applicant:</span> {focusedItem.fName} {focusedItem.lName}</h1>
                                </div>
                            </div>
                            <div className={"w-full flex justify-end"}>
                                <div className={` w-full flex justify-end`}>
                                    <label className={"font-bold"}>Status:</label>
                                    <select
                                        id={"status-edit"}
                                        name={"status-edit"}
                                        value = {focusedItem.status}
                                        onChange={handleStatusChange}
                                        className={`text-center `}
                                        disabled={false}
                                    >
                                        <option value={"PENDING"}>PENDING</option>
                                        <option value={"APPROVED"}>APPROVED</option>
                                        <option value={"APPROVED-OVERRIDE"}>OVERRIDE-APPROVE</option>
                                        <option value={"DENIED"}>DENY</option>
                                        <option value={"NO-RETURN"}>NO-RETURN</option>
                                    </select>

                                </div>
                            </div>
                        </div>
                        <div className={`flex flex-row w-full bg-gray-100`}>
                            <div className={' w-full left '}>
                                <span className={"font-medium"}>Has Disability: </span>{focusedItem.disabled ? 'Yes' : 'No'}
                            </div>
                            <div className={`w-full justify-end pr-8`}>
                                <span className={"font-medium"}>Referred by: </span> {focusedItem.referredBy}
                            </div>
                        </div>
                        <div className={`flex flex-col w-full bg-gray-100 p-2`}>
                            <div className={"w-full"}>
                                <h2 className="font-bold text-left">{hasAdults ? 'Adult Relationships:' : 'No Other Adults'}</h2>
                                <ul className=" w-full ">
                                    { hasAdults && focusedItem.otherAdults.adults?.map((adult, index) => {
                                        return (
                                            <li className=" pl-4 w-full text-left" key={index}>
                                                <span className="font-medium">Relation:</span>
                                                {
                                                    adult.relationshipToAdult.toLowerCase() === 'relative' ?
                                                        <span> {adult.relationDetails} <span className="font-medium">Age:</span> {adult.adultAge}</span>
                                                        :
                                                        <span> {adult.relationshipToAdult} <span className="font-medium">Age:</span> {adult.adultAge}</span>
                                                }
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className={"w-full"}>
                                {/* List of children relationships */}
                                <h2 className="font-bold text-left">{hasChildren ? 'Child Relationships:' : 'No Children'}</h2>
                                <ul className="w-full">
                                    {hasChildren && focusedItem.children.relationsToApplicant?.map((relationship, index) => (
                                        <li className="pl-4 w-full text-left" key={index}>
                                            <span>
                                                <span className={"font-medium"}>Relation:</span> {relationship}
                                                <span className={"font-medium"}> Age: </span> {focusedItem.children.kids[index].age}
                                            </span>

                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className={"flex flex-col w-full items-center"}>
                            <p className={"font-bold"}>Reason for Need</p>
                            <textarea
                                id="reasonForNeed"
                                name="reasonForNeed"
                                value={focusedItem.reasonForNeed}
                                className="min-h-50 max-h-200 bg-gray-200 w-full h-150 p-4 pt-1 border-b-black  resize-none"
                                onClick={collapseTextArea}
                                ref={textAreaRef}
                                readOnly
                            />
                        </div>
                    </div>

                )
            }
        </div>
    )
}