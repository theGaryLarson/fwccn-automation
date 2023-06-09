const form_data_defaults = {
    timestamp: '',
    // 5 states PENDING, APPROVED, DENIED, APPROVED-OVERRIDE, NO-RETURN
    status: 'PENDING',
    referredBy: '',
    interviewer: '',
    actionTaken: {
        secondInterviewer: '',
        actionNotes: '',
        amountPromised: '',
        amountGivenToday: '',
        checkDate: '',
        checkMadeOutTo: '',
        checkNumber: '',
        rentBalanceOwed: '',
        gasVoucherAmount: '',
        checkAddress: {
            checkStreet1: '',
            checkStreet2: '',
            checkCity: '',
            checkState: '',
            checkZip: ''
        },
        motelLocation: '',
        motelDurationDays: 0,
        motelCost: 0
    },
    helpRequested: 'rent',
    licensePlate: '',
    licensePlateState: 'WA',
    isBusPrimaryTransport: false,
    reasonForNeed: '',
    futurePlans: '',
    fName: '',
    middleInitial: '',
    lName: '',
    otherNames: {
        hasOtherNames: false,
        additionalNames: [
            // {
            //     otherFirstName: 'Bob',
            //     otherMiddleInitial: '',
            //     otherLastName: 'Ross'
            // }
        ]
    },
    applicantGender: '',
    applicantAge: '',
    phone: '',
    disabled: false,
    idSource: {
        driverLicenseOrId: '',
        expDate: '',
        idStateIssued: '',
        socialSecLastFour: '',
        isValidLicense: false
    },
    homelessness: {
        isHomeless: false,
        durationXpHomelessness: 0, // fixme: this is required for schema to validate correctly
        placeStayedRecently: '',
        whyHomeless: '',
        tempAddress: {
            street1: '',
            street2: '',
            city: '',
            state: '',
            zip: ''
        }
    },
    children: {
        hasChildrenUnder18: false,
        kids: [
            {
                gender: '',
                age: 0,
                school: '',
                schoolDistrict: '',
                relationshipToApplicant: ''
            }
        ],
        boysCount: 0,
        girlsCount: 0,
        boysAges: [],
        girlsAges: [],
        relationsToApplicant: [],
        schoolDistricts: [],
        schools: []
    },
    otherAdults: {
        isOtherAdultsAtResidence: false,
        adults: [
            {
                adultFName: '',
                adultMiddleInitial: '',
                adultLName: '',
                adultGender: '',
                adultAge: 0,
                relationshipToAdult: '',
                relationDetails: ''
            }
        ]
    },
    homeAddress: {
        homeStreet1: '',
        homeStreet2: '',
        homeCity: '',
        homeState: '',
        homeZip: '',
        isMoreThanMonthBehind: false,
        verified: false
    },
    rentAssistance: {
        hasRentAssistance: false,
        monthlyRentPaidByApplicant: 0, //todo possibly change to 0
        hasSection8Assistance: false,
        monthlyRentPaidBySection8: 0,
        otherAssistance: [
            // {
            //     rentAssistanceProgram: '',
            //     amountPaidByProgram: 0
            // }
        ]


    },
    landLord: {
        fullName: '',
        landLordPhone: '',
        landLordAddress: {
            landLordStreet1: '',
            landLordStreet2: '',
            landLordCity: '',
            landLordState: '',
            landLordZip: ''
        }
    },
    houseHoldIncome: {
        totalHouseholdIncome: 0,
        houseHoldIncomePastYear: 0,
        totalSupportMembers: 0,
        singleHeadOfHouseHold: 'No', // states: 'No', 'Yes-male', 'Yes-female'
        incomeSituation: '',
        incomeSources: [
            {
                name: "Job(s)",
                peopleCount: 0
            },
            {
                name: "Unemployment",
                peopleCount: 0
            },
            {
                name: "DSHS",
                peopleCount: 0
            },
            {
                name: "Social Security",
                peopleCount: 0
            },
            {
                name: "Pension",
                peopleCount: 0
            },
            {
                name: "Child Support",
                peopleCount: 0
            },
            {
                name: "Child Tax Credit Payments",
                peopleCount: 0
            },
            {
                name: "Food Stamps",
                peopleCount: 0
            },
            {
                name: "State Medical",
                peopleCount: 0
            },
        ],
        isIncomeVerified: false
    },
    race: {
        americanIndianOrAlaskaNative: 0,
        whiteOrCaucasian: 0,
        asianAsianAmerican: 0,
        otherRace: 0,
        blackAfricanAmerican: 0,
        multiRacial: 0,
        latinoAmericanHispanic: 0,
        unknown: 0,
        nativeAmericanPacificIslander: 0
    },
}

export default form_data_defaults;