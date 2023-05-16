import {
    Schema,
    model,
    models
} from 'mongoose';

const applicantSchema = new Schema({
    timestamp: {
        type: String,
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
        required: true
    },
    referredBy: {
        type: String,
        default: '',
    },
    helpRequested: {
        type: String,
        enum: ['rent', 'gasoline', 'busTicket'],
        required: true
    },
    licensePlate: {
        type: String
    },
    licensePlateState: {
        type: String,
        match: [/[A-Z]{2}/, 'Must enter 2-letter abbreviation for the state']
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
        hasOtherNames: {
            type: Boolean,
            required: true
        },
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
    applicantAge: {
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
        type: Number,
        match: [/^[0-9]{10}/, 'Enter 10 digit phone number exclude any additional characters']
    },
    income: {
        currentMonthlyIncome: {
            type: Number,
            match: [/^\d*[1-9]\d*$/, 'Must enter a positive number'],
            required: true
        },
        monthlyIncomeLast12Months: {
            type: Number,
            match: [/^\d*[1-9]\d*$/, 'Must enter a positive number'],
            required: true
        },
        totalHouseholdMembersIncomeSupports: {
            type: Number,
            match: [/^\d*[0-9]\d*$/, 'Must enter a non-negative number'],
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
            match: /[A-Z]{2}/
        },
        socialSecLastFour: {
            type: Number,
            match: [/[0-9]{4}/, 'Enter only the last 4 digits of applicant\'s social security number'],
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
            match: [/^\d*[0-9]\d*$/, 'Must enter a non-negative number']
        },
        whyHomeless: {
            type: String,
            required: true
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
                match: [/[A-Z]{2}/, 'Enter 2-letter abbrevation for state'],
            },
            zip: {
                type: String,
                match: [/^\d{5}(?:-\d{4})?$/, 'Enter zip code in the following format ##### or #####-####']
            },
        },
        children: {
            hasChildrenUnder18: {
                type: Boolean,
                required: true
            },
            kids: {
                type: [
                    {
                        gender: {
                            type: String,
                            required: function() {
                                return this.children.hasChildrenUnder18 === true;
                            }
                        },
                        age: {
                            type: Number,
                            required: function() {
                                return this.children.hasChildrenUnder18 === true;
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
                            required: function() {
                                return this.children.hasChildrenUnder18 === true;
                            }
                        }
                    }
                ]
            },
            boysCount: {
                type: Number,
                match: [/^\d*[0-9]\d*$/, 'Must enter a non-negative number'],

            },
            boysAges: [{
                type: Number,
                match: [/^\d*[0-9]\d*$/, 'Must enter a non-negative number'],
            }],
            girlsCount: {
                type: Number,
                match: [/^\d*[0-9]\d*$/, 'Must enter a non-negative number'],
            },
            girlsAges: [{
                type: Number,
                match: [/^\d*[0-9]\d*$/, 'Must enter a non-negative number'],
            }],
            relationToApplicant: [{
                type: String
            }],
            schoolDistrict: [{
                type: String
            }],
            schools: [{
                type: String
            }],
        },
        otherAdults: [{
            isOtherAdultsAtResidence: {
                type: Boolean,
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
                        adultAge: {
                            type: Number,
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
                ]
            }

        }],
        homeAddress: {
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
                match: [/^\d{5}(?:-\d{4})?$/, 'Enter zip code in the following format ##### or #####-####']
            },
        },
        landLord: {
            fullName: {
                type: String
            },
            landLordPhone: {
                type: String,
                match: [/^[0-9]{10}/, 'Enter 10 digit phone number. Exclue any additional characters'],
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
                    type: Number,
                    match: [/^\d{5}(?:-\d{4})?$/, 'Enter zip code in the following format ##### or #####-####']
                },
            },
        },
        houseHoldIncome: {
            totalHouseholdIncome: {
                type: Number,
                match: [/^\d*[0-9]\d*$/, 'Must enter a non-negative number'],
            },
            totalSupportMembers: {
                type: Number,
                match: [/^\d*[0-9]\d*$/, 'Must enter a non-negative number'],
            },
            singleMaleHeadOfHousehold: {
                type: Boolean,
                required: true
            },
            singleFemaleHeadOfHousehold: {
                type: Boolean,
                required: true
            },
        },
        race: {
            americanIndianOrAlaskaNative: {
                type: Number,
                match: [/^\d*[0-9]\d*$/, 'Must enter a non-negative number'],
            },
            whiteOrCaucasian: {
                type: Number,
                match: [/^\d*[0-9]\d*$/, 'Must enter a non-negative number'],
            },
            asianAsianAmerican: {
                type: Number,
                match: [/^\d*[0-9]\d*$/, 'Must enter a non-negative number'],
            },
            otherRace: {
                type: Number,
                match: [/^\d*[0-9]\d*$/, 'Must enter a non-negative number'],
            },
            blackAfricanAmerican: {
                type: Number,
                match: [/^\d*[0-9]\d*$/, 'Must enter a non-negative number'],
            },
            multiRacial: {
                type: Number,
                match: [/^\d*[0-9]\d*$/, 'Must enter a non-negative number'],
            },
            latinoAmericanHispanic: {
                type: Number,
                match: [/^\d*[0-9]\d*$/, 'Must enter a non-negative number'],
            },
            unknown: {
                type: Number,
                match: [/^\d*[0-9]\d*$/, 'Must enter a non-negative number'],
            },
            nativeAmericanPacificIslander: {
                type: Number,
                match: [/^\d*[0-9]\d*$/, 'Must enter a non-negative number'],
            },
        },
    },
});

// function





const Applicant = models.Applicant || model('Applicant', applicantSchema, process.env.MONGO_DB_COL);
export default Applicant;
