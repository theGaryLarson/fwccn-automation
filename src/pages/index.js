import ApplicantForm from "../../components/applicant_form/ApplicantForm";
import EditReviewComponent from "../../components/EditReviewComponent";
import {useState} from "react";
// import getConfig from "next/config"

export default function Home() {
    const [isLookUp, setIsLookUp]  = useState(false)

    function handleOnClick(event) {
        const {name} = event.target
        if (name === 'new-form') {
            setIsLookUp(true);
        } else {
            setIsLookUp(false);
        }
    }
    return (
    <main className="flex justify-center w-full pt-8">


        <div className={'mb-16 w-[650px] h-full bg-white flex flex-col items-stretch'}>
            <h1 className="font-bold text-center">FWCCN Applicant Form</h1>
            <div className=' flex-1 w-full'>
                <nav className="flex justify-end gap-x-1 mt-4 ">
                    <button
                        id={'look-up'}
                        name={'look-up'}
                        type={'button'}
                        className={`'text-black px-4 border-2 rounded hover:bg-gray-300 hover:text-black' ${!isLookUp ? 'border-gray-700 bg-black text-white hover:border-black hover:text-black': 'border-gray-300'}`}
                        onClick={handleOnClick}
                    >
                        Look Up
                    </button>
                    <button
                        id={'new-form'}
                        name={'new-form'}
                        type={'button'}
                        className={`'text-black px-4 rounded hover:bg-gray-300 border-2 hover:border-black' ${isLookUp ? 'border-gray-700 bg-black text-white hover:text-black': 'border-gray-300'}`}
                        onClick={handleOnClick}
                    >
                        New Applicant
                    </button>
                    <button
                        id={'report-chart'}
                        name={'report-chart'}
                        type="button"
                        className={'text-black px-4 rounded hover:bg-gray-300 border-2 hover:border-black'}
                        onClick={() => window.open("https://charts.mongodb.com/charts-project-0-dksjn/public/dashboards/65075121-56a9-4840-8318-58afe3a7b94f", "_blank", "noopener,noreferrer")}
                    >
                        Open Charts
                    </button>

                </nav>
            </div>
            { !isLookUp && (
                <div className={"w-full"}>
                    <EditReviewComponent />
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
