
import React, {useEffect, useState} from "react";
import { dateFormatNYears } from "../lib/util";
import NeedSummaryComponent from "./NeedSummaryComponent";
import EditApplicationComponent from "./EditApplicationComponent";
import ActionTakenComponent from "./ActionTakenComponent";

    function Accordion(props) {
        const { initialItem, setItemFocus, firstItem } = props;
        const [isOpen, setIsOpen] = useState(false);
        const [showForm, setShowForm] = useState(false);
        const [item, setItem] = useState(initialItem);
        const [isActionView, setIsActionView] = useState(false);

        useEffect(() => {
            setItem(initialItem)
        }, [initialItem])

        const  updateApplicant = async (editedItem) => {
            try {
                const response = await fetch(`api/getAndUpdateOneRecord`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editedItem)
                });
                if (response.ok) {
                    return await response.json();
                } else {
                    console.error(`Error updating item for state id#: ${editedItem.idSource?.driverLicenseOrId ?? ''} `, response.status);
                }

            } catch (e) {
                console.error(`Error updating item for state id#: ${editedItem.idSource?.driverLicenseOrId ?? ''}\n `, e);
                return null;
            }
        }

        const updateItem = (updatedItem) => {
           setItem(updatedItem)
        }
        const toggleAccordion = () => {
            setIsOpen(!isOpen);
        };
        const handleFocus = () => {
            setItemFocus(item)
        }
        const toggleShowForm = () => {
            setShowForm(!showForm);
        }

        const showActionView = () => {
            setIsActionView(!isActionView)
        }
        function handleStatusChange(event) {
            const {value} = event.target
            setItem( {
                ...item,
                status: value
            })
        }

        return (
            <div onClick={handleFocus}>
                <div className={`flex flex-col items-center`}>
                    <button
                        type="button"
                        onClick={toggleAccordion}
                        className={` rounded m-1 mb-0 p-2 w-full text-center ${item.status === 'APPROVED' || item.status === 'APPROVED-OVERRIDE' ? ' bg-green-300 border-black border-2' :
                            (item.status === "PENDING" ? 'bg-gray-300 border-black border-2' : (item.status === 'NO-RETURN' ? ' bg-orange-300 border-black border-2' : ' bg-red-300 border-black border-2'))}`}
                    >
                         <span className="font-bold">
                            {dateFormatNYears(item.timestamp, 0)}
                         </span>
                    </button>
                    {isOpen && (
                        <div className={'w-full'}>
                            <div className={'w-full bg-blue-200 mt-4 p-4 '}>
                                <p className="text-center text-xl">{`${item.fName} ${item.lName}`} </p>
                                <p className={"font-bold italic text-center"}>Applicant</p>
                                <p className={"font-bold italic text-center text-blue-200 mb-0"}>item_id: {item._id}</p>
                            </div>
                            <div>
                                <div>
                                    <div className="flex justify-end space-x-4 mb-4 mt-4">
                                        { (item.status === 'NO-RETURN' || item.status === 'APPROVED' || item.status === 'APPROVED-OVERRIDE' || item.status === 'DENIED') &&
                                            (
                                                <button onClick={showActionView}
                                                        className={`${ !showForm ? 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' : 'py-2 px-4 bg-gray-200 font-bold text-gray-900 border-gray-950'} `}
                                                        type="button"
                                                        disabled={showForm}
                                                >
                                                    {isActionView ? `SHOW SUMMARY` : `SHOW ACTION TAKEN`}
                                                </button>
                                            )
                                        }
                                        {!showForm && (
                                            <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            type="button"
                                            onClick={async () => {
                                                await updateApplicant(item).then(r => {
                                                    updateItem(r.record);
                                                });
                                            }}
                                        >
                                            SAVE CHANGES
                                        </button>)}
                                        <button onClick={toggleShowForm}
                                                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
                                                type="button"
                                        >
                                            {showForm ? `HIDE FORM` : `SHOW FORM`}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            { isActionView && !showForm ?
                                (
                                    <ActionTakenComponent item={item} updateItem={updateItem}></ActionTakenComponent>
                                ) : ( !showForm &&
                                (
                                    <div className="grid grid-cols-2 grid-rows-2 gap-4">
                                        <div className="flex flex-col items-start">
                                            <div className="whitespace-nowrap flex-1">
                                                <p className=""><span
                                                    className={"font-bold"}>Help Requested:</span> {item.helpRequested}</p>
                                            </div>
                                            <div className="whitespace-nowrap flex-1">
                                                <p className=""><span
                                                    className={"font-bold"}>State ID:</span> {item.idSource.driverLicenseOrId}
                                                </p>
                                            </div>
                                            <div className="whitespace-nowrap flex-1">
                                                <p className=""><span
                                                    className={"font-bold"}>SSN Last Four:</span> {item.idSource.socialSecLastFour}
                                                </p>
                                            </div>
                                            <div className="whitespace-nowrap flex-1">
                                                <p className=""><span
                                                    className={"font-bold"}>Has Disability:</span> {item.disabled ? 'Yes' : 'No'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <div className="whitespace-nowrap flex-1">
                                                <label htmlFor={"status-edit"} className={"font-bold "}>Status:</label>
                                                <select
                                                    id={"status-edit"}
                                                    name={"status-edit"}
                                                    value={item.status}
                                                    onChange={handleStatusChange}
                                                    className={`text-center w-full ml-4`}
                                                >
                                                    <option value={"PENDING"}>PENDING</option>
                                                    <option value={"APPROVED"}>APPROVED</option>
                                                    <option value={"APPROVED-OVERRIDE"}>OVERRIDE-APPROVED</option>
                                                    <option value={"DENIED"}>DENIED</option>
                                                    <option value={"NO-RETURN"}>NO-RETURN</option>
                                                </select>
                                            </div>
                                            <div className="whitespace-nowrap flex-1">
                                                <p className=""><span
                                                    className={"font-bold"}>Interviewed By:</span> {item.interviewer}</p>
                                            </div>
                                            <div className="whitespace-nowrap flex-1">
                                                <p className=""><span
                                                    className={"font-bold"}>Referred By:</span> {item.referredBy}</p>
                                            </div>
                                            <div className="whitespace-nowrap flex-1"></div>
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <div className="whitespace-nowrap flex-1">
                                                <p className=""><span
                                                    className={"font-bold"}>Experiencing Homelessness:</span> {item.homelessness.isHomeless ? 'Yes' : 'No'}
                                                </p>
                                            </div>
                                            <div className="whitespace-nowrap flex-1">
                                                <p className={"font-bold"}>Address:</p>
                                            </div>
                                            <div
                                                className=" w-full flex-1 leading-tight px-2 pt-2 pb-2 rounded border-2 bg-blue-100 border-indigo-700">
                                                <p className="ml-2">{item.homeAddress.homeStreet1}</p>
                                                <p className="ml-2">{item.homeAddress.homeStreet2}</p>
                                                <p className="ml-2">{item.homeAddress.homeCity + " " + item.homeAddress.homeState + ", " + item.homeAddress.homeZip}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <div className="whitespace-nowrap flex-1">
                                                <p><span
                                                    className={"font-bold"}>Rent {'>'}1 Month Behind:</span> {item.homeAddress.isMoreThanMonthBehind ? 'Yes' : 'No'}
                                                </p>

                                            </div>
                                            <div className="whitespace-nowrap flex-1">
                                                <p><span
                                                    className={"font-bold"}>Address Verified: </span>{item.homeAddress.verified ? 'Yes' : 'No'}
                                                </p>
                                            </div>
                                            <div className="whitespace-nowrap flex-1">
                                                <p><span
                                                    className={"font-bold"}>Income Verified:</span> {item.houseHoldIncome.isIncomeVerified ? 'Yes' : 'No'}
                                                </p>
                                            </div>
                                            <div className="whitespace-nowrap flex-1">
                                                <p><span
                                                    className={"font-bold"}>License Verified:</span> {item.idSource.isValidLicense ? 'Yes' : 'No'}
                                                </p>
                                            </div>
                                            <div className="whitespace-nowrap flex-1">
                                                <p><span
                                                    className={"font-bold"}>Bus Primary Transport:</span> {item.isBusPrimaryTransport ? 'Yes' : 'No'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            { !showForm && !isActionView &&
                                (
                                    <NeedSummaryComponent focusedItem={item} firstItem={firstItem}/>
                                )
                            }
                            <div>
                                <div>
                                    {showForm && <EditApplicationComponent item={item} onUpdate={updateItem} updateApplicant={updateApplicant} />}
                                    { showForm &&
                                        (
                                            <div className="flex justify-end space-x-4 mb-4 mt-4">
                                                <button onClick={toggleShowForm}
                                                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
                                                        type="button">{showForm ? `HIDE FORM` : `SHOW FORM`}</button>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
}

export default Accordion;
