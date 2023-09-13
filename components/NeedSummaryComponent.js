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
                            <div className={"w-full"}>
                                {/* List of children relationships */}
                                <h2 className="w-full m-0 font-bold bg-gray-700 text-white mt-2 mb-2 text-center">{hasChildren ? 'Children In Household:' : 'No Children In Household'}</h2>
                                { hasChildren && (<table className="w-full">
                                    <thead>
                                    <tr>
                                    <th className="text-left pl-4">Relation</th>
                                    <th className="text-left">Age</th>
                                        <th className="text-left">School</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {hasChildren && focusedItem.children.relationsToApplicant?.map((relationship, index) => (
                                            <tr key={index}>
                                                <td className="pl-4 border-t py-2">{relationship}</td>
                                                <td className="border-t py-2">{focusedItem.children.kids[index].age}</td>
                                                <td className="border-t py-2">{focusedItem.children.kids[index].school}</td>
                                            </tr>
                                        ))}
                                        {hasChildren && (
                                            <tr>
                                                <td className="pl-4 border-t py-2 font-medium">Total Children</td>
                                                <td className="border-t py-2 font-medium">{focusedItem.children.relationsToApplicant?.length}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>)}
                            </div>
                            <div className={"w-full"}>
                                <h2 className="w-full m-0 font-bold bg-gray-700 text-white mt-2 mb-2 text-center">{hasAdults ? ' Additional Adult\'s In Household:' : 'No Additional Adults In Household'}</h2>
                                {hasAdults && (<table className="w-full">
                                    <thead>
                                    <tr>
                                        <th className="text-left pl-4">Name</th>
                                        <th className="text-left">Relationship</th>
                                        <th className="text-left">Age</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {hasAdults && focusedItem.otherAdults.adults?.map((adult, index) => {
                                        const {relationshipToAdult, relationDetails, adultAge} = adult;
                                        const isOther = relationshipToAdult.toLowerCase() === 'other';
                                        let relationDetail = isOther ? relationDetails : relationshipToAdult;
                                        if (!relationDetail) relationDetail = "no entry";

                                        return (
                                            <tr key={index}>
                                                <td className="pl-4 border-t py-2">{adult.adultFName} {adult.adultLName}</td>
                                                <td className="border-t py-2">{relationDetail}</td>
                                                <td className="border-t py-2">{adultAge}</td>
                                            </tr>
                                        );
                                    })}
                                    {hasAdults && (
                                        <tr>
                                            <td className="pl-4 border-t py-2 font-medium">Total Adults</td>
                                            <td className="border-t py-2 font-medium">{focusedItem?.otherAdults?.adults?.length}</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>)}
                            </div>
                            <div className={"w-full"}>
                                <h2 className="w-full m-0 font-bold bg-gray-700 text-white mt-2 mb-2 text-center">
                                    {focusedItem.otherNames.hasOtherNames ? "Applicant's Other Names:" : 'No Other Names Recorded'}
                                </h2>
                                {focusedItem.otherNames.hasOtherNames && (
                                    <table className="w-full">
                                        <thead>
                                        <tr>
                                            <th className="text-left pl-4">First Name</th>
                                            <th className="text-left">Last Name</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {focusedItem.otherNames.additionalNames?.map((name, index) => (
                                            <tr key={index}>
                                                <td className="pl-4 border-t py-2">{name.otherFirstName}</td>
                                                <td className="border-t py-2">{name.otherLastName}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td className="pl-4 border-t py-2 font-medium">Total Names</td>
                                            <td className="border-t py-2 font-medium" colSpan="2">{focusedItem?.otherNames?.additionalNames?.length}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                )}
                            </div>

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