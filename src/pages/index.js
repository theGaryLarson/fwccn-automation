import Image from 'next/image'
import { Inter } from 'next/font/google'
import ApplicantForm from "../../components/applicant_form/ApplicantForm";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
            <h1 className="font-bold">FWCCN Applicant Form</h1>
        </div>
        <div>
            <ApplicantForm></ApplicantForm>
        </div>
    </main>
  )
}
