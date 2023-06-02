import SearchComponent from "./SearchComponent";
import DecisionDetailsComponent from "./DecisionDetailsComponent";
import {useEffect, useState} from "react";

export default function EditReviewComponent({records, setRecords}) {
    const [queryObject, setQueryObject] = useState("")
    const [recordCount, setRecordCount] = useState(0);

    // fixme: discern between multipleaddress or duplicate applicant :: In Progress with requirementCheck api route
    useEffect(() => {
        setRecordCount(records.length)
        console.log(`Updated records. Count: ${records.length} records.`);
    }, [records, recordCount]);

    async function getApplicantRecords(isAddress, queryObject) {
        // let resultRecords = isAddress ?
        //     await getApplicantByAddress(queryObject) :
        //     await getApplicantByStateId(queryObject);
        // setRecords(resultRecords);
        // console.log(resultRecords);
    }

    async function getApplicantByStateId(queryObject) {
        try {
            // todo: change api route. Use POST. Return all records. SORT BY PENDING
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
    async function getApplicantByAddress(queryObject) {
        try {
            // todo: change api route. Use POST. Return all records. SORT BY PENDING
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
             <SearchComponent setParentQueryObject={setQueryObject} parentHandleSubmit={getApplicantRecords}/>
             <DecisionDetailsComponent queryObject={queryObject} records={records}/>
         </div>
     </div>
 )

}