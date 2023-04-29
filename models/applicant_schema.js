import {Schema, model, models} from 'mongoose';

const applicantSchema = new Schema({
    timestamp: String,
    // 3 states PENDING, APPROVED, DENIED
    status: { type: String, default: 'PENDING' },
    fName: String,
    middleInitial: String,
    lName: String,
    gender: String,
    age: Number,
    address: {
        street1: String,
        street2: String,
        city: String,
        state: String,
        zip: String
    },
    phone: String,
    otherLastNames: [String],
    idSource: {
        driverLicenseOrId: String,
        expDate: String,
        lastFourSSN: String
    },
    socialSecLastFour: String,
    situationReport: String,
    futurePlans: String,
    homeless: Boolean,
    disabled: Boolean,
    helpRequested: {
        rent: Boolean,
        gasoline: Boolean,
        licensePlate: String,
        busTicket: Boolean,
        food: Boolean
    },
    lastHelpDate: String,
    landLord: {
        name: String,
        phone: String,
        verified: Boolean,
        landLordAddress: {
            street1: String,
            street2: String,
            city: String,
            zip: String
        }
    },
    childrenUnder18: {
        hasChildrenUnder18: Boolean,
        boysCount: Number,
        boysAges: [Number],
        girlsCount: Number,
        girlsAges: [Number],
        relationshipToChildren: String,
        schoolDistrict: String,
        schools: [String]
    },
    otherAdults: [String],
    monthlyHouseholdIncome: Number,
    monthlyIncomeLast12Months: Number,
    numberOfHouseholdMembersSupported: Number,
    singleMaleHeadOfHousehold: Boolean,
    singleFemaleHeadOfHousehold: Boolean,
    race: {
        americanIndianOrAlaskaNative: Number,
        whiteOrCaucasian: Number,
        asianAsianAmerican: Number,
        otherRace: Number,
        blackAfricanAmerican: Number,
        multiRacial: Number,
        latinoAmericanHispanic: Number,
        unknown: Number,
        nativeAmericanPacificIslander: Number
    },
    referredBy: String
});

// this is required with next.js so, we don't get an error when next.js tries to create the model again and again
const Applicant = models.Applicant || model('Applicant', applicantSchema, process.env.MONGO_DB_COL);
export default Applicant;