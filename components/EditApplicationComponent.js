import {useState} from "react";
import ApplicantForm from "./applicant_form/ApplicantForm";


export default function EditApplicationComponent(props) {
    const {item} = props


    return (
        <div className={'bg-amber-500 m-8 p-8 rounded border-2 border-indigo-700'}>
            <ApplicantForm item={ item }/>
        </div>
    )
}