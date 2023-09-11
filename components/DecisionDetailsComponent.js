import QueryComponent from "./QueryComponent";
import NeedSummaryComponent from "./NeedSummaryComponent";
import {useEffect, useState} from "react";

export default function DecisionDetailsComponent(props) {
    const { queryObject, records} = props // queryObject state in EditReviewComponents

    return (
            <div>
                <QueryComponent queryObject={queryObject}  />
            </div>
    )
}