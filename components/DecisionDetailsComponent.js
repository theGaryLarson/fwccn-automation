import RequirementCheckComponent from "./RequirementCheckComponent";
import NeedSummaryComponent from "./NeedSummaryComponent";

export default function DecisionDetailsComponent({requirementFlags, records}) {

    return (
        <div>
            <NeedSummaryComponent/>
            <RequirementCheckComponent/>
        </div>
    )
}