import { memo } from "react";
import ApplicantForm from "./applicant_form/ApplicantForm";

export default function EditApplicationComponent(props) {
    const {item, onUpdate, updateApplicant} = props
    const MemorizedApplicantForm = memo(ApplicantForm);

    return (
        <div className={'flex flex-col items-left w-full bg-amber-500 m-2 ml-0 p-2 rounded border-2 border-indigo-700 ' }>
            <MemorizedApplicantForm item={ item } updateApplicant={updateApplicant} onUpdate={onUpdate}/> {/* item={ item }  setEditedItem={setEditedItem}*/}
            <div className={'text-right mt-4'}><span className={'font-bold'}>Record ObjectId:</span> {item._id}</div>
        </div>
    )
}