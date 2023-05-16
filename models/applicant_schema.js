import {
    Schema,
    model,
    models
} from 'mongoose';
import {ZCOOL_KuaiLe} from "next/dist/compiled/@next/font/dist/google";

const applicantSchema = new Schema({
    timestamp: {
        type: String
    },
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'DENIED', 'APPROVED-OVERRIDE'],
        default: 'PENDING',
    },
    interviewer: {
        type: String,
        required: true
    },
    referredBy: {
        type: String,
        default: '',
    },
    helpRequested: {
        type: String,
        enum: ['rent', 'gasoline', 'busTicket', 'food'],
        default: '',
    },
    licensePlate: {
        type: String
    },
    licensePlateState: {
        type: String
    },
    reasonForNeed: {
        type: String,
        required: true
    },
    futurePlans: {
        type: String,
        required: true
    },
    fName: {
        type: String,
        minlength: [2, "Your first name must be at least 2 characters long."],
        required: true,
    },
    middleInitial: {
        type: String
    },
    lName: {
        type: String,
        required: true,
    },
    applicantGender: {
        type: String,
        required: true
    },
    otherNames: {
        hasOtherNames: Boolean,
        additionalNames:[{
            otherFirstName: {
                type: String
            },
            otherMiddleInitial: {
                type: String
            },
            otherLastName: {
                type: String
            }
        }],
    },
    gender: {
        type: String
    },
    age: {
        type: Number,
        min: [18, "You must be 18 years or older to apply"],
        validate: { // custom validator
            validator: function(value) {
                return !isNaN(value);
            },
            message: "Your age must be a number",
        } // end validate
    },
    phone: {
        type: Number
    },
    income: {
        currentMonthlyIncome: {
            type: Number,
            required: true
        },
        monthlyIncomeLast12Months: {
            type: Number,
            required: true
        },
        totalHouseholdMembersIncomeSupports: {
            type: Number,
            required: true
        },
    },
    disabled: {
        type: Boolean,
        required: true
    },
    idSource: {
        driverLicenseOrId: {
            type: String,
            required: true
        },
        expDate: {
            type: Date,
            required: true
        },
        idStateIssued: {
            type: String,
            minlength: [2, 'Enter 2 letter state abbreviation']
        },
        socialSecLastFour: {
            type: Number,
            required: true
        },
    },
    homelessness: {
        isHomeless: {
            type: Boolean,
            default: false,
            required: true
        },
        durationXpHomelessness: {
            type: Number,
        },
        whyHomeless: {
            type: String,
        },
        tempAddress: {
            street1: {
                type: String,
            },
            street2: {
                type: String
            },
            city: {
                type: String,
            },
            state: {
                type: String,
            },
            zip: {
                type: String,
            },
        },
        children: {
            hasChildrenUnder18: {
                type: Boolean
            },
            boysCount: {
                type: Number
            },
             boysAges: [{
                type: Number
             }],
             girlsCount: {
                type: Number
             },
             girlsAges: [{
                type: Number
             }],
             relationshipToChildren: {
                type: String
             },
             schoolDistrict: {
                type: String
             },
             schools: [{
                type: String
             }],
        },
        otherAdults: [{
            adultFName: {
                type: String
            },
            adultMiddleInitial: {
                type: String
            },
            adultLName: {
                type: String
            },
            adultGender: {
                type: String
            },
            adultAge: {
                type: Number
            },
            relationshipToAdult: {
                type: String
            },
        }],
        homeAddress: {
            homeStreet1: {
                type: String
            },
            homeStreet2: {
                type: String
            },
            homeCity: {
                type: String
            },
            homeState: {
                type: String
            },
            homeZip: {
                type: Number
            },
        },
        landLord: {
            fullName: {
                type: String
            },
            landLordPhone: {
                type: String
            },
            verified: {
                type: Boolean
            },
            landLordAddress: {
                landLordStreet1: {
                    type: String
                },
                landLordStreet2: {
                    type: String
                },
                landLordCity: {
                    type: String
                },
                landLordZip: {
                    type: Number
                },
            },
        },
        houseHoldIncome: {
            totalHouseholdIncome: {
                type: Number
            },
            totalSupportMembers: {
                type: Number
            },
            singleMaleHeadOfHousehold: {
                type: Boolean
            },
            singleFemaleHeadOfHousehold: {
                type: Boolean
            },
        },
        race: {
            americanIndianOrAlaskaNative: {
                type: Number
            },
            whiteOrCaucasian: {
                type: Number
            },
            asianAsianAmerican: {
                type: Number
            },
            otherRace: {
                type: Number
            },
            blackAfricanAmerican: {
                type: Number
            },
            multiRacial: {
                type: Number
            },
            latinoAmericanHispanic: {
                type: Number
            },
            unknown: {
                type: Number
            },
            nativeAmericanPacificIslander: {
                type: Number
            },
        },
    },
});

// function





const Applicant = models.Applicant || model('Applicant', applicantSchema, process.env.MONGO_DB_COL);
export default Applicant;

console.log('Applicant model loaded')
console.log(Applicant.schema.get('homeless'));
