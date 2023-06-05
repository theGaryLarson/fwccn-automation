import {useEffect, useState} from "react";
import styles from "../components/applicant_form/ApplicantForm.module.css"


export default function SearchComponent(props) {
    const {setParentQueryObject, parentHandleSubmit } = props
    const[isAddress, setIsAddress] = useState(false);
    const [searchChoice, setSearchChoice] = useState("idSearch");
    const [stateId, setStateId] = useState("")
    const [street1, setStreet1] = useState("")
    const [street2, setStreet2] = useState("")
    const [homeZip, setHomeZip] = useState("")

    // useEffect(() => {}, [searchChoice]);


    const updateStateId = (event) => {
        setStateId(event.target.value)
    }
    const updateStreet1 = (event) => {
        setStreet1(event.target.value)
    }

    const updateStreet2 = (event) => {
        setStreet2(event.target.value)
    }

    const updateHomeZip = (event) => {
        setHomeZip(event.target.value)
    }
    const upDateSearchChoice = (event) => {
        setSearchChoice(event.target.value)
        setIsAddress(event.target.value === "addressSearch")
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        let queryParams
        if (isAddress) {
            setParentQueryObject( {
                homeStreet1: street1,
                homeStreet2: street2,
                homeZip: homeZip
            })

        } else {

            setParentQueryObject( {
                driverLicenseOrId: stateId
            })

        }
        // parentHandleSubmit(isAddress)
    }
    return (
        <div className={`${styles.componentWrapper} border-2 border-black p-4 box m-4`}>
            <form onSubmit={handleSubmit}>
                <div className={`${styles.componentWrapper}`}>
                    <label htmlFor="searchParameters">{'Choose:'}</label>
                    <select
                        className={'mb-4'}
                        id="searchParameters"
                        name="searchParameters"
                        onChange={upDateSearchChoice}
                    >
                        <option value={'idSearch'}>State ID</option>
                        <option value={'addressSearch'}>Street Address</option>
                    </select>
                </div>
                {/*TODO: render separate divs based on selection*/}
                {
                    !isAddress && (
                        <div className={`${styles.componentWrapper}`}>
                            <label htmlFor={'driverLicenseOrId'}> Search by State ID</label>
                            <input
                                type='text'
                                id={'driverLicenseOrId'}
                                name={'driverLicenseOrId'}
                                placeholder={'Enter State ID'}
                                onChange={updateStateId}
                                value={stateId}
                                required
                            />
                        </div>
                    )
                }
                {
                    isAddress && (
                        <div className={`${styles.componentWrapper}`}>
                            <h1>Enter Address</h1>

                            <input
                                type='text'
                                id={'street1'}
                                name={'street1'}
                                className={`mt-1`}
                                placeholder={' Enter Street Address'}
                                onChange={updateStreet1}
                                value={street1}
                                required
                            />
                            <input
                                type='text'
                                id={'street2'}
                                name={'street2'}
                                className={`mt-1`}
                                placeholder={' Enter Apartment # (optional)'}
                                onChange={updateStreet2}
                                value={street2}
                            />
                            <input
                                type='text'
                                id={'zip'}
                                name={'zip'}
                                className={`mt-1`}
                                placeholder={' Enter Zip Code (optional)'}
                                onChange={updateHomeZip}
                                value={homeZip}
                            />
                        </div>
                    )
                }
                <div>
                    <button className={styles.submitButton} type="submit" >Search</button>
                </div>

            </form>
        </div>
    )
}