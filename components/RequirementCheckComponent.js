import React, {useEffect, useMemo, useState} from "react";
import Accordion from "./Accordion";
import NeedSummaryComponent from "./NeedSummaryComponent";
import {formatNextEligibleDate} from "../lib/util";
export default function RequirementCheckComponent(props) {
    const {  queryObject  } = props;
    const [data, setData] = useState({});
    const [firstItem, setFirstItem] = useState(undefined)
    const [ focusedItem, setFocusedItem ] = useState({}) //todo: change state to undefined and could remove helper function in NeedsSummary

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


    // todo: refactor these returns and render logic to be more generalized for flexibility
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
        <div className={` w-full border-2 border-gray-600 p-4 box mt-4 mb-4`}>
            <h1 className={"flex items-center justify-center font-bold"}>
                {ids.length > 0 && 'Applicants Submission History'}
                {addresses.length > 0 && 'Address Submission History'}
                {ids.length < 1 && addresses.length < 1 && 'No Record of Applicant or Address'}
            </h1>
            {ids && (
                <div className={"w-full"}>
                    {ids?.map((item, index) => {
                        return (<Accordion setItemFocus={setFocusedItem} key={index} item={item} firstItem={firstItem} />)}
                    )}
                </div>
            )}
            {addresses && (
                <div className={"w-full"}>
                    <div className={"place-items-center"}>
                    </div>
                    {addresses?.map((item, index) => (
                        <Accordion setItemFocus={setFocusedItem} key={index} item={item} firstItem={firstItem}/>
                    ))}
                </div>
            )}
        </div>
    );
}
