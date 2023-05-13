import {Schema, model, models} from 'mongoose';
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const model = mongoose.model;
// const models = mongoose.models;
const applicantSchema = new Schema({
    timestamp: String,
    // 4 states PENDING, APPROVED, DENIED, OVERRIDE-APPROVED
    status: { type: String, default: 'PENDING' },
    referredBy: { type: String, default: '' },
    lastHelpDate: Date,
    helpRequested: {
        rent: Boolean,
        gasoline: Boolean,
        busTicket: Boolean,
        food: Boolean
    },
    licensePlate: String,
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
        expDate: Date,
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
    homeAddress: {
        homeStreet1: String,
        homeStreet2: String,
        homeCity: String,
        homeState: String,
        homeZip: Number
    },
    landLord: {
        fullName: String,
        landLordPhone: String,
        verified: Boolean,
        landLordAddress: {
            landLordStreet1: String,
            landLordStreet2: String,
            landLordCity: String,
            landLordZip: Number
        }
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
        nativeAmericanPacificIslander: Number
    },
    // two objects to store pdf documents
    // contentType refers to MIME type which is 'application/pdf'
    leaseDocument: {
        name: String,
        leaseSubmitDate: Date,
        data: Buffer, // Field to store lease document as binary data
        contentType: String, // MIME type of the document (e.g., 'application/pdf')
    },

    paystubDocument: {
        name: String,
        payStubSubmitDate: Date,
        data: Buffer, // Field to store paystub document as binary data
        contentType: String, // MIME type of the document (e.g., 'application/pdf')
    },
});

// this is required with next.js so, we don't get an error when next.js tries to create the model again and again
const Applicant = models.Applicant || model('Applicant', applicantSchema, process.env.MONGO_DB_COL);
export default Applicant;
// module.exports = { Applicant };