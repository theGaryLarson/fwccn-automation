import {useState, memo} from "react";
import ApplicantForm from "./applicant_form/ApplicantForm";


export default function EditApplicationComponent(props) {
    const {item} = props
    const [editedItem, setEditedItem] = useState(item)
    const MemorizedApplicantForm = memo(ApplicantForm);

    const  updateApplicant = async (item) => {
            console.log("updateApplicant(item): ", item)
        try {
            const response = await fetch(`api/updateApplicantRecord`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item)
            });
            if (response.ok) {
                return await response.json();
            } else {
                console.error(`Error updating item for state id#: ${item.idSource?.driverLicenseOrId ?? ''} `, response.status);
            }

        } catch (e) {
            console.error(`Error updating item for state id#: ${item.idSource?.driverLicenseOrId ?? ''}\n `, e);
            return null;
        }
    }


    return (
        <div className={'bg-amber-500 m-8 p-8 rounded border-2 border-indigo-700'}>
            <MemorizedApplicantForm item={ item } updateApplicant={updateApplicant} /> {'/* item={ item }  setEditedItem={setEditedItem}*/'}
        </div>
    )
}