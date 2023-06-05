import { memo } from "react";
import ApplicantForm from "./applicant_form/ApplicantForm";

export default function EditApplicationComponent(props) {
    const {item, onUpdate, updateApplicant} = props
    const MemorizedApplicantForm = memo(ApplicantForm);

    /*className={'mb-16  h-full bg-white flex flex-col items-stretch'*/

    return (
        <div className={'flex flex-col items-left w-full bg-amber-500 m-2 ml-0 p-2 rounded border-2 border-indigo-700 ' }>
            {/*<div>Item _id {item._id}</div>*/}
            <MemorizedApplicantForm item={ item } updateApplicant={updateApplicant} onUpdate={onUpdate}/> {/* item={ item }  setEditedItem={setEditedItem}*/}
        </div>
    )
}