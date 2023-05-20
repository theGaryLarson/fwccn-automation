const form_data_defaults = {
    timestamp: String,
    // 4 states PENDING, APPROVED, DENIED, APPROVED-OVERRIDE
    status: 'PENDING',
    referredBy: 'Mercy House',
    interviewer: 'Jane Doe',
    helpRequested: 'rent',
    licensePlate: 'CBY-2970',
    licensePlateState: 'WA',
    reasonForNeed: 'behind on rent',
    futurePlans: 'increased hours at work over summer',
    fName: 'Zhang',
    middleInitial: 'T',
    lName: 'Jang',
    otherNames: {
        hasOtherNames: true,
        additionalNames: [
            {
                otherFirstName: 'Bob',
                otherMiddleInitial: '',
                otherLastName: 'Ross'
            }
        ]
    },
    applicantGender: 'Female',
    applicantAge: '33',
    phone: '9876543210',
    income: {
        currentMonthlyIncome: 850,
        monthlyIncomeLast12Months: 16750,
        totalHouseholdMembersIncomeSupports: 3,
    },
    disabled: true,
    idSource: {
        driverLicenseOrId: 'WDLDOEJANEEE197PD',
        expDate: '2028-10-05',
        idStateIssued: 'WA',
        socialSecLastFour: '9999'
    },
    homelessness: {
        isHomeless: false,
        durationXpHomelessness: 0, // fixme: this is required for schema to validate correctly
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

        ],
        boysCount: undefined,
        girlsCount: undefined,
        boysAges: [],
        girlsAges: [],
        relationsToApplicant: [],
        schoolDistricts: [],
        schools: []
    },
    otherAdults: {
        isOtherAdultsAtResidence: true,
        adults: [
                    {
                        adultFName: 'John',
                        adultMiddleInitial: '',
                        adultLName: 'Doe',
                        adultGender: 'Male',
                        adultAge: '33',
                        relationshipToAdult: 'spouse',
                    }
                ]
    },
    homeAddress: {
        homeStreet1: '123 Oak St.',
        homeStreet2: 'Apt. 100',
        homeCity: 'Tacoma',
        homeState: 'WA',
        homeZip: '98142'
    }, //todo: add rent assistance
    landLord: {
        fullName: 'Nikki Rofland',
        landLordPhone: '1234567890',
        verified: true,
        address: {
            landLordStreet1: '321 Main St',
            landLordStreet2: '',
            landLordCity: 'Seattle',
            landLordState: 'WA',
            landLordZip: '98101'
        }
    },
    houseHoldIncome: {
        totalHouseholdIncome: '16750',
        totalSupportMembers: '3',
        singleMaleHeadOfHousehold: false,
        singleFemaleHeadOfHousehold: false,
    },
    race: {
        americanIndianOrAlaskaNative: 0,
        whiteOrCaucasian: 0,
        asianAsianAmerican: 0,
        otherRace: 3,
        blackAfricanAmerican: 0,
        multiRacial: 0,
        latinoAmericanHispanic: 0,
        unknown: 0,
        nativeAmericanPacificIslander: 0
    },
}

export default form_data_defaults;