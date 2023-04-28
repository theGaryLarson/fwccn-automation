import { Radio } from "@nextui-org/react";

export default function ApplicantNeed( {name}) {
    return (
        <div>
            <h6>Hi {name}, please let me know what you need help with?</h6>
            <Radio.Group label="Options" defaultValue="A">
                <Radio value="A">Gas</Radio>
                <Radio value="B">Food</Radio>
                <Radio value="C">Rent</Radio>
                <Radio value="D">Bus</Radio>
            </Radio.Group>
        </div>
    );
}