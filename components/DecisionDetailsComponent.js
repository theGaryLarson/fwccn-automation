import RequirementCheckComponent from "./RequirementCheckComponent";
import NeedSummaryComponent from "./NeedSummaryComponent";
import {useEffect, useState} from "react";

export default function DecisionDetailsComponent(props) {
    const { queryObject, records} = props
    const [ focusedItem, setFocusedItem ] = useState({}) //todo: change state to undefined and could remove helper function in NeedsSummary
    const [firstItem, setFirstItem] = useState(undefined)
    useEffect( () => {

    }, [focusedItem])
    return (
            <div>
                <RequirementCheckComponent queryObject={queryObject} setFocusedItem={setFocusedItem} />
                {/*<NeedSummaryComponent focusedItem={focusedItem} firstItem={firstItem}/>*/}
            </div>
    )
}