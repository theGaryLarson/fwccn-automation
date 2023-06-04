import styles from "./applicant_form/ApplicantForm.module.css";

// applicant race information
export default function RaceComponent({formData, onComponentInputChange }) {

    const handleInputChange = (event) => {
        onComponentInputChange(event)
    }
    return (
        <div>
            <h1>Demographic Information</h1>
            <div className={styles.componentWrapper}>
                <label htmlFor="americanIndianOrAlaskaNative">American Indian or Alaska Native</label>
                <input
                    type="number"
                    id="americanIndianOrAlaskaNative"
                    name="americanIndianOrAlaskaNative"
                    value={formData?.race?.americanIndianOrAlaskaNative??0}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="whiteOrCaucasian">White or Caucasian</label>
                <input
                    type="number"
                    id="whiteOrCaucasian"
                    name="whiteOrCaucasian"
                    value={formData?.race?.whiteOrCaucasian??0}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="asianAsianAmerican">Asian or Asian American</label>
                <input
                    type="number"
                    id="asianAsianAmerican"
                    name="asianAsianAmerican"
                    value={formData?.race?.asianAsianAmerican??0}
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
                    value={formData?.race?.otherRace??0}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="blackAfricanAmerican">Black or African American</label>
                <input
                    type="number"
                    id="blackAfricanAmerican"
                    name="blackAfricanAmerican"
                    value={formData?.race?.blackAfricanAmerican??0}
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
                    value={formData?.race?.multiRacial??0}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="latinoAmericanHispanic">Latino or Hispanic</label>
                <input
                    type="number"
                    id="latinoAmericanHispanic"
                    name="latinoAmericanHispanic"
                    value={formData?.race?.latinoAmericanHispanic??0}
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
                    value={formData?.race?.unknown??0}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.componentWrapper}>
                <label htmlFor="nativeAmericanPacificIslander">Native Hawaiian or Pacific Islander</label>
                <input
                    type="number"
                    id="nativeAmericanPacificIslander"
                    name="nativeAmericanPacificIslander"
                    value={formData?.race?.nativeAmericanPacificIslander??0}
                    onChange={handleInputChange}
                    required
                />
            </div>
        </div>
    )
}
