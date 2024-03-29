import React, {useEffect, useRef, useState} from 'react';


export default function ActionTakenComponent(props) {
    const {item, updateItem} = props;
    const [isAddressVerified, setIsAddressVerified] = useState(item?.homeAddress?.verified ?? false);
    const [isIncomeVerified, setIsIncomeVerified] = useState(item?.houseHoldIncome?.isIncomeVerified ?? false)
    const [isLicenseVerified, setIsLicenseVerified] = useState(item?.idSource?.isValidLicense ?? false)
    const [isBusVerified, setIsBusVerified] = useState(item?.isBusPrimaryTransport ?? false)
    const [isTxtAreaCollapsed, setIsTxtAreaCollapsed] = useState(true);
    const actionNotesRef = useRef(null);
    const checkAddressFields = ['checkStreet1', 'checkStreet2', 'checkCity', 'checkState', 'checkZip']

    useEffect(() => {
        // Create a deep copy of the item to avoid direct mutation
        let updatedItem = JSON.parse(JSON.stringify(item));

        // Check and update the 'checkMadeOutTo' field if necessary
        if (!updatedItem.actionTaken.checkMadeOutTo) {
            updatedItem.actionTaken.checkMadeOutTo = item?.landLord?.fullName ?? '';
        }

        // Check and update the address fields if necessary
        if (!updatedItem.actionTaken.checkAddress.checkStreet1) {
            updatedItem.actionTaken.checkAddress.checkStreet1 = item?.landLord?.landLordAddress?.landLordStreet1 ?? '';
        }

        if (!updatedItem.actionTaken.checkAddress.checkStreet2) {
            updatedItem.actionTaken.checkAddress.checkStreet2 = item?.landLord?.landLordAddress?.landLordStreet2 ?? '';
        }

        if (!updatedItem.actionTaken.checkAddress.checkCity) {
            updatedItem.actionTaken.checkAddress.checkCity = item?.landLord?.landLordAddress?.landLordCity ?? '';
        }

        if (!updatedItem.actionTaken.checkAddress.checkState) {
            updatedItem.actionTaken.checkAddress.checkState = item?.landLord?.landLordAddress?.landLordState ?? '';
        }

        if (!updatedItem.actionTaken.checkAddress.checkZip) {
            updatedItem.actionTaken.checkAddress.checkZip = item?.landLord?.landLordAddress?.landLordZip ?? '';
        }

        // Use updateItem to update the state
        updateItem(updatedItem);
    }, [item, updateItem]); // TODO: fix warning: added item, updateItem. Dependencies array ensures the effect runs when item or updateItem changes

    const handleInputChange = (event) => {
        //todo: handle editable information: check info & address license plate number
        const {name, value } = event.target;
        if (name === 'licensePlate') {
            const updatedLicensePlate = {
                ...item,
                licensePlate: value
            }
            updateItem(updatedLicensePlate)
        } else if (checkAddressFields.includes(name)) {
            const updatedAddress = {
                ...item,
                actionTaken: {
                    ...item.actionTaken,
                    checkAddress: {
                        ...item.actionTaken.checkAddress,
                        [name]: value
                    }
                }
            }
            updateItem(updatedAddress);

        } else {
            const updatedActionTaken = {
                ...item,
                actionTaken: {
                    ...item.actionTaken,
                    [name]: value
                }
            }
            updateItem(updatedActionTaken)
        }
    }

    const handleDateOfService = (event) => {
        const { value } = event.target;
        const updatedDateOfService = {
            ...item,
            dateOfService: value
        }
        updateItem(updatedDateOfService)
    }

    const handlePromiseFilled = (event) => {
        const {value} = event.target;
        const updatedPromiseFilled = {
            ...item,
            actionTaken: {
                ...item.actionTaken,
                promiseFilled: value
            }
        }
        updateItem(updatedPromiseFilled);
    }

    const handleCheckboxChange = (event) => {
        const { name } = event.target

        if (name === 'addressIsVerified' ) {
            setIsAddressVerified(!isAddressVerified);
            const updatedAddress = {
                ...item,
                homeAddress: {
                    ...item.homeAddress,
                    verified: !isAddressVerified,
                },
            };
            updateItem(updatedAddress);
        } else if (name === 'incomeIsVerified') {
            setIsIncomeVerified(!isIncomeVerified);
            const updatedIncome = {
                ...item,
                houseHoldIncome: {
                    ...item.houseHoldIncome,
                    isIncomeVerified: !isIncomeVerified,
                },
            };
            updateItem(updatedIncome);
        } else if (name === 'isValidLicense') {
            setIsLicenseVerified(!isLicenseVerified);
            const updatedLicense = {
                ...item,
                idSource: {
                    ...item.idSource,
                    isValidLicense: !isLicenseVerified
                }
            }
            updateItem(updatedLicense);
        } else if (name === 'isBusPrimaryTransport') {
            setIsBusVerified(!isBusVerified);
            const updatedBus = {
                ...item,
                isBusPrimaryTransport: !isBusVerified
            }
            updateItem(updatedBus);
        } else {
            //do nothing
        }
    };

    const toggleTextAreaSize = (textAreaRef) => {
        setIsTxtAreaCollapsed(!isTxtAreaCollapsed);
        const textarea = textAreaRef.current;

        if (isTxtAreaCollapsed) {
            textarea.style.height = "250px";
            textarea.style.height = `${textarea.scrollHeight}px`;
        } else {
            textarea.style.height = "250px";

            const textareaOffset = textarea.getBoundingClientRect().top + window.scrollY - 40;

            window.scrollTo({
                top: textareaOffset,
                behavior: "smooth",
            });
        }
    };

    return (
        <div>
            <h2 className={'text-center w-full font-bold'}>ACTION TAKEN</h2>
            <div className="grid grid-cols-2 grid-rows-1 gap-2 h-full">
                <div className={'flex-1'}>
                    <h2 className={'font-bold bg-green-300 pl-2 mb-2'}>
                        {item?.helpRequested === 'rent'
                            ? 'RENT'
                            : (item?.helpRequested === 'gasoline'
                                    ? 'GAS'
                                    : (item?.helpRequested === 'motel'
                                            ? 'MOTEL'
                                            : (item?.helpRequested === 'busTicket'
                                                    ? 'BUS'
                                                    : 'SERVICE TYPE NOT RECORDED'
                                            )
                                    )
                            )
                        }
                    </h2>
                    <label htmlFor="dateOfService" className="mt-2"><span className={'font-medium'}>Date of Service:</span> </label>
                    <input
                        type="date"
                        id="dateOfService"
                        name="dateOfService"
                        value={item?.dateOfService?.split('T')[0]??''}
                        placeholder='Second Interviewer for Approval'
                        onChange={handleDateOfService}
                        className="bg-yellow-200 w-full pl-1"
                    />
                    <div>
                        <label htmlFor={'amountPromised'}><span className={'font-medium'}>Amount Promised:</span></label>
                        <input
                            type={"text"}
                            id={'amountPromised'}
                            name={'amountPromised'}
                            value={item?.actionTaken?.amountPromised??''}
                            placeholder={'$0.00'}
                            onChange={handleInputChange}
                            className={'bg-yellow-200 pl-1'}
                        />
                        <div>
                            <label htmlFor={'amountGivenToday'}><span className={'font-medium'}>Amount Given Today:</span></label>
                            <input
                                type={"text"}
                                id={'amountGivenToday'}
                                name={'amountGivenToday'}
                                value={item?.actionTaken?.amountGivenToday}
                                placeholder={'$0.00'}
                                onChange={handleInputChange}
                                className={'bg-yellow-200 pl-1'}
                            />
                            { item.helpRequested === 'rent' &&
                                (
                                    <div>
                                        <label htmlFor={'rentBalanceOwed'}><span className={'font-medium'}>Rent Balance Owed Receipt:</span></label>
                                        <input
                                            type={"text"}
                                            id={'rentBalanceOwed'}
                                            name={'rentBalanceOwed'}
                                            value={item?.actionTaken?.rentBalanceOwed}
                                            placeholder={'$0.00'}
                                            onChange={handleInputChange}
                                            className={'bg-yellow-200 pl-1'}
                                        />
                                    </div>
                                )
                            }
                            { item.helpRequested === 'gasoline' &&
                                (
                                    <div>
                                        <label htmlFor={'licensePlate'}><span className={'font-medium'}>License Plate Number:</span></label>
                                        <input
                                            type={"text"}
                                            id={'licensePlate'}
                                            name={'licensePlate'}
                                            value={item?.licensePlate}
                                            placeholder={'Verify Plate Number'}
                                            onChange={handleInputChange}
                                            className={'bg-yellow-200 pl-1'}
                                        />
                                    </div>
                                )
                            }
                        </div>

                    </div>
                </div>
                {/*end first grid here*/}
                <div className={'flex-1'}>
                    <h2 className={'font-bold bg-green-300 pl-2 mb-2'}>VERIFICATION</h2>
                    <label htmlFor="secondInterviewer" className="mt-2"><span className={'font-medium'}>Second Interviewer:</span> </label>
                    <input
                        type="text"
                        id="secondInterviewer"
                        name="secondInterviewer"
                        value={item?.actionTaken?.secondInterviewer??''}
                        placeholder='Second Interviewer for Approval'
                        onChange={handleInputChange}
                        className="bg-yellow-200 w-full pl-1"
                    />
                    <label htmlFor="promiseFilled" className="mt-2"><span className={'font-medium'}>Date Promise Filled:</span> </label>
                    <input
                        type="date"
                        id="promiseFilled"
                        name="promiseFilled"
                        value={item?.actionTaken?.promiseFilled?.slice(0, 10)??''}
                        onChange={handlePromiseFilled}
                        className="bg-yellow-200 w-full pl-1"
                    />
                    <h1 className='font-bold mt-4'>Required Verifications</h1>
                    {/*conditional rendering based on help requested*/}
                    {   item.helpRequested === 'rent' &&
                        (
                            <div>
                                <div>
                                    <input
                                        type="checkbox"
                                        id="addressIsVerified"
                                        name="addressIsVerified"
                                        className="hidden"
                                        onChange={handleCheckboxChange}
                                    />
                                    <label htmlFor="addressIsVerified" className="flex items-center mt-4 select-none">
                                        <span className={` 
                                            mr-2 border rounded border-gray-400
                                            w-5 h-5 flex items-center justify-center
                                             ${isAddressVerified ? 'bg-green-500' : 'bg-white'}`}>
                                            {isAddressVerified && '✓'}
                                        </span>
                                        <span className='font-bold'>Lease Verified</span>
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        id="incomeIsVerified"
                                        name="incomeIsVerified"
                                        className="hidden"
                                        onChange={handleCheckboxChange}
                                    />
                                    <label htmlFor="incomeIsVerified" className="flex items-center mt-4 select-none">
                                        <span className={` 
                                            mr-2 border rounded border-gray-400
                                            w-5 h-5 flex items-center justify-center
                                             ${isIncomeVerified ? 'bg-green-500' : 'bg-white'}`}>
                                            {isIncomeVerified && '✓'}
                                        </span>
                                        <span className='font-bold'>Income Verified</span>
                                    </label>
                                </div>
                            </div>
                        )
                    }
                    { item.helpRequested === 'gasoline' &&
                        (
                            <div>
                                <input
                                    type="checkbox"
                                    id="isValidLicense"
                                    name="isValidLicense"
                                    className="hidden"
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="isValidLicense" className="flex items-center mt-4 select-none">
                                        <span className={` 
                                            mr-2 border rounded border-gray-400
                                            w-5 h-5 flex items-center justify-center
                                             ${isLicenseVerified ? 'bg-green-500' : 'bg-white'}`}>
                                            {isLicenseVerified && '✓'}
                                        </span>
                                    <span className='font-bold'>Valid License Verified</span>
                                </label>
                            </div>
                        )
                    }
                    { item.helpRequested === 'busTicket' &&
                        (
                            <div>
                                <input
                                    type="checkbox"
                                    id="isBusPrimaryTransport"
                                    name="isBusPrimaryTransport"
                                    className="hidden pl-1"
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="isBusPrimaryTransport" className="flex items-center mt-4 select-none">
                                        <span className={` 
                                            mr-2 border rounded border-gray-400
                                            w-5 h-5 flex items-center justify-center
                                             ${isBusVerified ? 'bg-green-500' : 'bg-white'}`}>
                                            {isBusVerified && '✓'}
                                        </span>
                                    <span className='font-bold'>Bus Primary Transport</span>
                                </label>
                            </div>
                        )
                    }
                </div>
            </div>
            {
                item?.helpRequested === 'motel' && (
                    <div>
                        <h2 className={'mt-4 w-full border-t border-black pt-1 font-bold'}>MOTEL</h2>
                        <div className={'flex flex-row-3'}>
                            <div className={'flex-1'}>
                                <label htmlFor={'motelLocation'} className={'whitespace-nowrap mr-4'}>
                                    Arrangements-Where?:</label>
                                <input
                                    type={"text"}
                                    id={'motelLocation'}
                                    name={'motelLocation'}
                                    value={item?.actionTaken?.motelLocation??''}
                                    placeholder={'Name of hotel'}
                                    onChange={handleInputChange}
                                    className={'bg-yellow-200 pl-1'}
                                />
                            </div>
                            <div className={'flex-1'}>
                                <label htmlFor={'motelDurationDays'} className={'ml-2'}>How many days?:</label>
                                <input
                                    type={"text"}
                                    id={'motelDurationDays'}
                                    name={'motelDurationDays'}
                                    value={item?.actionTaken?.motelDurationDays??''}
                                    placeholder={'Number of days in hotel'}
                                    onChange={handleInputChange}
                                    className={'bg-yellow-200 ml-2 pl-1'}
                                />
                            </div>
                            <div className={'flex-1'}>
                                <label htmlFor={'motelCost'} className={'ml-2 whitespace-nowrap'}>Cost:</label>
                                <input
                                    type={"text"}
                                    id={'motelCost'}
                                    name={'motelCost'}
                                    value={ item?.helpRequested === "motel" && (item?.actionTaken?.checkAmount??'')}
                                    placeholder={'Cost of hotel'}
                                    onChange={handleInputChange}
                                    className={'bg-yellow-200 ml-2 w-40 pl-1'}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
            <div className={'grid grid-cols-2 grid-rows-1 gap-2'}>
                { item?.helpRequested === 'rent' &&
                    <div className={'flex-1 border-t border-black w-full mt-4'}>
                        <h2 className={'font-bold pt-2'}>CHECK INFORMATION</h2>
                        <div className={'w-full'}>
                            <label htmlFor={'checkMadeOutTo'}>PAY TO THE ORDER OF:</label>
                            <input
                                type={"text"}
                                id={'checkMadeOutTo'}
                                name={'checkMadeOutTo'}
                                value={item?.actionTaken?.checkMadeOutTo ?? ''}
                                placeholder={'PAY TO THE ORDER OF ...'}
                                onChange={handleInputChange}
                                className={'bg-yellow-200 w-full pl-1'}
                            />
                        </div>
                        <div className={'w-full'}>
                            <h2 className={'font-bold mt-2'}>CHECK ADDRESS</h2>
                            <label htmlFor={'checkStreet1'}>Street1:</label>
                            <input
                                type={"text"}
                                id={'checkStreet1'}
                                name={'checkStreet1'}
                                value={item?.actionTaken?.checkAddress?.checkStreet1}
                                placeholder={'123 Oak St.'}
                                onChange={handleInputChange}
                                className={'bg-yellow-200 w-full pl-1'}
                            />
                            <label htmlFor={'checkStreet2'}>Street2:</label>
                            <input
                                type={"text"}
                                id={'checkStreet2'}
                                name={'checkStreet2'}
                                value={item?.actionTaken?.checkAddress?.checkStreet2}
                                placeholder={'Apt. 100'}
                                onChange={handleInputChange}
                                className={'bg-yellow-200 w-full pl-1'}
                            />
                            <label htmlFor={'checkCity'}>City:</label>
                            <input
                                type={"text"}
                                id={'checkCity'}
                                name={'checkCity'}
                                value={item?.actionTaken?.checkAddress?.checkCity}
                                placeholder={'Tacoma'}
                                onChange={handleInputChange}
                                className={'bg-yellow-200 w-full pl-1'}
                            />
                            <label htmlFor={'checkState'}>State:</label>
                            <input
                                type={"text"}
                                id={'checkState'}
                                name={'checkState'}
                                value={item?.actionTaken?.checkAddress?.checkState}
                                placeholder={'WA'}
                                onChange={handleInputChange}
                                className={'bg-yellow-200 w-full pl-1'}
                            />
                            <label htmlFor={'checkZip'}>Zip:</label>
                            <input
                                type={"text"}
                                id={'checkZip'}
                                name={'checkZip'}
                                value={item?.actionTaken?.checkAddress?.checkZip}
                                placeholder={'98105'}
                                onChange={handleInputChange}
                                className={'bg-yellow-200 w-full pl-1'}
                            />
                        </div>
                    </div>
                }
                <div className={'flex-1 border-t border-black w-full mt-4 pt-2'}>
                    <div>
                        { item?.helpRequested === 'rent' &&
                            (
                                <>
                                    <div className={'flex-grow'}>
                                        <label htmlFor={'checkDate'} className={'font-medium'}>CHECK DATE:</label>
                                        <input
                                            type={"date"}
                                            id={'checkDate'}
                                            name={'checkDate'}
                                            value={item?.actionTaken?.checkDate ?? ''}
                                            onChange={handleInputChange}
                                            className={'ml-2 bg-yellow-200 pl-1'}

                                        />
                                    </div>
                                </>
                            )
                        }
                        <div>
                            {item?.helpRequested === 'rent' && (
                                <>
                                    <label htmlFor={'checkNumber'}>CHECK NUMBER:</label>
                                    <input
                                        type={"number"}
                                        id={'checkNumber'}
                                        name={'checkNumber'}
                                        value={item?.actionTaken?.checkNumber ?? ''}
                                        placeholder={'ENTER CHECK NUMBER'}
                                        onChange={handleInputChange}
                                        className={'bg-yellow-200 w-full pl-1'}
                                    />
                                </>
                            )}
                            <label htmlFor={'checkAmount'}>
                                { item?.helpRequested !== 'rent'
                                    ? 'VOUCHER AMOUNT:'
                                    : 'CHECK AMOUNT:'}
                            </label>
                            <input
                                type={"number"}
                                id={'checkAmount'}
                                name={'checkAmount'}
                                value={item?.actionTaken?.checkAmount??''}
                                placeholder={'ENTER ' + (item?.helpRequested !== 'rent' ? 'VOUCHER' : 'CHECK ')  + ' AMOUNT'}
                                onChange={handleInputChange}
                                className={'bg-yellow-200 w-full pl-1'}
                            />

                        </div>
                        <label htmlFor={'actionNotes'} className={'font-medium'}>Notes</label>
                        <textarea
                            id="actionNotes"
                            name="actionNotes"
                            value={item?.actionTaken?.actionNotes}
                            className="h-[250px] bg-blue-50 border-indigo-700 border-2 w-full p-2 pt-1  resize-none"
                            onClick={() => toggleTextAreaSize(actionNotesRef)}
                            onChange={handleInputChange}
                            ref={actionNotesRef}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

