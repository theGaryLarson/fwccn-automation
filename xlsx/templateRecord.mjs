
export function adjustForTimeZone(date) {
    // Get the timezone offset in minutes and convert it to hours
    const offsetHours = new Date(date).getTimezoneOffset() / 60;

    // Adjust for Pacific Time (PT), which is UTC-7 or UTC-8
    const adjustedHours = offsetHours === 420 ? 7 : 8;

    // Format the date to ISO string and replace the hour part
    return date.toISOString().replace(/T\d{2}/, `T${String(adjustedHours).padStart(2, '0')}`);
}

const templateRecord ={
    timestamp: '',
    dateOfService: '', // DATE OF SERVICE HERE
    serviceDate: undefined,
    status: 'PENDING', // 5 states PENDING, APPROVED, DENIED, APPROVED-OVERRIDE, NO-RETURN
    referredBy: '',
    interviewer: '',
    actionTaken: {
        secondInterviewer: '',
        fundSource: '',
        actionNotes: 'NO INCOME SOURCE DATA. AMI SET BASED ON INC BELOW 30 OR INC BELOW 40 COLUMNS' +
            '\n\nNEED SUMMARY DOES NOT DISPLAY CHILDREN FOR IMPORTED DATA.\nSEE DEMOGRAPHICS IN FORM PAGE (CLICK SHOW FORM).' +
            '\n\nNO INTERVIEWER RECORDED FOR IMPORTED DATA.' +
            '\n\nSTATUS: APPROVED. ASSUMED BASED ON CHECK # PRESENT FOR RENT.' +
            '\n\nBUS, GAS, MOTEL APPROVED IF EXCEL DATA HAS AMT COLUMN GREATER THAN ZERO.' +
            '\n\nVERIFICATION ASSUMED BASED ON APPROVAL.',
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
    reasonForNeed: '[EXCEL 2022 ENTRY. NO DATA]',
    futurePlans: '[EXCEL 2022 ENTRY. NO DATA]',
    fName: '', // FNAME header
    middleInitial: '', // MI header
    lName: '', // LNAME header
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
    applicantGender: '[NO DATA]',
    applicantAge: undefined,
    phone: '', // REMARKS/TELE. #
    email: '[NO DATA]',
    disabled: false,
    idSource: {
        driverLicenseOrId: '', // ID header goes here
        expDate: '', // is not entered
        idStateIssued: '', // "WA" by default
        socialSecLastFour: '',
        isValidLicense: false
    },
    homelessness: {
        isHomeless: false, // HMLS -> mark true
        durationXpHomelessness: 0,
        placeStayedRecently: '[EXCEL 2022 ENTRY. NO DATA]',
        whyHomeless: '[EXCEL 2022 ENTRY. NO DATA.]', // ADDRESS
        tempAddress: {
            street1: '',
            street2: ' ',
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
        adults: [ //headers OTHER ADULTS 1, OTHER ADULT 2, OTHER ADULTS 3 etc... will be mapped here. fname and lname separated by a comma
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
        aptName: '', // APT/MOTEL NAME
        homeStreet1: '', // ADDRESS
        homeStreet2: undefined,
        homeCity: '', // CITY
        homeState: 'WA',
        homeZip: '', // ZIP
        isMoreThanMonthBehind: false,
        verified: true
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
            landLordStreet1: '[EXCEL 2022 ENTRY. NO DATA.]',
            landLordStreet2: '[EXCEL 2022 ENTRY. NO DATA.]',
            landLordCity: '[EXCEL 2022 ENTRY. NO DATA.]',
            landLordState: '[EXCEL 2022 ENTRY. NO DATA.]',
            landLordZip: undefined
        }
    },
    houseHoldIncome: {
        totalHouseholdIncome: undefined,
        houseHoldIncomePastYear: undefined,
        totalSupportMembers: undefined,
        singleHeadOfHouseHold: 'NO-DATA', // states: 'No', 'Yes-male', 'Yes-female', 'NO-DATA'
        incomeLevel: '', //INC BELOW 30  or INC BELOW 40
        percentOfAnnualAmi: undefined,
        incomeSituation: '[EXCEL 2022. NO DATA. SEE DEMOGRAPHICS FOR HOUSEHOLD SIZE]',
        incomeSources: [
            {
                name: "[EXCEL 2022. NO DATA]",
                peopleCount: 0
            }
        ],
        isIncomeVerified: false
    },
    demographics: {
        totalMales: 0, // MALE
        totalFemales: 0, // FEMALE
        whiteOrCaucasian: 0, // WHT
        blackAfricanAmerican: 0, // BLK
        asianAsianAmerican: 0,
        americanIndianOrAlaskaNative: 0,
        nativeHawaiianPacificIslander: 0, // NAT.AM/PI
        latinoAmericanHispanic: 0, // LAT
        americanIndianOrAlaskaNativeAndWhite: 0, // IND/ASK
        asianAsianAmericanAndWhite: 0, // AS
        blackAfricanAmericanAndWhite: 0,
        americanIndianOrAlaskaNativeAndBlackAfricanAmerican: 0,
        otherRace: 0, // OTHER
        multiRacial: 0, // MULTI
        unknown: 0 // ?
    },
    maleAgeRange: { // these have the same names as female may be easiest to change the headers
        zeroToFive: 0, // M0 to 5
        sixToTwelve: 0, // M6 to 12
        thirteenToSeventeen: 0, // M13 to 17
        eighteenToTwentyFour: 0, // M18 to 24
        twentyFiveToThirtyFour: 0, // M25 to 34
        thirtyFiveToFiftyFour: 0, // M35 to 54
        fiftyFiveToSeventyFour: 0, // M55 to 74
        seventyFiveToEightyFour: 0, // M75 to 84
        eightyFivePlus: 0, // M85+
        unknown: 0 // MUNKNOWN
    },
    femaleAgeRange: { // these have the same names as male may be easiest to change the headers
        zeroToFive: 0, // F0 to 5
        sixToTwelve: 0, // F6 to 12
        thirteenToSeventeen: 0, // F13 to 17
        eighteenToTwentyFour: 0, // F18 to 24
        twentyFiveToThirtyFour: 0, // F25 to 34
        thirtyFiveToFiftyFour: 0, // F35 to 54
        fiftyFiveToSeventyFour: 0, // F55 to 74
        seventyFiveToEightyFour: 0, // F75 to 84
        eightyFivePlus: 0, // F85+
        unknown: 0 // FUNKNOWN
    }
}

export default templateRecord