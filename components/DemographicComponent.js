import styles from "./applicant_form/ApplicantForm.module.css";
import AgeComponent from "./AgeRangeComponent";

// applicant demographics information
export default function DemographicComponent({formData, onComponentInputChange }) {

    const handleInputChange = (event) => {
        onComponentInputChange(event)
    }
    return (
        <div>
            <h1>Demographic Information</h1>
            <div className={'flex h-10 justify-between mb-4'}>
                <div className='flex flex-col'><label htmlFor="totalMales">Total Males In Household:</label>
                    <input
                        type="number"
                        id="totalMales"
                        name="totalMales"
                        value={formData?.demographics?.totalMales ?? 0}
                        onChange={handleInputChange}
                        required
                    /></div>
                <div className='flex flex-col'><label htmlFor="totalFemales">Total Females In Household</label>
                    <input
                        type="number"
                        id="totalFemales"
                        name="totalFemales"
                        value={formData?.demographics?.totalFemales ?? 0}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>
            <div className='flex justify-between'>
                <div className='w-1/2 p-2'>
                    <h1 className={'font-bold mb-2'}>Male Age Ranges</h1>
                    <AgeComponent
                        formData={formData}
                        genderRange="maleAgeRange"
                        handleInputChange={handleInputChange}
                    />
                </div>
                <div className='w-1/2 p-2 flex flex-col'>
                    <h1 className={'font-bold mb-2'}>Female Age Ranges</h1>
                    <AgeComponent
                        formData={formData}
                        genderRange="femaleAgeRange"
                        handleInputChange={handleInputChange}
                    />
                </div>
            </div>

            <div className={styles.componentWrapper}>
                <label htmlFor="whiteOrCaucasian">White/Caucasian</label>
                <input
                    type="number"
                    id="whiteOrCaucasian"
                    name="whiteOrCaucasian"
                    value={formData?.demographics?.whiteOrCaucasian??0}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="blackAfricanAmerican">Black/African American</label>
                <input
                    type="number"
                    id="blackAfricanAmerican"
                    name="blackAfricanAmerican"
                    value={formData?.demographics?.blackAfricanAmerican??0}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="asianAsianAmerican">Asian/Asian American</label>
                <input
                    type="number"
                    id="asianAsianAmerican"
                    name="asianAsianAmerican"
                    value={formData?.demographics?.asianAsianAmerican??0}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="americanIndianOrAlaskaNative">American Indian/Alaska Native</label>
                <input
                    type="number"
                    id="americanIndianOrAlaskaNative"
                    name="americanIndianOrAlaskaNative"
                    value={formData?.demographics?.americanIndianOrAlaskaNative??0}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="nativeHawaiianPacificIslander">Native Hawaiian/Pacific Islander</label>
                <input
                    type="number"
                    id="nativeHawaiianPacificIslander"
                    name="nativeHawaiianPacificIslander"
                    value={formData?.demographics?.nativeHawaiianPacificIslander??0}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="latinoAmericanHispanic">Latinx/Hispanic</label>
                <input
                    type="number"
                    id="latinoAmericanHispanic"
                    name="latinoAmericanHispanic"
                    value={formData?.demographics?.latinoAmericanHispanic??0}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="americanIndianOrAlaskaNativeAndWhite">American Indian/Alaska Native & White</label>
                <input
                    type="number"
                    id="americanIndianOrAlaskaNativeAndWhite"
                    name="americanIndianOrAlaskaNativeAndWhite"
                    value={formData?.demographics?.americanIndianOrAlaskaNativeAndWhite??0}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="asianAsianAmericanAndWhite">Asian/Asian American & White</label>
                <input
                    type="number"
                    id="asianAsianAmericanAndWhite"
                    name="asianAsianAmericanAndWhite"
                    value={formData?.demographics?.asianAsianAmericanAndWhite??0}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="blackAfricanAmericanAndWhite">Black/African American & White</label>
                <input
                    type="number"
                    id="blackAfricanAmericanAndWhite"
                    name="blackAfricanAmericanAndWhite"
                    value={formData?.demographics?.blackAfricanAmericanAndWhite??0}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="americanIndianOrAlaskaNativeAndBlackAfricanAmerican">American Indian/Alaska Native & Black/African American</label>
                <input
                    type="number"
                    id="americanIndianOrAlaskaNativeAndBlackAfricanAmerican"
                    name="americanIndianOrAlaskaNativeAndBlackAfricanAmerican"
                    value={formData?.demographics?.americanIndianOrAlaskaNativeAndBlackAfricanAmerican??0}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="otherRace">Other Race</label>
                <input
                    type="number"
                    id="otherRace"
                    name="otherRace"
                    value={formData?.demographics?.otherRace??0}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="multiRacial">Multi-Racial</label>
                <input
                    type="number"
                    id="multiRacial"
                    name="multiRacial"
                    value={formData?.demographics?.multiRacial??0}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="unknown">Unknown</label>
                <input
                    type="number"
                    id="unknown"
                    name="unknown"
                    value={formData?.demographics?.unknown??0}
                    onChange={handleInputChange}
                    required
                />
            </div>
        </div>
    )
}
