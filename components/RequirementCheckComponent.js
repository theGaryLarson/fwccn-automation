import { useEffect, useState } from "react";
import Accordion from "./Accordion";
export default function RequirementCheckComponent(props) {
    const [data, setData] = useState({});
    const { setFocusedItem, queryObject  } = props;
    console.log("typeOf in ReqChkComp", typeof setFocusedItem)
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`api/requirementsCheck`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(queryObject),
            });
            const res = await response.json();
            setData(res);
        };
        fetchData();
    }, [queryObject]);

    if (!data) {
        return <div>Loading...</div>;
    }

    const ids = data.stateIdDuplicates ? Object.values(data.stateIdDuplicates.records) : [];
    const addresses = data.addressDuplicates ? Object.values(data.addressDuplicates.records) : [];
    return (
        <div>
            <h1 className={"flex items-center justify-center font-bold"}>
                {ids.length > 0 && 'Applicants Submission History'}
                {addresses.length > 0 && 'Address Submission History'}
                {ids.length < 1 && addresses.length < 1 && 'No Previous Entries'}
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
