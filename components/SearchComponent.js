import {useEffect, useState} from "react";
import styles from "../components/applicant_form/ApplicantForm.module.css"


export default function SearchComponent({ setParentQueryObject, parentHandleSubmit}) {
    const[isAddress, setIsAddress] = useState(false);
    const [queryText, setQueryText] = useState("");
    const [queryObject, setQueryObject] = useState({});
    const [searchChoice, setSearchChoice] = useState("idSearch");

    useEffect(() => {}, [queryObject, searchChoice]);

    const updateQueryText = (event) => {
        const { value } = event.target;
        setQueryText(value) // TODO: refactor and remove once requirements is working
    }
    const upDateSearchChoice = (event) => {
        setSearchChoice(event.target.value)
        setIsAddress(event.target.value === "addressSearch")
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (isAddress) {
            // TODO: convert to POST so can avoid using encodeURIComponent
            const queryParams =
                encodeURIComponent('homeStreet1') + "=" +  encodeURIComponent(queryText)
            setParentQueryObject( {
                homeStreet1: queryText
            })
            parentHandleSubmit(isAddress, queryParams)
        } else {
            const queryParams =
                encodeURIComponent('driverLicenseOrId') + "=" +  encodeURIComponent(queryText)
            setParentQueryObject( {
                driverLicenseOrId: queryText
            })
            parentHandleSubmit(isAddress, queryParams)
        }
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
                <div className={`${styles.componentWrapper}`}>
                    <label htmlFor={isAddress ? 'homeStreet1' : 'driverLicenseOrId'}> Search by {isAddress ? "Address" : "State ID"}</label>
                    <input
                        type='text'
                        id={isAddress ? 'homeStreet1' : 'driverLicenseOrId'}
                        name={isAddress ? 'homeStreet1' : 'driverLicenseOrId'}
                        placeholder={isAddress ? ' Enter Street Address' :' Enter State ID' }
                        onChange={updateQueryText}
                        value={queryText}
                        required
                    />
                </div>
                <div >
                    <button className={styles.submitButton} type="submit" >Search</button>
                </div>

            </form>
        </div>
    )
}