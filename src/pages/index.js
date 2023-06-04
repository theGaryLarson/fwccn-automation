import ApplicantForm from "../../components/applicant_form/ApplicantForm";
import EditReviewComponent from "../../components/EditReviewComponent";
import {useState} from "react";
// import getConfig from "next/config"

export default function Home() {
    // const {serverRuntimeConfig} = getConfig()
    // console.log(serverRuntimeConfig.ipAddress)
    const [records, setRecords] = useState([]);
    const [isLookUp, setIsLookUp]  = useState(false)

    function handleOnClick(event) {
        const {name, value} = event.target
        if (name === 'new-form') {
            setIsLookUp(true)
        } else {
            setIsLookUp(false)
        }
    }
    return (
    <main className="flex flex-col min-w-max items-center pt-8">
        <h1 className="font-bold">FWCCN Applicant Form</h1>

        <div className={'mb-16'}>
            <div className='w-full'>
                <nav className="flex justify-end gap-x-1 mt-4 ">
                    <button
                        id={'look-up'}
                        name={'look-up'}
                        className={`'text-black px-4 border-2 rounded hover:bg-gray-300 hover:text-black' ${!isLookUp ? 'border-gray-700 bg-black text-white hover:border-black': 'border-gray-300'}`}
                        onClick={handleOnClick}
                    >
                        Look Up
                    </button>
                    <button
                        id={'new-form'}
                        name={'new-form'}
                        className={`'text-black px-4 rounded hover:bg-gray-300 border-2 hover:border-black' ${isLookUp ? 'border-gray-700 bg-black text-white hover:text-black': 'border-gray-300'}`}
                        onClick={handleOnClick}
                    >
                        New Applicant
                    </button>
                </nav>
            </div>
            { !isLookUp && (
                <div className={"w-full"}>
                    <EditReviewComponent records={records} setRecords={setRecords}/>
                </div>
            )}
            {isLookUp && (
                <div>
                    <ApplicantForm></ApplicantForm>
                </div>
            )}
        </div>
    </main>
  )
}
