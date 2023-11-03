import React, {useEffect, useMemo, useState} from "react";
import Accordion from "./Accordion";
import Legend from "./Legend";
import { toast } from 'react-toastify';

export default function QueryComponent(props) {
    const {  queryObject  } = props;
    const [responseData, setResponseData] = useState({});
    const [firstItem, setFirstItem] = useState(undefined);
    const [ focusedItem, setFocusedItem ] = useState({});
    const [isFirstLoad, setIsFirstLoad] = useState(true);  // Add this state variable


    useEffect(() => {
        let toastId;
        // Notify user that data is loading
        if (!isFirstLoad) {
            toastId = toast.info('Loading applications...', {
                autoClose: false,
                hideProgressBar: true
            });
        }
        async function fetchRequirementsCheckData() {
            try {
                const response = await fetch(`api/searchQuery`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(queryObject),
                });
                if (response.ok) {
                    toast.dismiss(toastId);
                    return await response.json();
                } else {
                    console.error("Error retrieving requirements check responseData: ", response.status);
                    toast.dismiss(toastId);
                    toast.error('Error retrieving data');
                }

            } catch (e) {
                console.error("Error retrieving requirements check responseData: ", e);
                toast.dismiss(toastId);
                toast.error('Error retrieving data');
                return null;
            }
        }
        if (!isFirstLoad) {
            fetchRequirementsCheckData().then( r => {
                setResponseData(r)
                // setFirstItem(responseData[0])
            });
        }
        setIsFirstLoad(false);

    }, [queryObject]);
    const records = useMemo(() =>  responseData, [responseData]);
    useEffect(() => {
        if (responseData?.length > 0) {
            setFirstItem(responseData[0]);
        }
    }, [records, responseData]);

    const removeDeletedItem = (deletedItemId) => {
        const updatedData = responseData.filter(item => item._id !== deletedItemId);
        setResponseData(updatedData);
    };

    return (
        <div>
            <div className={` w-full border-2 border-gray-600 p-4 box mt-4 mb-4`}>
                <Legend></Legend>
            </div>
            <div className={` w-full border-2 border-gray-600 p-4 box mt-4 mb-4`}>
                <h1 className={"flex items-center justify-center font-bold"}>
                    {records?.length > 0 && 'Submission History'}
                    {records?.length < 1 && 'No Record of Applicant or Address'}
                </h1>
                {/*ids && */(
                    <div className={"w-full"}>
                        { records?.length > 0 && records.map((item, index) => {
                                return (<Accordion setItemFocus={setFocusedItem} key={index} initialItem={item}
                                                   firstItem={firstItem} removeDeletedItem={removeDeletedItem}/>)
                            }
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
