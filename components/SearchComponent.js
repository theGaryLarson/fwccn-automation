import {useEffect, useState} from "react";
import styles from "../components/applicant_form/ApplicantForm.module.css"


export default function SearchComponent(props) {
    const {setParentQueryObject} = props
    const [isViewAll, setIsViewAll] = useState(true);
    const [isAddress, setIsAddress] = useState(false);
    const [isIdSearch, setIsIdSearch] = useState(false);
    const [isNameSearch, setIsNameSearch] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [lastFour, setLastFour] = useState("");
    const [stateId, setStateId] = useState("");
    const [street1, setStreet1] = useState("");
    const [street2, setStreet2] = useState("");
    const [homeZip, setHomeZip] = useState("");

    useEffect(() => {

        }, [isNameSearch, isAddress, isIdSearch, isViewAll]
    );

    const updateFirstName = (event) => {
        setFirstName(event.target.value);
    }

    const updateLastName = (event) => {
        setLastName(event.target.value);
    }

    const updateLastFour = (event) => {
        setLastFour(event.target.value);
    }

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
        setIsNameSearch(event.target.value === "nameSearch");
        setIsIdSearch(event.target.value === "idSearch");
        setIsAddress(event.target.value === "addressSearch");
        setIsViewAll(event.target.value === "viewAll");

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (isViewAll) {
            setParentQueryObject( {
                retrieveAll: "yes"
            });
        }
        if (isNameSearch) {
            setParentQueryObject( {
                firstName: firstName,
                lastName: lastName,
                lastFour: lastFour
            });
        }
        if (isIdSearch) {
            setParentQueryObject( {
                driverLicenseOrId: stateId
            });
        }
        if (isAddress) {
            setParentQueryObject( {
                homeStreet1: street1,
                homeStreet2: street2,
                homeZip: homeZip
            });
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
                        <option value={'viewAll'}>Review All Applications</option>
                        <option value={'nameSearch'}>Name & Last Four</option>
                        <option value={'idSearch'}>State ID</option>
                        <option value={'addressSearch'}>Street Address</option>
                    </select>
                </div>
                {
                    isNameSearch && (
                        <div className={`${styles.componentWrapper}`}>
                            <h1>Enter Name & Last Four</h1>

                            <input
                                type='text'
                                id={'first-name'}
                                name={'first-name'}
                                className={`mt-1`}
                                placeholder={' Enter First Name'}
                                onChange={updateFirstName}
                                value={firstName}
                            />
                            <input
                                type='text'
                                id={'last-name'}
                                name={'last-name'}
                                className={`mt-1`}
                                placeholder={' Enter Last Name'}
                                onChange={updateLastName}
                                value={lastName}
                            />
                            <input
                                type='text'
                                id={'last-four'}
                                name={'last-four'}
                                className={`mt-1`}
                                placeholder={' Last Four of Social Security'}
                                onChange={updateLastFour}
                                value={lastFour}
                            />
                        </div>
                    )
                }
                {
                    isIdSearch && (
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