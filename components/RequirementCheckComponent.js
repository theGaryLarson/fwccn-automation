import React, {useEffect, useMemo, useState} from "react";
import Accordion from "./Accordion";
import Legend from "./Legend";

export default function RequirementCheckComponent(props) {
    const {  queryObject  } = props;
    const [data, setData] = useState({});
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
                console.log("QUERY OBJ: ", queryObject)
                if (response.ok) {
                    return await response.json();
                } else {
                    console.error("Error retrieving requirements check data: ", response.status);
                }

            } catch (e) {
                console.error("Error retrieving requirements check data: ", e);
                return null;
            }
        }
        fetchRequirementsCheckData().then( r => {
                setData(r)
        });
    }, [queryObject]);


    if (!data) {
        return <div>Loading...</div>;
    }

    //question: I used these to suppress warnings because it was working. Is this okay? (see next 3 comments)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ids = useMemo(() => data.stateIdDuplicates ? Object.values(data.stateIdDuplicates.records) : [], [data]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const addresses = useMemo(() => data.addressDuplicates ? Object.values(data.addressDuplicates.records) : [], [data]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (ids && ids.length > 0) {
            setFirstItem(ids[0]);
        }
    }, [ids]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (addresses && addresses.length > 0) {
            setFirstItem(addresses[0]);
        }
    }, [addresses]);
    return (
        <div>
            <div className={` w-full border-2 border-gray-600 p-4 box mt-4 mb-4`}>
                <Legend></Legend>
            </div>
            <div className={` w-full border-2 border-gray-600 p-4 box mt-4 mb-4`}>
                <h1 className={"flex items-center justify-center font-bold"}>
                    {ids.length > 0 && 'Applicants Submission History'}
                    {addresses.length > 0 && 'Address Submission History'}
                    {queryObject && (ids.length < 1 && addresses.length < 1) && 'No Record of Applicant or Address'}
                </h1>
                {ids && (
                    <div className={"w-full"}>
                        {ids?.map((item, index) => {
                                return (<Accordion setItemFocus={setFocusedItem} key={index} initialItem={item}
                                                   firstItem={firstItem}/>)
                            }
                        )}
                    </div>
                )}
                {addresses && (
                    <div className={"w-full"}>
                        <div className={"place-items-center"}>
                        </div>
                        {addresses?.map((item, index) => (
                            <Accordion setItemFocus={setFocusedItem} key={index} initialItem={item}
                                       firstItem={firstItem}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
