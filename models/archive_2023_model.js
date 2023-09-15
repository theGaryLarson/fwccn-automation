const form_data_defaults = {
    timestamp: '',
    dateOfService: '', // DATE OF SERVICE HERE
    // 5 states PENDING, APPROVED, DENIED, APPROVED-OVERRIDE, NO-RETURN
    status: 'PENDING',
    referredBy: '',
    interviewer: '',
    actionTaken: {
        secondInterviewer: '',
        fundSource: '',
        actionNotes: '', // AMT RENT PAID, AMT GAS, AMT MOTEL, AMT BUS are all prepended with <HEADER>: value
        promiseFilled: '', // PROMISE FILLED HERE
        amountPromised: 0, // PROMISE AMT. header here
        amountGivenToday: 0,
        checkDate: '',
        checkMadeOutTo: '',
        checkNumber: '', // CHECK # header
        checkAmount: 0, // if RENT == RENT -> AMT RENT PAID, if GAS -> AMT GAS, if MOTEL -> AMT MOTEL, if BUS -> AMT BUS
        rentBalanceOwed: 0,
        gasVoucherAmount: 0,
        checkAddress: {
            checkStreet1: '',
            checkStreet2: '',
            checkCity: '',
            checkState: '',
            checkZip: ''
        },
        motelLocation: '', // MOTEL header here
        motelDurationDays: 0, // TOTAL NIGHTS preceding MOTEL header goes here
        motelCost: 0
    },
    helpRequested: 'rent', // RENT GAS MOTEL, BUS go here
    licensePlate: '',
    licensePlateState: 'WA',
    isBusPrimaryTransport: false,
    reasonForNeed: '',
    futurePlans: '',
    fName: '', // NAME header from csv first portion of string before the comma
    middleInitial: '',
    lName: '', // NAME header from csv last portion of string after the comma
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
    email: '',
    disabled: false,
    idSource: {
        driverLicenseOrId: '', // ID header goes here
        expDate: '', // is not entered
        idStateIssued: 'WA', // "WA" by default
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
            // {
            //     gender: '',
            //     age: 0,
            //     school: '',
            //     schoolDistrict: '',
            //     relationshipToApplicant: ''
            // }
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
        adults: [ //headers OTHER ADULTS 1, OTHER ADULT 2, OTHER ADULTS 3 etc.. will be mapped here. fname and lname separated by a comma
            // {
            //     adultFName: '',
            //     adultMiddleInitial: '',
            //     adultLName: '',
            //     adultGender: '',
            //     adultAge: 0,
            //     relationshipToAdult: '',
            //     relationDetails: ''
            // }
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
        monthlyRentPaidByApplicant: 0,
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
        totalHouseholdIncome: '',
        houseHoldIncomePastYear: '',
        totalSupportMembers: '',
        singleHeadOfHouseHold: 'No', // states: 'No', 'Yes-male', 'Yes-female'
        incomeLevel: '',
        percentOfAnnualAmi: '',
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
    demographics: {
        totalMales: 0, // MALE
        totalFemales: 0, // FEMALE
        whiteOrCaucasian: 0,
        blackAfricanAmerican: 0,
        asianAsianAmerican: 0,
        americanIndianOrAlaskaNative: 0,
        nativeHawaiianPacificIslander: 0,
        latinoAmericanHispanic: 0,
        americanIndianOrAlaskaNativeAndWhite: 0,
        asianAsianAmericanAndWhite: 0,
        blackAfricanAmericanAndWhite: 0,
        americanIndianOrAlaskaNativeAndBlackAfricanAmerican: 0,
        otherRace: 0,
        multiRacial: 0,
        unknown: 0
    },
    maleAgeRange: { // these have the same names as female may be easiest to change the headers
        zeroToFive: 0, // 0 to 5
        sixToTwelve: 0, // 6 to 12
        thirteenToSeventeen: 0, // 13 to 17
        eighteenToTwentyFour: 0, // 18 to 24
        twentyFiveToThirtyFour: 0, // 25 to 34
        thirtyFiveToFiftyFour: 0, // 35 to 54
        fiftyFiveToSeventyFour: 0, // 55 to 74
        seventyFiveToEightyFour: 0, // 75 to 84
        eightyFivePlus: 0,
        unknown: 0
    },
    femaleAgeRange: {
        zeroToFive: 0,
        sixToTwelve: 0,
        thirteenToSeventeen: 0,
        eighteenToTwentyFour: 0,
        twentyFiveToThirtyFour: 0,
        thirtyFiveToFiftyFour: 0,
        fiftyFiveToSeventyFour: 0,
        seventyFiveToEightyFour: 0,
        eightyFivePlus: 0,
        unknown: 0
    }
}

export default form_data_defaults;