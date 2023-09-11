import QueryComponent from "./QueryComponent";

export default function DecisionDetailsComponent(props) {
    const { queryObject } = props // queryObject state in EditReviewComponents

    return (
            <div>
                <QueryComponent queryObject={queryObject}  />
            </div>
    )
}