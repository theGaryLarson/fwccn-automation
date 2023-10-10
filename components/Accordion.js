
import React, {useEffect, useState} from "react";
import {dateFormatNYears, isEmptyObject} from "../lib/util";
import NeedSummaryComponent from "./NeedSummaryComponent";
import EditApplicationComponent from "./EditApplicationComponent";
import ActionTakenComponent from "./ActionTakenComponent";
import {toast} from "react-toastify";

function Accordion(props) {
    const { initialItem, setItemFocus, firstItem, removeDeletedItem } = props;
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
                    toast.success(` ${editedItem.fName + ' ' + editedItem.lName} \'s Application updated successfully!`)
                    return await response.json();
                } else {
                    console.error(`Error updating item for object id#: ${editedItem._id } `, response.status);
                    toast.error(`Error updating ${editedItem.fName + ' ' + editedItem.lName + '\'s application \n Object ID: ' + editedItem._id}`)
                }

            } catch (e) {
                console.error(`Error updating item for object id#: ${editedItem._id } `, e);
                toast.error(`Error updating ${editedItem.fName + ' ' + editedItem.lName + '\'s application \n Object ID: ' + editedItem._id}`)
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
            const {value} = event.target;
            setItem( {
                ...item,
                status: value
            })
        }
        function handleFundSourceChange(event) {
            const {value} = event.target;
            setItem( {
                ...item,
                actionTaken: {
                    ...item.actionTaken,
                    fundSource: value
                }

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
                            <div>
                                <div>
                                    {item.fName ? item.fName : ''}
                                    {item.lName ? ' ' + item.lName : ''}
                                    {item?.idSource?.socialSecLastFour ? ' #' + `${item?.idSource?.socialSecLastFour}` : (item?.idSource?.driverLicenseOrId ? <p>ID: {item?.idSource?.driverLicenseOrId}</p> : '')}
                                </div>
                                <div className={'mt-2'}>
                                   Date of Service: {
                                    item?.dateOfService
                                        ? (
                                            // oldest date imported is Oct 23 2018. A filler date of Oct 12 1492 is used
                                            // where no data was submitted. This allows MongoDB charts to correctly filter dates
                                            // as there cannot be any null or empty date values due to them causing errors.
                                            new Date(item?.dateOfService).getTime() < new Date("2018-10-23").getTime()
                                                ? '[ NO-DATA ]'
                                                : new Date(item?.dateOfService).toUTCString().slice(0, 16)
                                        )
                                        : (
                                            item?.dateOfService === ""
                                                ? 'Awaiting Service'
                                                : '[ NO-DATA ]'
                                        )
                                }
                                </div>

                                <p className='text-gray-500'>{ 'Submitted: ' + dateFormatNYears(item?.timestamp.slice(0, 10), 0) }</p>
                            </div>
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
                                        {
                                            (
                                                <button onClick={showActionView}
                                                        className={`${ !showForm ? 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' : 'py-2 px-4 bg-gray-200 font-bold text-gray-900 border-gray-950'} `}
                                                        type="button"
                                                        disabled={showForm}
                                                >
                                                    {isActionView ? `SHOW SUMMARY` : `SHOW ACTION STEPS`}
                                                </button>
                                            )
                                        }
                                        {!showForm && (
                                            <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            type="button"
                                            onClick={async () => {
                                                await updateApplicant(item).then(r => {
                                                    if (r?.record) {
                                                        updateItem(r.record);
                                                    }
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
                                                    className={"font-bold"}>Help Requested:</span> {item?.helpRequested}</p>
                                            </div>
                                            <div className="whitespace-nowrap flex-1">
                                                <p className=""><span
                                                    className={"font-bold"}>State ID:</span> {item?.idSource?.driverLicenseOrId}
                                                </p>
                                            </div>
                                            <div className="whitespace-nowrap flex-1">
                                                <p className=""><span
                                                    className={"font-bold"}>SSN Last Four:</span> {item?.idSource?.socialSecLastFour}
                                                </p>
                                            </div>
                                            <div className="whitespace-nowrap flex-1">
                                                <p className=""><span
                                                    className={"font-bold"}>Has Disability:</span> {item?.disabled ? 'Yes' : 'No'}
                                                </p>
                                            </div>
                                            <div className="whitespace-nowrap flex-1">
                                                <p className=""><span
                                                    className={"font-bold"}>Phone Number:</span> {item?.phone ? item.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') : ''}
                                                </p>
                                            </div>
                                            <div className="whitespace-nowrap flex-1">
                                                <p className=""><span
                                                    className={"font-bold"}>Email:</span> {item?.email }
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <div className="w-full text-blue-900 p-2 rounded border border-blue-300 whitespace-nowrap flex-1 mb-2 ">
                                                <label htmlFor={"status-edit"} className={"font-bold mr-0 "}>Status:</label>
                                                <select
                                                    id={"status-edit-1"}
                                                    name={"status-edit"}
                                                    value={item?.status}
                                                    onChange={handleStatusChange}
                                                    className={`flex-1 ml-12`}
                                                >
                                                    <option value={"PENDING"}>PENDING</option>
                                                    <option value={"APPROVED"}>APPROVED</option>
                                                    <option value={"APPROVED-OVERRIDE"}>OVERRIDE-APPROVED</option>
                                                    <option value={"DENIED"}>DENIED</option>
                                                    <option value={"NO-RETURN"}>NO-RETURN</option>
                                                </select>
                                            </div>
                                            <div className="w-full text-red-900 p-2 rounded border border-red-300 whitespace-nowrap flex-1">
                                                <div className={'flex justify-between'}>
                                                    <label htmlFor={"status-edit-2"} className={"font-bold text-red-800"}>
                                                        Funded By:
                                                    </label>
                                                    <select
                                                        id={"status-edit"}
                                                        name={"status-edit"}
                                                        value={item?.actionTaken?.fundSource}
                                                        onChange={handleFundSourceChange}
                                                        className={`flex-1 ml-2`}
                                                    >
                                                        <option value={""}></option>
                                                        <option value={"ARPA"}>ARPA</option>

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="whitespace-nowrap flex-1">
                                                <p className=""><span
                                                    className={"font-bold"}>Interviewed By:</span> {item?.interviewer}</p>
                                            </div>
                                            <div className="whitespace-nowrap flex-1">
                                                <p className=""><span
                                                    className={"font-bold"}>Date of Service:</span> {item?.dateOfService ? item?.dateOfService?.split('T')[0] : '[ NO DATA ]'}</p>
                                            </div>
                                            <div className="whitespace-nowrap flex-1">
                                                <p className=""><span
                                                    className={"font-bold"}>Referred By:</span> {item?.referredBy}</p>
                                            </div>
                                            <div className="whitespace-nowrap flex-1">
                                                <p className="">
                                                    <span className="font-bold">Percent of AMI:</span>
                                                    {
                                                        !isEmptyObject(item?.houseHoldIncome?.percentOfAnnualAmi) &&
                                                        !isNaN(Number(item?.houseHoldIncome?.percentOfAnnualAmi))
                                                            ? (
                                                                <>
                                                                    {" " + parseFloat(item.houseHoldIncome.percentOfAnnualAmi).toFixed(1) + "%"}
                                                                    {parseFloat(item.houseHoldIncome.percentOfAnnualAmi) > 40
                                                                        ? <span className="text-red-500 italic ml-1 font-bold">{'Ineligible > 40%'}</span>
                                                                        : <span className="text-green-500 italic ml-1 font-bold">{'Eligible < 40%'}</span>
                                                                    }
                                                                </>
                                                            )
                                                            // handles the insertion of hard coded AMI from excel imports
                                                            : (item?.houseHoldIncome?.percentOfAnnualAmi ? " " + item?.houseHoldIncome?.percentOfAnnualAmi + "%" : "NO DATA.")
                                                    }
                                                </p>
                                            </div>
                                            <div className="whitespace-nowrap flex-1">
                                                <p className=""><span
                                                    className={"font-bold"}>ARPA Income Category:</span> {item?.houseHoldIncome?.incomeLevel?? "-"}</p>
                                            </div>
                                            <div className="whitespace-nowrap flex-1"></div>
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <div className="whitespace-nowrap flex-1">
                                                <p className=""><span
                                                    className={"font-bold"}>Experiencing Homelessness:</span> {item?.homelessness.isHomeless ? 'Yes' : 'No'}
                                                </p>
                                            </div>
                                            <div className="whitespace-nowrap flex-1">
                                                <p className={"font-bold"}>{item?.homelessness?.isHomeless ? 'Temporary ': ''}Address:</p>
                                            </div>
                                            <div className="w-full flex-1 leading-tight px-1 pt-2 pb-2 rounded border-2 bg-blue-100 border-indigo-700">
                                                {
                                                    !item?.homelessness?.isHomeless ? (
                                                        <>
                                                            <p className="ml-1">{ item?.homeAddress?.aptName ? item?.homeAddress?.aptName : ''}</p>
                                                            <p className="ml-1">{ item?.homeAddress?.homeStreet1 ? item?.homeAddress?.homeStreet1 : ''}</p>
                                                            <p className="ml-1">{item?.homeAddress?.homeStreet2 ? item?.homeAddress?.homeStreet2 : ''}</p>
                                                            <p className="ml-1">{item?.homeAddress?.homeCity && item?.homeAddress?.homeZip ? item?.homeAddress?.homeCity + " " + item?.homeAddress?.homeState + ", " + item?.homeAddress?.homeZip : ''}</p>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p className="ml-1">{item.homelessness.tempAddress.street1}</p>
                                                            <p className="ml-1">{item.homelessness.tempAddress.street2}</p>
                                                            <p className="ml-1">{item.homelessness.tempAddress.city + " " + item.homelessness.tempAddress.state + ", " + item.homelessness.tempAddress.zip}</p>
                                                        </>
                                                    )
                                                }
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
