import {
    Schema,
    model,
    models
} from 'mongoose';
//TODO: remove default values where required is true
const applicantSchema = new Schema({
    timestamp: {
        type: String,
        match: [/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, 'Format must be YYYY-MM-DD HH:MM:SS'],
        required: true
    },
    status: {
        type: String,
        enum: ['', 'PENDING', 'APPROVED', 'DENIED', 'APPROVED-OVERRIDE', 'NO-RETURN'],
        default: 'PENDING'
    },
    referredBy: {
        type: String,
        default: '',
    },
    actionTaken: {
        type: {
            secondInterviewer: {
                type: String,
                default: ''
            },
            actionNotes: {
                type: String,
                default: ''
            },
            amountPromised: {
                type: String,
                default: ''
            },
            amountGivenToday: {
                type: String,
                default: ''
            },
            checkDate: {
                type: String
            },
            checkMadeOutTo: {
                type: String,
                default: ''
            },
            checkNumber: {
                type: Number,
                default: 0
            },
            rentBalanceOwed: {
                type: Number,
                default: 0
            },
            gasVoucherAmount: {
                type: Number,
                default: ''
            },
            checkAddress: {
                type: {
                    checkStreet1: {
                        type: String,
                        default: ''
                    },
                    checkStreet2: {
                        type: String,
                        default: ''
                    },
                    checkCity: {
                        type: String,
                        default: ''
                    },
                    checkState: {
                        type: String,
                        default: ''
                    },
                    checkZip: {
                        type: String,
                        default: ''
                    }
                },
                default: {}
            },
            motelLocation: {
                type: String,
                default: ''
            },
            motelDurationDays: {
                type: String,
                default: ''
            },
            motelCost: {
                type: String,
                default: ''
            }
        },
        default: {}
    },
    interviewer: {
        type: String,
        default: '',
        required: true
    },
    helpRequested: {
        type: String,
        enum: ['', 'rent', 'gasoline', 'busTicket'],
        default: 'rent'
    },
    licensePlate: {
        type: String,
        default: ''
    },
    licensePlateState: {
        type: String,
        default: 'WA',
        match: [/[A-Z]{2}/, 'Must enter 2-letter abbreviation for the state']
    },
    isBusPrimaryTransport: {
        type: Boolean,
        default: false
    },
    reasonForNeed: {
        type: String,
        default: ''
    },
    futurePlans: {
        type: String,
        default: ''
    },
    fName: {
        type: String,
        minlength: [2, "Your first name must be at least 2 characters long."],
        required: true
    },
    middleInitial: {
        type: String,
        default: '',
    },
    lName: {
        type: String,
        default: '',
        required: true,
    },
    applicantGender: {
        type: String,
        default: 'female',
    },
    otherNames: {
        hasOtherNames: {
            type: Boolean,
            default: false
        },
        additionalNames: {
            type:[
                {
                    otherFirstName: {
                        type: String,
                        default: ''
                    },
                    otherMiddleInitial: {
                        type: String,
                        default: ''
                    },
                    otherLastName: {
                        type: String,
                        default: ''
                    }
                }
            ],
            default: []
        }

    },
    applicantAge: {
        type: Number,
        default: 0,
        min: [18, "You must be 18 years or older to apply"],
        validate: { // custom validator
            validator: function(value) {
                return !isNaN(value);
            },
            message: "Your age must be a number",
        } , // end validate
        required: true
    },
    phone: {
        type: String,
        default: '',
        match: [/^[0-9]{10}/, 'Enter 10 digit phone number exclude any additional characters']
    },
    disabled: {
        type: Boolean,
        default: false
    },
    idSource:{
        type: {
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
                match: [/[A-Z]{2}/, "Enter 2-letter state abbreviation"]
            },
            socialSecLastFour: {
                type: Number,
                validate: {
                    validator: function (v) {
                        return /[0-9]{4}/.test(v.toString());
                    },
                    message: 'Enter only the last 4 digits of applicant\'s social security number'
                },
                required: true
            },
            isValidLicense: {
                type: Boolean,
                default: false
            }
        },
        // default: {
        //     driverLicenseOrId: '',
        //     expDate: '',
        //     idStateIssued: '',
        //     socialSecLastFour: 0,
        //     isValidLicense: false
        // },
        required: true
    },
    homelessness: {
        isHomeless: {
            type: Boolean,
            default: false
        },
        durationXpHomelessness: {
            type: Number,
            default: 0,
            validate: {
                validator: function (v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number',
            },
        },
        placeStayedRecently: {
            type: String,
            default: '',
            required: function () {
                return this.parent().isHomeless === true;
            }
        },
        whyHomeless: {
            type: String,
        },
        tempAddress: {
            street1: {
                type: String,
            },
            street2: {
                type: String,
            },
            city: {
                type: String,
            },
            state: {
                type: String,
            },
            zip: {
                type: String,
                match: [/^\d{5}(?:-\d{4})?$/, 'Enter zip code in the following format ##### or #####-####'],
            },
        },
    },
    children: {
        hasChildrenUnder18: {
            type: Boolean,
            default: false
        },
        kids: {
            type: [
                {
                    gender: {
                        type: String,
                        required: function () {
                            return this.parent().hasChildrenUnder18 === true;
                        }
                    },
                    age: {
                        type: Number,
                        required: function () {
                            return this.parent().hasChildrenUnder18 === true;
                        }
                    },
                    school: {
                        type: String
                    },
                    schoolDistrict: {
                        type: String
                    },
                    relationshipToApplicant: {
                        type: String,
                        required: function () {
                            return this.parent().hasChildrenUnder18 === true;
                        }
                    }
                }
            ],
            default: function () {
                if (this.parent().hasChildrenUnder18 === true) {
                    return [];
                }
                return undefined;
            }
        },
        boysCount: {
            type: Number,
            validate: {
                validator: function (v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: "Must enter a non-negative number"
            },
            default: 0
        },
        boysAges: {
            type: [
                {
                    type: Number,
                    validate: {
                        validator: function (v) {
                            return /^\d*[0-9]\d*$/.test(v.toString());
                        },
                        message: "Must enter a non-negative number"
                    }
                }
            ],
            default: function () {
                if (this.parent().hasChildrenUnder18 === true) {
                    return [];
                }
                return undefined;
            }
        },
        girlsCount: {
            type: Number,
            validate: {
                validator: function (v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: "Must enter a non-negative number"
            },
            default: function () {
                if (this.parent().hasChildrenUnder18 === true) {
                    return [];
                }
                return undefined;
            }
        },
        girlsAges: {
            type: [
                {
                    type: Number,
                    validate: {
                        validator: function (v) {
                            return /^\d*[0-9]\d*$/.test(v.toString());
                        },
                        message: "Must enter a non-negative number"
                    }
                }
            ],
            default: function () {
                if (this.parent().hasChildrenUnder18 === true) {
                    return [];
                }
                return undefined;
            }
        },
        relationsToApplicant: {
            type: [
                {
                    type: String
                }
            ],
            default: function () {
                if (this.parent().hasChildrenUnder18 === true) {
                    return [];
                }
                return undefined;
            }
        },
        schoolDistrict: {
            type: [
                {
                    type: String
                }
            ],
            default: function () {
                if (this.parent().hasChildrenUnder18 === true) {
                    return [];
                }
                return undefined;
            }
        },
        schools: {
            type: [
                {
                    type: String
                }
            ],
            default: function () {
                if (this.parent().hasChildrenUnder18 === true) {
                    return [];
                }
                return undefined;
            }
        },
        schoolDistricts: {
            type: [
                {
                    type: String
                }
            ],
            default: function () {
                if (this.parent().hasChildrenUnder18 === true) {
                    return [];
                }
                return undefined;
            }
        }
    },
    otherAdults: {

        isOtherAdultsAtResidence: {
            type: Boolean,
            default: false
        },
        adults: {
            type: [
                {
                    adultFName: {
                        type: String,
                        required: function () {
                            return this.parent().isOtherAdultsAtResidence === true;
                        }
                    },
                    adultMiddleInitial: {
                        type: String
                    },
                    adultLName: {
                        type: String,
                        required: function () {
                            return this.parent().isOtherAdultsAtResidence === true;
                        }
                    },
                    adultGender: {
                        type: String,
                        required: function () {
                            return this.parent().isOtherAdultsAtResidence === true;
                        }
                    },
                    adultAge: { //todo: require min age of 18
                        type: Number,
                        validate: {
                            validator: function(v) {
                                return /^\d*[0-9]\d*$/.test(v.toString());
                            },
                            message: 'Must enter a non-negative number'
                        },
                        required: function () {
                            return this.parent().isOtherAdultsAtResidence === true;
                        }
                    },
                    relationshipToAdult: {
                        type: String,
                        default: 'undisclosed',
                        required: function () {
                            return this.parent().isOtherAdultsAtResidence === true;
                        }
                    },
                    relationDetails: {
                        type: String,
                        default: "",
                        required: function () { //todo : test inputs
                            return (this.parent().relationshipToAdult === "relative" || this.parent().relationshipToAdult === 'other')
                        }
                    }
                }
            ],
            default: [],
            required: function () {
                return this.parent().isOtherAdultsAtResidence === true;
            }
        }
    },
    homeAddress: {
        type: {
            homeStreet1: {
                type: String,
                required: function () {
                    return this.parent().helpRequested === 'rent';
                }
            },
            homeStreet2: {
                type: String
            },
            homeCity: {
                type: String,
                required: function () {
                    return this.parent().helpRequested === 'rent';
                }
            },
            homeState: {
                type: String,
                match: [/[A-Z]{2}/, 'Enter 2-letter abbreviation for state'],
                required: function () {
                    return this.parent().helpRequested === 'rent';
                }
            },
            homeZip: {
                type: Number,
                default: undefined,
                validate: [
                    {
                        validator: function(v) {
                            if (v != null) return /^\d{5}(?:-\d{4})?$/.test(v.toString());
                        },
                        message: 'Enter zip code in the following format ##### or #####-####'
                    },
                ],
                required: function () {
                    return this.parent().helpRequested === 'rent';
                }
            },
            isMoreThanMonthBehind: {
                type: Boolean,
                default:false,
                required: function () {
                    return this.parent().helpRequested === 'rent';
                }
            },
            verified: {
                type: Boolean,
                default: false,
                required: function () {
                    return this.parent().helpRequested === 'rent';
                }
            }

        }
    },
    rentAssistance: {
        hasRentAssistance: {
            type: Boolean,
            default: false
        },
        monthlyRentPaidByApplicant: {
            type: Number,
            default: 0
        },
        hasSection8Assistance: {
            type: Boolean,
            default: false
        },
        monthlyRentPaidBySection8: {
            type: Number,
            default: 0
        },
        otherAssistance: {
            type: [
                {
                    rentAssistanceProgram: {
                        type: String,
                        required: function () {
                            return this.parent().hasRentAssistance === true && this.parent().hasSection8Assistance === false;
                        }
                    },
                    amountPaidByProgram: {
                        type: Number,
                        required: function () {
                            return this.parent().hasRentAssistance === true && this.parent().hasSection8Assistance === false;
                        }
                    }
                }
            ],
            default: []
        }
    },
    landLord: {
        fullName: {
            type: String,
            default: ''
        },
        landLordPhone: {
            type: String,
            default: '0000000000', // todo: make sure phone numbers are the same. String is preferred if doesn't break form
            match: [/^[0-9]{10}/, 'Enter 10 digit phone number. Exclue any additional characters'],
        },
        landLordAddress: {
            landLordStreet1: {
                type: String,
                default: ''
            },
            landLordStreet2: {
                type: String,
                default: '',
            },
            landLordState: {
                type: String,
                match: [/[A-Z]{2}/, 'Please enter 2-letter abbreviation for state'],
                default: ''
            },
            landLordCity: {
                type: String,
                default: '',
            },
            landLordZip: {
                type: Number,
                default: undefined,
                validate: [
                    {
                        validator: function (v) {
                            if ( v != null ) return /^\d{5}(?:-\d{4})?$/.test(v.toString());
                        },
                        message: 'Enter zip code in the following format ##### or #####-####'
                    }
                ]
            },
        },
    },
    houseHoldIncome: {
        totalHouseholdIncome: {
            type: Number,
            required: true,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        houseHoldIncomePastYear: {
            type: Number,
            required: true,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        totalSupportMembers: {
            type: Number,
            required: true,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        singleHeadOfHouseHold: {
            type: String,
            default: "No"
        },
        incomeSituation: {
            type: String,
            default: ""
        },
        incomeSources: {
            type: [
                {
                    name: {
                        type: String,
                        required: true
                    },
                    peopleCount: {
                        type: Number,
                        required: true
                    }
                }
            ],
            required: true
        },
        isIncomeVerified: {
            type: Boolean,
            default: false
        }
    },
    race: {
        americanIndianOrAlaskaNative: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        whiteOrCaucasian: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        asianAsianAmerican: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        otherRace: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        blackAfricanAmerican: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        multiRacial: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        latinoAmericanHispanic: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        unknown: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        nativeAmericanPacificIslander: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
    }
});

const Applicant = models.Applicant || model('Applicant', applicantSchema, process.env.MONGO_DB_COL);
export default Applicant;
