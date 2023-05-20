import {
    Schema,
    model,
    models
} from 'mongoose';
//TODO: remove default values where required is true
const applicantSchema = new Schema({
    timestamp: {
        type: String,
        default: '', //FIXME: DO NOT ALLOW THIS TO BE EMPTY EVER IN PRODUCTION
        match: [/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, 'Format must be YYYY-MM-DD HH:MM:SS'],
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'DENIED', 'APPROVED-OVERRIDE'],
        default: 'PENDING',
        required: true
    },
    interviewer: {
        type: String,
        default: '',
        required: true
    },
    referredBy: {
        type: String,
        default: '',
    },
    helpRequested: {
        type: String,
        enum: ['rent', 'gasoline', 'busTicket'],
        default: 'rent',
        required: true
    },
    licensePlate: {
        type: String,
        default: ''
    },
    licensePlateState: {
        type: String,
        default: '',
        match: [/[A-Z]{2}/, 'Must enter 2-letter abbreviation for the state']
    },
    reasonForNeed: {
        type: String,
        default: '',
        required: true
    },
    futurePlans: {
        type: String,
        default: '',
        required: true
    },
    fName: {
        type: String,
        default: '',
        minlength: [2, "Your first name must be at least 2 characters long."],
        required: true,
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
        default: '',
        required: true
    },
    otherNames: {
        hasOtherNames: {
            type: Boolean,
            default: false,
            required: true
        },
        additionalNames: {
            type:[{
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
            }]
        },
        default: []
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
        type: String, //todo: look at this if continue getting errors might need to be a string
        default: '0000000000',
        match: [/^[0-9]{10}/, 'Enter 10 digit phone number exclude any additional characters']
    },
    income: {
        type: {
            currentMonthlyIncome: {
                type: Number,
                default: 0,
                validate: {
                    validator: function (v) {
                        return /^\d*[1-9]\d*$/.test(v.toString());
                    },
                    message: 'Must be a non-negative integer'
                },
                required: true
            },
            monthlyIncomeLast12Months: {
                type: Number,
                default: 0,
                validate: {
                    validator: function (v) {
                        return /^\d*[1-9]\d*$/.test(v.toString());
                    },
                    message: 'Must be a non-negative integer'
                },
                required: true
            },
            totalHouseholdMembersIncomeSupports: {
                type: Number,
                default: 0,
                validate: {
                    validator: function (v) {
                        return /^\d*[1-9]\d*$/.test(v.toString());
                    },
                    message: 'Must be a non-negative integer'
                },
                required: true
            },
        },
        default: {},
        required: true
    },
    disabled: {
        type: Boolean,
        default: false,
        required: true
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
        },
        default: {
            driverLicenseOrId: '',
            expDate: '',
            idStateIssued: '',
            socialSecLastFour: 0
        },
        required: true
    },
    homelessness: {
        isHomeless: {
            type: Boolean,
            default: false,
            required: true,
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
            default: false,
            required: true
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
        relationToApplicant: {
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
        type: [{
            isOtherAdultsAtResidence: {
                type: Boolean,
                default: false,
                required: true
            },
            adults: {
                type: [
                    {
                        adultFName: {
                            type: String,
                            required: function () {
                                return this.isOtherAdultsAtResidence === true;
                            }
                        },
                        adultMiddleInitial: {
                            type: String
                        },
                        adultLName: {
                            type: String,
                            required: function () {
                                return this.isOtherAdultsAtResidence === true;
                            }
                        },
                        adultGender: {
                            type: String,
                            required: function () {
                                return this.isOtherAdultsAtResidence === true;
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
                                return this.isOtherAdultsAtResidence === true;
                            }
                        },
                        relationshipToAdult: {
                            type: String,
                            required: function () {
                                return this.isOtherAdultsAtResidence === true;
                            }
                        }
                    }
                ],
                default: [],
                required: function () {
                    return this.isOtherAdultsAtResidence === true;
                }
            }
        }]
    },
    homeAddress: {
        type: {
                homeStreet1: {
                    type: String,
                        required: true
                },
                homeStreet2: {
                    type: String
                },
                homeCity: {
                    type: String,
                        required: true
                },
                homeState: {
                    type: String,
                        match: [/[A-Z]{2}/, 'Enter 2-letter abbreviation for state'],
                        required: true
                },
                homeZip: {
                    type: Number,
                    validate: {
                        validator: function(v) {
                            return /^\d{5}(?:-\d{4})?$/.test(v.toString());
                        },
                        message: 'Enter zip code in the following format ##### or #####-####'
                    }
                },
        }
    },
    landLord: {
        fullName: {
            type: String,
            default: ''
        },
        landLordPhone: {
            type: String,
            default: '0000000000', //todo: make sure phone numbers are the same. String is preferred if doesn't break form
                match: [/^[0-9]{10}/, 'Enter 10 digit phone number. Exclue any additional characters'],
        },
        verified: {
            type: Boolean,
            default: false,
            required: true
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
            },
            landLordCity: {
                type: String,
                default: '',
            },
            landLordZip: {
                type: Number,
                validate: {
                    validator: function(v) {
                        return /^\d{5}(?:-\d{4})?$/.test(v.toString());
                    },
                    message: 'Enter zip code in the following format ##### or #####-####'
                }
            },
        },
    },
    houseHoldIncome: {
        totalHouseholdIncome: {
            type: Number,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        totalSupportMembers: {
            type: Number,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        singleMaleHeadOfHousehold: {
            type: Boolean,
            default: false,
            required: true
        },
        singleFemaleHeadOfHousehold: {
            type: Boolean,
            default: false,
            required: true
        },
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
