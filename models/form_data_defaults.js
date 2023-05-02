const form_data_defaults = {
    timestamp: String,
    // 3 states PENDING, APPROVED, DENIED
    status: 'PENDING',
    referredBy: '',
    lastHelpDate: '',
    helpRequested: {
        rent: false,
        gasoline: false,
        busTicket: false,
    },
    licensePlate: '---',
    reasonForNeed: '',
    futurePlans: '',
    fName: '',
    middleInitial: '',
    lName: '',
    otherLastNames: [''],
    gender: '',
    age: 0,
    phone: 0,
    income: {
        currentMonthlyIncome: 0,
        monthlyIncomeLast12Months: 0,
        totalHouseholdMembersIncomeSupports: 0,
    },
    disabled: false,
    idSource: {
        driverLicenseOrId: '',
        expDate: 0,
        socialSecLastFour: 0
    },
    homelessness: {
        homeless: false,
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
    otherAdults: [],
    address: {},
    landLord: {},
    HouseHoldIncome: {},
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