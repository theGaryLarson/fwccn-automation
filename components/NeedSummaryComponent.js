export default function NeedSummaryComponent(props) {
    const { focusedItem } = props;
    console.log(focusedItem)
    return (
        <div>
            { focusedItem &&
                (
                    <div>
                        <h1>{focusedItem.timestamp}</h1>
                    </div>
                )
            }
        </div>
    )
}