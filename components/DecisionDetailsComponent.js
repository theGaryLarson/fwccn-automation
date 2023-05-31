import RequirementCheckComponent from "./RequirementCheckComponent";
import NeedSummaryComponent from "./NeedSummaryComponent";
import {useState} from "react";

export default function DecisionDetailsComponent(props) {
    const { queryObject, records} = props
    const [ focusedItem, setFocusedItem ] = useState({})
    console.log("TYPEOF IN ROOT COMPONENT: ", setFocusedItem)
    return (
            <div>
                <NeedSummaryComponent focusedItem={focusedItem}/>
                <RequirementCheckComponent queryObject={queryObject} setFocusedItem={setFocusedItem} />
            </div>

    )
}