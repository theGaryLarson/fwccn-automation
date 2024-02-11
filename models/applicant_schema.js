import {model, models, Schema} from 'mongoose';

const applicantSchema = new Schema({
    timestamp: {
        type: String,
        match: [/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, 'Format must be YYYY-MM-DD HH:MM:SS'],
        required: true
    },
    dateOfService: {
        type: String,
         // match: [/^\d{4}-\d{2}-\d{2}$/, 'Format must be YYYY-MM-DD'],
        required: false
    },
    serviceDate: {
        type: Date,
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
            fundSource: {
              type: String,
              default: ''
            },
            actionNotes: {
                type: String,
                default: ''
            },
            promiseFilled: {
                type: Date,
                default: undefined
            },
            amountPromised: {
                type: Number,
                default: ''
            },
            amountGivenToday: {
                type: Number,
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
            checkAmount: {
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
        required: false
    },
    helpRequested: {
        type: String,
        enum: ['', 'rent', 'gasoline', 'busTicket', 'motel'],
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
        validate: { // custom validator
            validator: function(v) {
                return !isNaN(v);
            },
            message: "Your age must be a number",
        } , // end validate
        required: false,
        default: ''
    },
    phone: {
        type: String,
        default: '',
        match: [/^[0-9]{10}/, 'Enter 10 digit phone number exclude any additional characters']
    },
    email: {
        type: String,
        default: '',
        match: [/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Enter a valid email address']
    },
    disabled: {
        type: Boolean,
        default: false
    },
    idSource:{
        type: {
            driverLicenseOrId: {
                type: String,
                required: false
            },
            expDate: {
                type: Date,
                required: false
            },
            idStateIssued: {
                type: String,
                match: [/^([A-Z]{2}|)$/, "Enter 2-letter state abbreviation"]
            },
            socialSecLastFour: {
                type: String,
                default: '',
                required: false
            },
            isValidLicense: {
                type: Boolean,
                default: false
            }
        },
        required: false
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
                        type: String
                    },
                    age: {
                        type: Number
                    },
                    school: {
                        type: String
                    },
                    schoolDistrict: {
                        type: String
                    },
                    relationshipToApplicant: {
                        type: String
                    },
                    relationDetails: {
                        type: String
                    }
                }
            ]
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
                    adultAge: {
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
                        required: function () {
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
            aptName: {
                type: String,
                required: false,
                default: ''
            },
            homeStreet1: {
                type: String,
                required: false,
                default: ''
            },
            homeStreet2: {
                type: String,
                default: ''
            },
            homeCity: {
                type: String,
                required: false,
                default: ''
            },
            homeState: {
                type: String,
                match: [/[A-Z]{2}/, 'Enter 2-letter abbreviation for state'],
                required: false,
                default: 'WA'
            },
            homeZip: {
                type: Number,
                default: 0,
                validate: [
                    {
                        validator: function(v) {
                            if (v != null) return /^\d{5}(?:-\d{4})?$/.test(v.toString());
                        },
                        message: 'Enter zip code in the following format ##### or #####-####'
                    },
                ],
                required: false,
            },
            isMoreThanMonthBehind: {
                type: Boolean,
                default:false,
                required: false
            },
            verified: {
                type: Boolean,
                default: false,
                required: false
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
            default: '0000000000',
            match: [/^[0-9]{10}/, 'Enter 10 digit phone number. Exclude any additional characters'],
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
                type: String,
                default: '',
                validate: [
                    {
                        validator: function (v) {
                            return v === "" || /^\d{5}(?:-\d{4})?$/.test(v.toString());
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
            required: false,
            validate: {
                validator: function(v) {
                    if(v) {
                        return /^\d+(\.\d{2})?$/.test(v.toString());
                    }
                    return true;
                },
                message: 'Must enter a non-negative number'
            },
            default: 0
        },
        houseHoldIncomePastYear: {
            type: Number,
            required: false,
            validate: {
                validator: function(v) {
                    if(v) {
                        return /^\d+(\.\d{2})?$/.test(v.toString());
                    }
                    return true;
                },
                message: 'Must enter a non-negative number'
            },
            default: 0
        },
        totalSupportMembers: {
            type: Number,
            required: false,
            validate: {
                validator: function(v) {
                    if(v) {
                        return /^\d*[0-9]\d*$/.test(v.toString());
                    }
                    return true;
                },
                message: 'Must enter a non-negative number'
            },
            default: 0
        },
        singleHeadOfHouseHold: {
            type: String,
            default: "NO-DATA"
        },
        incomeLevel: {
            type: String,
            required: false,
            default: ""
        },
        percentOfAnnualAmi: {
            type: String,
            required: false,
            default: ""
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
                        required: false
                    },
                    peopleCount: {
                        type: Number,
                        required: false
                    }
                }
            ],
            required: false
        },
        isIncomeVerified: {
            type: Boolean,
            default: false
        }
    },
    demographics: {
        totalMales: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        totalFemales: {
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
        nativeHawaiianPacificIslander: {
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
        americanIndianOrAlaskaNativeAndWhite: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        asianAsianAmericanAndWhite: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        blackAfricanAmericanAndWhite: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        americanIndianOrAlaskaNativeAndBlackAfricanAmerican: {
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

    },
    maleAgeRange: {
        zeroToFive: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        sixToTwelve: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        thirteenToSeventeen: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        eighteenToTwentyFour: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        twentyFiveToThirtyFour: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        thirtyFiveToFiftyFour: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        fiftyFiveToSeventyFour: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        seventyFiveToEightyFour: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        eightyFivePlus: {
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
        }
    },
    femaleAgeRange: {
        zeroToFive: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        sixToTwelve: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        thirteenToSeventeen: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        eighteenToTwentyFour: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        twentyFiveToThirtyFour: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        thirtyFiveToFiftyFour: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        fiftyFiveToSeventyFour: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        seventyFiveToEightyFour: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        },
        eightyFivePlus: {
            type: Number,
            default: 0,
            validate: {
                validator: function(v) {
                    return /^\d*[0-9]\d*$/.test(v.toString());
                },
                message: 'Must enter a non-negative number'
            }
        }
    }
});

applicantSchema.pre('save', function(next) {
    if (this.dateOfService && this.dateOfService.trim()) {
        // Parse dateOfService as a local date (without time component)
        const dateComponents = this.dateOfService.split('T')[0].split('-').map(Number);
        this.serviceDate = new Date(dateComponents[0], dateComponents[1] - 1, dateComponents[2]);
    } else if (this.timestamp && this.timestamp.trim()
        // Doing this because there is a lot of dates not entered but still need to filter them in mongodb charts for reporting
        // which requires no dates to be null. I used 10-12-1492 as a filler date.
        // This ensures that serviceDate does not get populated with this date.
        // Currently the displayed date if set to this filler date in UI displays [ NO-DATA ]
        && new Date(this.timestamp).getTime() > new Date("2018-01-01").getTime()) {
        // Parse timestamp as a local date (without time component)
        const dateComponents = this.timestamp.split(' ')[0].split('-').map(Number);
        this.serviceDate = new Date(dateComponents[0], dateComponents[1] - 1, dateComponents[2]);
    } else {
        this.serviceDate = undefined;
    }
    if (this.actionTaken.promiseFilled && this.actionTaken.promiseFilled.trim()) {
        this.actionTaken.promiseFilled = this.actionTaken.promiseFilled.replace('T00', 'T08');
    }
    next();
});

applicantSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();

    if (update.dateOfService && update.dateOfService.trim()
        && new Date(update.dateOfService).getTime() > new Date("2018-01-01").getTime()) {
        // Parse dateOfService as a local date (without time component)
        const dateComponents = update.dateOfService.split('T')[0].split('-').map(Number);
        update.serviceDate = new Date(dateComponents[0], dateComponents[1] - 1, dateComponents[2]);
    } else if (update.timestamp && update.timestamp.trim()
        // Doing this because there is a lot of dates not entered but still need to filter them in mongodb charts for reporting
        // which requires no dates to be null. I used 10-12-1492 as a filler date.
        // This ensures that serviceDate does not get populated with this date.
        // Currently, the Date of Service date if set to this filler date in UI displays [ NO-DATA ]
        && new Date(update.timestamp).getTime() > new Date("2018-01-01").getTime()) {
        // Parse timestamp as a local date (without time component)
        const dateComponents = update.timestamp.split(' ')[0].split('-').map(Number);
        update.serviceDate = new Date(dateComponents[0], dateComponents[1] - 1, dateComponents[2]);
    } else {
        // do nothing update.serviceDate = undefined;
    }
    if (update.actionTaken.promiseFilled && update.actionTaken.promiseFilled.trim()) {
        update.actionTaken.promiseFilled = update.actionTaken.promiseFilled.replace('T00', 'T08');
    }
    next();
});


const Applicant = models.Applicant || model('Applicant', applicantSchema, process.env.MONGO_DB_COL);
export default Applicant;
