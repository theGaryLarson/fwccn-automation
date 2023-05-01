import {Schema, model, models} from 'mongoose';
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const model = mongoose.model;
// const models = mongoose.models;
const applicantSchema = new Schema({
    timestamp: String,
    // 3 states PENDING, APPROVED, DENIED
    status: { type: String, default: 'PENDING' },
    referredBy: { type: String, default: '' },
    lastHelpDate: Date,
    helpRequested: {
        rent: Boolean,
        gasoline: Boolean,
        licensePlate: String,
        busTicket: Boolean,
        food: Boolean
    },
    reasonForNeed: String,
    futurePlans: String,
    fName: String,
    middleInitial: String,
    lName: String,
    otherLastNames: [String],
    gender: String,
    age: Number,
    phone: String,
    income: {
        currentMonthlyIncome: Number,
        monthlyIncomeLast12Months: Number,
        totalHouseholdMembersIncomeSupports: Number,
    },
    disabled: Boolean,
    idSource: {
        driverLicenseOrId: String,
        expDate: String,
        socialSecLastFour: Number
    },
    homelessness: {
        homeless: { type: Boolean, default: false },
        durationXpHomelessness: Number,
        whyHomeless: String,
        tempAddress: {
            street1: String,
            street2: String,
            city: String,
            state: String,
            zip: String
        }
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
        schools: [String]
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
    address: {
        street1: String,
        street2: String,
        city: String,
        state: String,
        zip: String
    },
    landLord: {
        name: String,
        landLordPhone: String,
        verified: Boolean,
        landLordAddress: {
            street1: String,
            street2: String,
            city: String,
            zip: String
        }
    },
    HouseHoldIncome: {
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
        nativeAmericanPacificIslander: Number
    },
});

// this is required with next.js so, we don't get an error when next.js tries to create the model again and again
const Applicant = models.Applicant || model('Applicant', applicantSchema, process.env.MONGO_DB_COL);
export default Applicant;
// module.exports = { Applicant };