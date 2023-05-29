import SearchComponent from "./SearchComponent";
import DecisionDetailsComponent from "./DecisionDetailsComponent";
import {useState} from "react";


export default function EditReviewComponent() {
    const [records, setRecords] = useState([]);
    const [isMultipleAddresses, setIsMultipleAddresses] = useState(false);
    const [isDuplicateApplicant, setIsDuplicantApplicant] = useState(false);
    const [recordCount, setRecordCount] = useState(0);
    const [flags, setFlags] = useState( {
        //todo: set boolean values for requirements
    })
    async function getApplicantRecords(isAddress, queryObject) {
        if (isAddress) {
            setRecords(await getApplicantAddresses(queryObject))
            console.log(`Found ${records.length} records by address`)
        } else {
            setRecords(await getApplicantByStateId(queryObject))
            console.log(`Found ${records.length} records by state id`)
        }

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