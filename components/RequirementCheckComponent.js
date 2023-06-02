import { useEffect, useState } from "react";
import Accordion from "./Accordion";
import NeedSummaryComponent from "./NeedSummaryComponent";
export default function RequirementCheckComponent(props) {
    const { setFocusedItem, queryObject  } = props;
    const [data, setData] = useState({});  // SearchComponent prop
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

    const ids = data.stateIdDuplicates ? Object.values(data.stateIdDuplicates.records) : [];
    const addresses = data.addressDuplicates ? Object.values(data.addressDuplicates.records) : [];

    return (
        <div className={`border-2 border-gray-600 p-4 box mt-4 mb-4`}>
            <h1 className={"flex items-center justify-center font-bold"}>
                {ids.length > 0 && 'Applicants Submission History'}
                {addresses.length > 0 && 'Address Submission History'}
                {ids.length < 1 && addresses.length < 1 && 'No Record of Applicant or Address'}
            </h1>
            {ids && (
                <div>
                    {ids.map((item, index) => (
                        <Accordion setItemFocus={setFocusedItem} key={index} item={item} />
                    ))}
                </div>
            )}
            {addresses && (
                <div className={"w-full"}>
                    <div className={"place-items-center"}>
                    </div>
                    {addresses.map((item, index) => (
                        <Accordion setItemFocus={setFocusedItem} key={index} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
}
