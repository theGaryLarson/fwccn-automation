import RequirementCheckComponent from "./RequirementCheckComponent";
import NeedSummaryComponent from "./NeedSummaryComponent";
import {useEffect, useState} from "react";

export default function DecisionDetailsComponent(props) {
    const { queryObject, records} = props // queryObject state in EditReviewComponents

    return (
            <div>
                <RequirementCheckComponent queryObject={queryObject}  />
            </div>
    )
}