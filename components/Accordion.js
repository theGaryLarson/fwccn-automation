import React, {useContext, useState} from "react";
import { formatNextEligibleDate } from "../lib/util";
import NeedSummaryComponent from "./NeedSummaryComponent";

    function Accordion(props) {
        const [isOpen, setIsOpen] = useState(false);
        const { item, setItemFocus } = props;
        const items = Object.values(item);
        const toggleAccordion = () => {
            setIsOpen(!isOpen);
        };

        const handleFocus = () => {
            setItemFocus(item)
        }

        return (
            <div onClick={handleFocus}>
                <div className={`flex flex-col items-center`}>
                    <button
                        onClick={toggleAccordion}
                        className={` rounded m-1 mb-0 p-2 w-full text-center ${item.status === 'APPROVED' || item.status === 'APPROVED-OVERRIDE' ? ' bg-green-100 border-green-500 border-2' : ' bg-red-100 border-red-500 border-2'}`}
                    >
                         <span className="font-bold">
                            {formatNextEligibleDate(item.timestamp, 0)}
                         </span>

                    </button>
                    {isOpen && (
                        <div>
                            <NeedSummaryComponent focusedItem={item} />
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
                        </div>


                    )}

                </div>

            </div>
        );
}

export default Accordion;
