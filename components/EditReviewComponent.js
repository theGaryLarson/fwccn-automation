import SearchComponent from "./SearchComponent";
import DecisionDetailsComponent from "./DecisionDetailsComponent";
import { useState } from "react";

export default function EditReviewComponent() {
    const [queryObject, setQueryObject] = useState("")

 return (
     <div>
         <div className={"styles.componentWrapper"}>
             <SearchComponent setParentQueryObject={setQueryObject} /> {/*parentHandleSubmit={getApplicantRecords}*/}
             <DecisionDetailsComponent queryObject={queryObject} /> {/*records={records}*/}
         </div>
     </div>
 )

}