import ApplicantForm from "../../components/applicant_form/ApplicantForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
        <h1 className="font-bold">FWCCN Applicant Form</h1>
        <div>
            <ApplicantForm></ApplicantForm>
        </div>
    </main>
  )
}
