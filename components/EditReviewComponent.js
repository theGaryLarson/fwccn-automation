import SearchComponent from "./SearchComponent";
import DecisionDetailsComponent from "./DecisionDetailsComponent";
import {useEffect, useState} from "react";


export default function EditReviewComponent() {
    const [records, setRecords] = useState([]);
    const [isMultipleAddresses, setIsMultipleAddresses] = useState(false);
    const [isDuplicateApplicant, setIsDuplicateApplicant] = useState(false);
    const [recordCount, setRecordCount] = useState(0);
    const [flags, setFlags] = useState( {
        //todo: set boolean values for requirements
    })

    useEffect(() => {
        setIsMultipleAddresses(records.length > 1);
        console.log(`Updated records. Count: ${records.length} records. Multiple addresses: `, records.length > 1);
    }, [records]);

    useEffect(() => {
        setIsDuplicateApplicant(records.length > 1);
        console.log(`Updated records. Count: ${records.length} records. Duplicate applicants: `, records.length > 1);
    }, [records]);

    async function getApplicantRecords(isAddress, queryObject) {
        let resultRecords = isAddress ?
            await getApplicantAddresses(queryObject) :
            await getApplicantByStateId(queryObject);
        setRecords(resultRecords);
    }

    async function getApplicantByStateId(queryObject) {
        try {
            const response = await fetch(`/api/getByStateId?${queryObject}`);
            if (response.ok) {
                return await response.json()
            } else {
                console.error("Error retrieving documents by state id: ", response.status);
            }
        } catch (e) {
            console.error("Error retrieving documents by state id: ", e);
            return null;
        }
    }
    async function getApplicantAddresses(queryObject) {
        try {
            const response = await fetch(`/api/getByAddress?${queryObject}`);
            if (response.ok) {
                return await response.json()
            } else {
                console.error("Error retrieving documents by address: ", response.status);
            }
        } catch (e) {
            console.error("Error retrieving documents by address: ", e);
            return null;
        }
    }
 return (
     <div>
         <div className={"styles.componentWrapper"}>
             <SearchComponent parentHandleSubmit={getApplicantRecords}/>
             <DecisionDetailsComponent/>
         </div>
     </div>
 )

}