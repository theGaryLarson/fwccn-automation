import { Schema, model, models } from 'mongoose';

const applicantSchema = new Schema({
    timestamp: String,
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'DENIED', 'OVERRIDE-APPROVAL'],
        default: 'PENDING',
    },
    referredBy: {
        type: String,
        default: '',
    },
    lastHelpDate: Date,
    helpRequested: {
        rent: Boolean,
        gasoline: Boolean,
        busTicket: Boolean,
        food: Boolean,
        validate: {
            validator: function (value) {
                return value.rent || value.gasoline || value.busTicket || value.food;}
        },
        message: "Must select one help request option"
    }
    },
    licensePlate: String,
    reasonForNeed: {String, required: true},
    futurePlans: {String, required: true},
    fName: {
        type: String,
        minlength: [2, "Your first name must be at least 2 characters long."],
        required: true,
    },
    middleInitial: String,
    lName: {
        type: String,
        required: true,
    },
    otherLastNames: [String],
    gender: {
        type: String
    },
    age: {
        type: Number,
        min: [18, "You must be 18 years or older to apply"],
        validate: {
            validator: function (value) {
                return !isNaN(value);
            },
            message: "Your age must be a number",
        },
    },
    phone: String,
    income: {
        currentMonthlyIncome: { type: Number, required: true },
        monthlyIncomeLast12Months: { type: Number, required: true },
        totalHouseholdMembersIncomeSupports: { type: Number, required: true },
    },
    disabled: { type: Boolean, required: true },
    idSource: {
        driverLicenseOrId: { type: String, required: true },
        expDate: { type: Date, required: true },
        socialSecLastFour: { type: Number, required: true },
    },
    homelessness: {
        homeless: { type: Boolean, default: false, required: true },
        durationXpHomelessness: {
            Number,
            required: function () {return this.homeless;},
        whyHomeless: {
                String, required: function () { return this.homeless;
        tempAddress: {
            street1: {String, required: function () { return this.homeless;},
            street2: String,
            city: {String, required: function () { return this.homeless;},
            state: {String, required: function () { return this.homeless;},
            zip: {String, required: function () { return this.homeless;},
        },
    },
    children: {
        hasChildrenUnder18: Boolean,
        boysCount: Number,
        boysAges: [Number],
        girlsCount: Number,
        girlsAges: [Number],
        nonBinaryCount: Number,
        nonBinaryAges: [Number],
        relationshipToChildren: String,
        schoolDistrict: String,
        schools: [String],
    },
    otherAdults: [
        {
            adultFName: String,
            adultMiddleInitial: String,
            adultLName: String,
            adultGender: String,
            adultAge: Number,
            relationshipToAdult: String,
        },
    ],
    homeAddress: {
        homeStreet1: String,
        homeStreet2: String,
        homeCity: String,
        homeState: String,
        homeZip: Number,
    },
    landLord: {
        fullName: String,
        landLordPhone: String,
        verified: Boolean,
        landLordAddress: {
            landLordStreet1: String,
            landLordStreet2: String,
            landLordCity: String,
            landLordZip: Number,
        },
    },
    houseHoldIncome: {
        totalHouseholdIncome: Number,
        totalSupportMembers: Number,
        singleMaleHeadOfHousehold: Boolean,
        singleFemaleHeadOfHousehold: Boolean,
    },
    race: {
        americanIndianOrAlaskaNative: Number,
        whiteOrCaucasian: Number,
        asianAsianAmerican: Number,
        otherRace: Number,
        blackAfricanAmerican: Number,
        multiRacial: Number,
        latinoAmericanHispanic: Number,
        unknown: Number,
        nativeAmericanPacificIslander: Number,
    },
});

const Applicant = models.Applicant || model('Applicant', applicantSchema, process.env.MONGO_DB_COL);
export default Applicant;
