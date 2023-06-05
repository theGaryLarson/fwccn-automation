import SearchComponent from "./SearchComponent";
import DecisionDetailsComponent from "./DecisionDetailsComponent";
import { useState } from "react";

export default function EditReviewComponent(props) {
    // const {records, setRecords} = props
    const [queryObject, setQueryObject] = useState("")

    // todo: Add more search features. This commented code is functional but isn't connected to the app in anyway
    // const [recordCount, setRecordCount] = useState(0);
    // useEffect(() => {
    //     setRecordCount(records.length)
    //     console.log(`Updated records. Count: ${records.length} records.`);
    // }, [records, recordCount]);
    //
    // async function getApplicantRecords(isAddress, queryObject) {
        // let resultRecords = isAddress ?
        //     await getApplicantByAddress(queryObject) :
        //     await getApplicantByStateId(queryObject);
        // setRecords(resultRecords);
        // console.log(resultRecords);
    // }
    //
    // async function getApplicantByStateId(queryObject) {
    //     try {
    //         const response = await fetch(`/api/getByStateId?${queryObject}`);
    //         if (response.ok) {
    //             return await response.json()
    //         } else {
    //             console.error("Error retrieving documents by state id: ", response.status);
    //         }
    //     } catch (e) {
    //         console.error("Error retrieving documents by state id: ", e);
    //         return null;
    //     }
    // }
    // async function getApplicantByAddress(queryObject) {
    //     try {
    //         const response = await fetch(`/api/getByAddress?${queryObject}`);
    //         if (response.ok) {
    //             return await response.json()
    //         } else {
    //             console.error("Error retrieving documents by address: ", response.status);
    //         }
    //     } catch (e) {
    //         console.error("Error retrieving documents by address: ", e);
    //         return null;
    //     }
    // }
 return (
     <div>
         <div className={"styles.componentWrapper"}>
             <SearchComponent setParentQueryObject={setQueryObject} /> {/*parentHandleSubmit={getApplicantRecords}*/}
             <DecisionDetailsComponent queryObject={queryObject} /> {/*records={records}*/}
         </div>
     </div>
 )

}