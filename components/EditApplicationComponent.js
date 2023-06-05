import {useState, memo} from "react";
import ApplicantForm from "./applicant_form/ApplicantForm";


export default function EditApplicationComponent(props) {
    const {item, onUpdate, updateApplicant} = props
    const MemorizedApplicantForm = memo(ApplicantForm);



    return (
        <div className={'bg-amber-500 m-8 p-8 rounded border-2 border-indigo-700'}>
            <div>Item _id {item._id}</div>
            <MemorizedApplicantForm item={ item } updateApplicant={updateApplicant} onUpdate={onUpdate}/> {/* item={ item }  setEditedItem={setEditedItem}*/}
        </div>
    )
}