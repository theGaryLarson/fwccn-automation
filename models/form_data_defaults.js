const form_data_defaults = {
    timestamp: String,
    // 4 states PENDING, APPROVED, DENIED, APPROVED-OVERRIDE
    status: 'PENDING',
    referredBy: 'Mercy House',
    interviewer: 'Jane Doe',
    helpRequested: 'rent',
    licensePlate: 'CBY-2970',
    licensePlateState: 'WA',
    isBusPrimaryTransport: false, //todo add to schema
    reasonForNeed: 'behind on rent',
    futurePlans: 'increased hours at work over summer',
    fName: 'John',
    middleInitial: 'D',
    lName: 'Mark',
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
    applicantGender: 'Male',
    applicantAge: '33',
    phone: '9876543210',
    disabled: false,
    idSource: {
        driverLicenseOrId: 'FGSLTWHGHOBS316',
        expDate: '2028-10-05',
        idStateIssued: 'WA',
        socialSecLastFour: '7777',
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
            /*
            gender: '',
            age: 0,
            school: '',
            schoolDistrict: '',
            relationshipToApplicant: ''
             */
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
        isOtherAdultsAtResidence: false,
        adults: [
                    // {
                    //     adultFName: 'John',
                    //     adultMiddleInitial: '',
                    //     adultLName: 'Doe',
                    //     adultGender: 'Male',
                    //     adultAge: '33',
                    //     relationshipToAdult: 'spouse',
                    //     relationDetails: ''
                    // }
                ]
    },
    homeAddress: {
        homeStreet1: '123 Oak St.',
        homeStreet2: 'Apt. 100',
        homeCity: 'Tacoma',
        homeState: 'WA',
        homeZip: '98142',
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
        fullName: 'Nikki Rofland',
        landLordPhone: '1234567890',
        landLordAddress: {
            landLordStreet1: '321 Main St',
            landLordStreet2: '',
            landLordCity: 'Seattle',
            landLordState: 'WA',
            landLordZip: '98101'
        }
    },
    houseHoldIncome: {
        totalHouseholdIncome: 850,
        houseHoldIncomePastYear: 10200,
        totalSupportMembers: 3,
        singleMaleHeadOfHousehold: false,
        singleFemaleHeadOfHousehold: false,
        incomeSituation: "",
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
        otherRace: 3,
        blackAfricanAmerican: 0,
        multiRacial: 0,
        latinoAmericanHispanic: 0,
        unknown: 0,
        nativeAmericanPacificIslander: 0
    },
}

export default form_data_defaults;