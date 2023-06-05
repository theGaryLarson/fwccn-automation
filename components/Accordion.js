import React, {useState} from "react";
import { dateFormatNYears } from "../lib/util";
import NeedSummaryComponent from "./NeedSummaryComponent";
import EditApplicationComponent from "./EditApplicationComponent";

    function Accordion(props) {
        const { initialItem, setItemFocus, firstItem } = props;
        const [isOpen, setIsOpen] = useState(false);
        const [showForm, setShowForm] = useState(false);
        const [item, setItem] = useState(initialItem)

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
                        className={` rounded m-1 mb-0 p-2 w-full text-center ${item.status === 'APPROVED' || item.status === 'APPROVED-OVERRIDE' ? ' bg-green-100 border-green-500 border-2' : ' bg-red-100 border-red-500 border-2'}`}
                    >
                         <span className="font-bold">
                            {formatNextEligibleDate(item.timestamp, 0)}
                         </span>
                    </button>
                    {isOpen && (
                        <div className={'w-full'}>
                            <NeedSummaryComponent focusedItem={item} firstItem={firstItem} />
                            <div className={`flex flex-row w-full bg-gray-100 p-2 `}>
                                <div className="bg-gray-100 rounded  w-full left">
                                    <p className="ml-4"><span
                                        className={"font-bold"}>Name:</span> {`${item.fName} ${item.lName}`}</p>
                                    <p className="ml-4"><span
                                        className={"font-bold"}>State ID:</span> {item.idSource.driverLicenseOrId}</p>
                                    <p className="ml-4 mb-4"><span
                                        className={"font-bold"}>SSN Last-Four:</span> {`${item.idSource.socialSecLastFour}`}
                                    </p>
                                    <p>
                                        <span className={"backdrop-blur-2xl ml-4 font-bold"}>Address Verified:</span>
                                        {item.homeAddress.verified ? 'Yes' : 'No'}
                                    </p>
                                    <div
                                        className={'leading-tight bg-gray-700 w-auto pl-2 pt-2 pb-2 rounded text-white'}>
                                        <p className="ml-2">{item.homeAddress.homeStreet1}</p>
                                        <p className="ml-2">{item.homeAddress.homeStreet2}</p>
                                        <p className="ml-2">{item.homeAddress.homeCity + " " + item.homeAddress.homeState + ", " + item.homeAddress.homeZip}</p>
                                    </div>

                                </div>
                                <div className={"w-full right"}>
                                    <p className="ml-4"><span
                                        className={"font-bold"}>Help Requested:</span> {item.helpRequested}</p>
                                    <p className={"ml-4 mb-11 "}><span
                                        className={"font-bold"}>Status:</span> {item.status}</p>
                                    <p className="ml-4"><span
                                        className={"font-bold"}>Income Verified:</span> {item.houseHoldIncome.isIncomeVerified ? 'Yes' : 'No'}
                                    </p>
                                    <p className="ml-4"><span
                                        className={"font-bold"}>License Verified:</span> {item.idSource.isValidLicense ? 'Yes' : 'No'}
                                    </p>
                                    <p className="ml-4"><span
                                        className={"font-bold"}>Bus Primary Transport:</span> {item.idSource.isBusPrimaryTransport ? 'Yes' : 'No'}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <button onClick={toggleShowForm} className={`${styles.addButton} mt-4 mb-8`} type="button">{showForm ? `HIDE FORM` : `SHOW FORM`}</button>
                                {showForm && <EditApplicationComponent item={item} onUpdate={updateItem} />}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
}

export default Accordion;
