import {useState, memo} from "react";
import ApplicantForm from "./applicant_form/ApplicantForm";


export default function EditApplicationComponent(props) {
    const {item, onUpdate} = props
    const [editedItem, setEditedItem] = useState(item)
    const MemorizedApplicantForm = memo(ApplicantForm);

    const  updateApplicant = async (editedItem) => {
        try {
            const response = await fetch(`api/getAndUpdateOneRecord`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedItem)
            });
            if (response.ok) {
                return await response.json();
            } else {
                console.error(`Error updating item for state id#: ${editedItem.idSource?.driverLicenseOrId ?? ''} `, response.status);
            }

        } catch (e) {
            console.error(`Error updating item for state id#: ${editedItem.idSource?.driverLicenseOrId ?? ''}\n `, e);
            return null;
        }
    }

    return (
        <div className={'bg-amber-500 m-8 p-8 rounded border-2 border-indigo-700'}>
            <div>Item _id {item._id}</div>
            <MemorizedApplicantForm item={ item } updateApplicant={updateApplicant} onUpdate={onUpdate}/> {/* item={ item }  setEditedItem={setEditedItem}*/}
        </div>
    )
}