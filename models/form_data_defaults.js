const form_data_defaults = {
    timestamp: String,
    // 3 states PENDING, APPROVED, DENIED
    status: 'APPROVED',
    referredBy: '',
    lastHelpDate: '',
    helpRequested: {
        rent: false,
        gasoline: false,
        busTicket: false,
    },
    licensePlate: 'FXV-1234',
    reasonForNeed: 'My car broke down and I need to get to work.',
    futurePlans: 'I am going to get a new job and save money for a new car.',
    fName: '',
    middleInitial: '',
    lName: '',
    otherNames: {
        hasOtherNames: false,
        additionalNames: [
            {
                otherFirstName: '',
                otherMiddleInitial: '',
                otherLastName: ''
            }
        ]
    },
    gender: '',
    age: 21,
    phone: 0,
    income: {
        currentMonthlyIncome:  1234,
        monthlyIncomeLast12Months: 1234,
        totalHouseholdMembersIncomeSupports: 2,
    },
    disabled: false,
    idSource: {
        driverLicenseOrId: 'Driver License',
        expDate: '05-01-2025',
        socialSecLastFour: 1234,
    },
    homelessness: {
        homeless: true,
        durationXpHomelessness: 0,
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
        boysCount: 0,
        boysAges: [0],
        girlsCount: 0,
        girlsAges: [0],
        nonBinaryCount: 0,
        nonBinaryAges: [0],
        relationshipToChildren: '',
        schoolDistrict: '',
        schools: ['']
    },
    otherAdults: [
        {
            adultFName: '',
            adultMiddleInitial: '',
            adultLName: '',
            adultGender: '',
            adultAge: 0,
            relationshipToAdult: '',
        },
    ],
    homeAddress: {
        homeStreet1: '',
        homeStreet2: '',
        homeCity: '',
        homeZip: 0
    },
    landLord: {
        fullName: '',
        landLordPhone: '',
        verified: false,
        address: {
            landLordStreet1: '',
            landLordStreet2: '',
            landLordCity: '',
            landLordZip: 0
        }
    },
    houseHoldIncome: {
        totalHouseholdIncome: 0,
        totalSupportMembers: 0,
        singleMaleHeadOfHousehold: false,
        singleFemaleHeadOfHousehold: false,
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