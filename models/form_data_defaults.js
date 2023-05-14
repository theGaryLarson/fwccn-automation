const form_data_defaults = {
    timestamp: String,
    // 3 states PENDING, APPROVED, DENIED, OVERRIDE-APPROVAL
    status: 'PENDING',
    referredBy: '',
    lastHelpDate: '',
    helpRequested: 'rent',
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
        isHomeless: false,
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
        kids : [
            {
                gender: 'female',
                age: '',
                school: '',
                schoolDistrict: '',
                relationshipToApplicant: ''
            }
        ],
        boysCount: 0,
        girlsCount: 0,
        boysAges: [0],
        girlsAges: [0],
        relationshipsToApplicant: [''],
        schoolDistricts: [''],
        schools: ['']
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
                    }
                ]
    },
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