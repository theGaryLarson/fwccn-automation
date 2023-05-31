import ApplicantForm from "../../components/applicant_form/ApplicantForm";
import EditReviewComponent from "../../components/EditReviewComponent";
import {useState} from "react";
// import getConfig from "next/config"

export default function Home() {
    // const {serverRuntimeConfig} = getConfig()
    // console.log(serverRuntimeConfig.ipAddress)
    const [records, setRecords] = useState([]);
    return (
    <main className="flex flex-col items-center justify-between p-8">
        <h1 className="font-bold">FWCCN Applicant Form</h1>
        <div>
            <div>

                <EditReviewComponent records={records} setRecords={setRecords}/>
            </div>
            <ApplicantForm></ApplicantForm>
        </div>
    </main>
  )
}
