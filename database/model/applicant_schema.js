const mongoose = require('mongoose');
const clientPromise = require('../../lib/mongodb').default;

const formDataSchema = new mongoose.Schema({
    timestamp: String,
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
        americanIndianOrAlaskaNative: Boolean,
        whiteOrCaucasian: Boolean,
        asianAsianAmerican: Boolean,
        otherRace: Boolean,
        blackAfricanAmerican: Boolean,
        multiRacial: Boolean,
        latinoAmericanHispanic: Boolean,
        unknown: Boolean,
        nativeAmericanPacificIslander: Boolean
    },
    referredBy: String
});

async function main() {
    try {
        // Create a new Mongoose instance using your existing clientPromise object
        const db = await mongoose.connect(await clientPromise, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Use the "fromClient" method to create a Mongoose model for your collection
        const FormDataModel = db.model('FormData', formDataSchema);

        // Use the Mongoose model to interact with your collection
        const documents = await FormDataModel.find();
        console.log(documents);
    } catch (error) {
        console.error(error);
    }
}

main();
