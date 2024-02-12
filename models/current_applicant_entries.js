const currentApplicantEntries = {
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
            state: 'WA',
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
            //     relationDetails: ''
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
        aptName: '',
        homeStreet1: '',
        homeStreet2: '',
        homeCity: '',
        homeState: 'WA',
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
        singleHeadOfHouseHold: 'NO-DATA', // states: 'No', 'Yes-male', 'Yes-female'
        incomeLevel: '',
        percentOfAnnualAmi: '',
        incomeSituation: '',
        incomeSources: [
            {
                name: "Job(s)",
                peopleCount: ''
            },
            {
                name: "Unemployment",
                peopleCount: ''
            },
            {
                name: "DSHS",
                peopleCount: ''
            },
            {
                name: "Social Security",
                peopleCount: ''
            },
            {
                name: "Pension",
                peopleCount: ''
            },
            {
                name: "Child Support",
                peopleCount: ''
            },
            {
                name: "Child Tax Credit Payments",
                peopleCount: ''
            },
            {
                name: "Food Stamps",
                peopleCount: ''
            }
        ],
        isIncomeVerified: false
    },
    demographics: {
        totalMales: '',
        totalFemales: '',
        whiteOrCaucasian: '',
        blackAfricanAmerican: '',
        asianAsianAmerican: '',
        americanIndianOrAlaskaNative: '',
        nativeHawaiianPacificIslander: '',
        latinoAmericanHispanic: '',
        americanIndianOrAlaskaNativeAndWhite: '',
        asianAsianAmericanAndWhite: '',
        blackAfricanAmericanAndWhite: '',
        americanIndianOrAlaskaNativeAndBlackAfricanAmerican: '',
        otherRace: '',
        multiRacial: '',
        unknown: ''
    },
    maleAgeRange: {
        zeroToFive: '',
        sixToTwelve: '',
        thirteenToSeventeen: '',
        eighteenToTwentyFour: '',
        twentyFiveToThirtyFour: '',
        thirtyFiveToFiftyFour: '',
        fiftyFiveToSeventyFour: '',
        seventyFiveToEightyFour: '',
        eightyFivePlus: '',
        unknown: ''
    },
    femaleAgeRange: {
        zeroToFive: '',
        sixToTwelve: '',
        thirteenToSeventeen: '',
        eighteenToTwentyFour: '',
        twentyFiveToThirtyFour: '',
        thirtyFiveToFiftyFour: '',
        fiftyFiveToSeventyFour: '',
        seventyFiveToEightyFour: '',
        eightyFivePlus: '',
        unknown: ''
    }
}

export default currentApplicantEntries;