import React, {useEffect, useMemo, useState} from "react";
import Accordion from "./Accordion";
import Legend from "./Legend";

export default function RequirementCheckComponent(props) {
    const {  queryObject  } = props;
    const [responseData, setResponseData] = useState({});
    const [firstItem, setFirstItem] = useState(undefined)
    const [ focusedItem, setFocusedItem ] = useState({})

    useEffect(() => {
        async function fetchRequirementsCheckData() {
            try {
                const response = await fetch(`api/requirementsCheck`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(queryObject),
                });
                if (response.ok) {
                    return await response.json();
                } else {
                    console.error("Error retrieving requirements check responseData: ", response.status);
                }

            } catch (e) {
                console.error("Error retrieving requirements check responseData: ", e);
                return null;
            }
        }
        fetchRequirementsCheckData().then( r => {
                setResponseData(r)
            // setFirstItem(responseData[0])
        });
    }, [queryObject]);
    const records = useMemo(() =>  responseData, [responseData]);
    useEffect(() => {
        if (responseData?.length > 0) {
            setFirstItem(responseData[0]);
        }
    }, [records]);

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
                                                   firstItem={firstItem}/>)
                            }
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
