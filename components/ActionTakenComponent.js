import React, {useState} from 'react';
import styles from "./applicant_form/ApplicantForm.module.css";
import {createTimeStamp, dateFormatNYears} from "../lib/util";

export default function ActionTakenComponent(props) {
    const {item, updateItem} = props;
    const [isAddressVerified, setIsAddressVerified] = useState(item?.homeAddress?.verified ?? false);
    const [isIncomeVerified, setIsIncomeVerified] = useState(item?.houseHoldIncome?.isIncomeVerified ?? false)
    const [isLicenseVerified, setIsLicenseVerified] = useState(item?.idSource?.isValidLicense ?? false)

    const [checkDate, setCheckDate] = useState(item?.actionTaken?.checkDate ?? undefined)
    //todo state for each input

    const handleInputChange = (event) => {

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
            console.log("item.idSource.isValidLicense: ", updatedLicense.idSource.isValidLicense)
        }
    };

    return (
        <div>
            <h2 className={'text-center w-full font-bold'}>ACTION TAKEN</h2>
            <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
                    <div className={'flex-1 font-bold '}>
                        <h2 className={'font-bold bg-green-300 '}>{item.helpRequested === 'rent' ? 'RENT' : (item.helpRequested === 'gasoline' ? 'GAS' : 'BUS')}</h2>
                        <div>
                            <label htmlFor={'amount-promised'}>Amount Promised:</label>
                            <input
                                type={"text"}
                                id={'amount-promised'}
                                name={'amount-promised'}
                                // value={''}
                                placeholder={'$0.00'}
                                // onChange={handleInputChange}
                                className={'bg-yellow-200'}
                            />
                            <div>
                                <label htmlFor={'amount-given'}>Amount Given Today:</label>
                                <input
                                    type={"text"}
                                    id={'amount-given'}
                                    name={'amount-given'}
                                    // value={''}
                                    placeholder={'$0.00'}
                                    // onChange={handleInputChange}
                                    className={'bg-yellow-200'}
                                />
                                { item.helpRequested === 'rent' &&
                                    (
                                        <div>
                                            <label htmlFor={'balance-owed'}>Rent Balance Owed Receipt:</label>
                                            <input
                                                type={"text"}
                                                id={'balance-owed'}
                                                name={'balance-owed'}
                                                // value={''}
                                                placeholder={'$0.00'}
                                                // onChange={handleInputChange}
                                                className={'bg-yellow-200'}
                                            />
                                        </div>
                                    )
                                }
                                { item.helpRequested === 'gasoline' &&
                                    (
                                        <div>
                                            <label htmlFor={'licensePlate'}>License Plate Number:</label>
                                            <input
                                                type={"text"}
                                                id={'licensePlate'}
                                                name={'licensePlate'}
                                                value={item?.licensePlate??''}
                                                placeholder={'Verify Plate Number'}
                                                onChange={handleInputChange}
                                                className={'bg-yellow-200'}
                                            />
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                <div className={'flex-1 font-bold '}>
                    <h2 className={'font-bold bg-green-300 '}>VERIFICATION</h2>
                    {/*conditonal rendering based on help requested*/}
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
                                        <span className='font-bold'>Lease Checked</span>
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
                </div>
                <div className={'flex-1 border-t border-black w-full mt-2'}>
                    <h2 className={'font-bold'}>CHECK INFORMATION</h2>
                    <div className={'w-full'}>
                        <label htmlFor={'checkMadeOutTo'}>PAY TO THE ORDER OF:</label>
                        <input
                            type={"text"}
                            id={'checkMadeOutTo'}
                            name={'checkMadeOutTo'}
                            // value={''}
                            placeholder={'PAY TO THE ORDER OF ...'}
                            // onChange={handleInputChange}
                            className={'bg-yellow-200 w-full'}
                        />
                    </div>
                </div>
                <div className={'flex-1 border-t border-black w-full  mt-2'}>
                    <div>
                        <div>
                            <label htmlFor={'checkDate'} className={'font-medium'}>CHECK DATE:</label>
                                <input
                                    type={"text"}
                                    id={'checkDate'}
                                    name={'checkDate'}
                                    value={item?.actionTaken?.checkDate??dateFormatNYears(createTimeStamp(), 0)}
                                    className={'ml-2'}
                                    readOnly={true}

                                />

                        </div>
                        <div>
                            <label htmlFor={'checkNumber'}>CHECK NUMBER:</label>
                            <input
                                type={"number"}
                                id={'checkNumber'}
                                name={'checkNumber'}
                                // value={''}
                                placeholder={'ENTER CHECK NUMBER'}
                                // onChange={handleInputChange}
                                className={'bg-yellow-200 w-full'}
                            />
                        </div>


                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
}

