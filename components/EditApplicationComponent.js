import {useState} from "react";
import ApplicantForm from "./applicant_form/ApplicantForm";


export function EditApplicationComponent(props) {
    const {item} = props


    return (
        <div>
            <ApplicantForm item={ item }/>
        </div>
    )
}