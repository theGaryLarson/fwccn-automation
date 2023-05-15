const form_data_defaults = {
    timestamp: String,
    // 4 states PENDING, APPROVED, DENIED, APPROVED-OVERRIDE
    status: 'PENDING',
    referredBy: '',
    lastHelpDate: '',
    helpRequested: 'rent',
    licensePlate: '',
    licensePlateState: '',
    reasonForNeed: '',
    futurePlans: '',
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
    age: '',
    phone: '',
    income: {
        currentMonthlyIncome: '',
        monthlyIncomeLast12Months: '',
        totalHouseholdMembersIncomeSupports: '',
    },
    disabled: false,
    idSource: {
        driverLicenseOrId: '',
        expDate: '',
        idStateIssued: '',
        socialSecLastFour: ''
    },
    homelessness: {
        isHomeless: false,
        durationXpHomelessness: '',
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
                gender: 'female',
                age: '',
                school: '',
                schoolDistrict: '',
                relationshipToApplicant: ''
            }
        ],
        boysCount: '',
        girlsCount: '',
        boysAges: [],
        girlsAges: [],
        relationshipsToApplicant: [],
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
                        adultAge: '',
                        relationshipToAdult: '',
                    }
                ]
    },
    homeAddress: {
        homeStreet1: '',
        homeStreet2: '',
        homeCity: '',
        homeZip: ''
    },
    landLord: {
        fullName: '',
        landLordPhone: '',
        verified: false,
        address: {
            landLordStreet1: '',
            landLordStreet2: '',
            landLordCity: '',
            landLordZip: ''
        }
    },
    houseHoldIncome: {
        totalHouseholdIncome: '',
        totalSupportMembers: '',
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