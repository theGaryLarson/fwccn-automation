const form_data_defaults = {
    timestamp: '',
    dateOfService: '',
    // 5 states PENDING, APPROVED, DENIED, APPROVED-OVERRIDE, NO-RETURN
    status: 'PENDING',
    referredBy: '',
    interviewer: '',
    actionTaken: {
        secondInterviewer: '',
        fundSource: 'ARPA',
        promiseFilled: '',
        actionNotes: '',
        amountPromised: 0,
        amountGivenToday: 0,
        checkDate: '',
        checkMadeOutTo: '',
        checkNumber: '',
        checkAmount: 0,
        rentBalanceOwed: 0,
        gasVoucherAmount: 0,
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
    email: '',
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
        adults: [
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
        totalMales: 0,
        totalFemales: 0,
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
    maleAgeRange: {
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