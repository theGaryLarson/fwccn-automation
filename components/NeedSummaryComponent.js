import {useEffect, useRef, useState} from "react";
import {isEmptyObject} from "../lib/util";

export default function NeedSummaryComponent(props) {
    const { firstItem, focusedItem } = props;
    const reasonForNeedRef = useRef(null);
    const futurePlansRef = useRef(null);
    const [text, setText] = useState(focusedItem.reasonForNeed || "")
    const [ isTextAreaCollapsed, setIsTextAreaCollapsed] = useState(false)
    const [ hasChildren, setHasChildren] = useState( false);
    const [hasAdults, setHasAdults] = useState( false)


    useEffect( () => {
        if (!isEmptyObject(focusedItem)) {
            setText(text)
            setHasChildren(focusedItem?.children?.hasChildrenUnder18??false)
            setHasAdults((focusedItem?.otherAdults?.isOtherAdultsAtResidence??false))
        }
    },[setText, setHasChildren, text, firstItem, focusedItem,] )

    // function handleStatusChange(event) {
    //     const {value} = event.target
    //     focusedItem.status = value
    //     // setStatus(value)
    // }
    const toggleTextAreaSize = (textAreaRef) => {
        setIsTextAreaCollapsed(!isTextAreaCollapsed);
        const textarea = textAreaRef.current;

        if (isTextAreaCollapsed) {
            textarea.style.height = "150px";
            textarea.style.height = `${textarea.scrollHeight}px`;
        } else {
            textarea.style.height = "150px";

            const textareaOffset = textarea.getBoundingClientRect().top + window.scrollY - 40;

            window.scrollTo({
                top: textareaOffset,
                behavior: "smooth",
            });
        }
    };

    return (
        <div>
            { focusedItem &&
                (
                    <div>
                        <div className={`flex flex-col w-full `}>

                            <div className={"w-full"}>
                                {/* List of children relationships */}
                                <h2 className="w-full m-0 font-bold bg-gray-700 text-white mt-2 mb-2 text-center">{hasChildren ? 'Child Relationships:' : 'No Children'}</h2>
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
                            <div className={"w-full"}>
                                <h2 className="w-full m-0 font-bold bg-gray-700 text-white mt-2 mb-2 text-center">{hasAdults ? 'Adult Relationships:' : 'No Other Adults'}</h2>
                                <ul className=" w-full ">
                                    { hasAdults && focusedItem.otherAdults.adults?.map((adult, index) => {
                                        return (
                                            <li className="pl-4 w-full text-left" key={index}>
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
                        </div>
                        <div className={"flex flex-col w-full items-center"}>
                            <p className="font-bold bg-gray-700 text-white mt-2 mb-2 text-center w-full" >Need Summary</p>
                            <textarea
                                id="reasonForNeed"
                                name="reasonForNeed"
                                value={focusedItem.reasonForNeed}
                                className="h-[150px] bg-blue-50 border-indigo-700 w-full p-4 pt-1  resize-none"
                                onClick={() => toggleTextAreaSize(reasonForNeedRef)}
                                ref={reasonForNeedRef}
                                readOnly
                            />
                        </div>
                        <div className={"flex flex-col w-full items-center"}>
                            <p className="font-bold bg-gray-700 text-white mb-2 text-center w-full">Future Plans</p>
                            <textarea
                                id="future-plans"
                                name="future-plans"
                                value={focusedItem.futurePlans}
                                className="h-[150px] bg-blue-50 border-indigo-700 w-full p-4 pt-1  resize-none"
                                onClick={() => toggleTextAreaSize(futurePlansRef)}
                                ref={futurePlansRef}
                                readOnly
                            />
                        </div>
                    </div>
                )
            }
        </div>
    )
}