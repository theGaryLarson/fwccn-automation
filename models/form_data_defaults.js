const form_data_defaults = {
    timestamp: String,
    // 5 states PENDING, APPROVED, DENIED, APPROVED-OVERRIDE, NO-RETURN
    status: 'PENDING',
    referredBy: 'Mercy House',
    interviewer: 'Jane Doe',
    helpRequested: 'rent',
    licensePlate: 'CBY-2970',
    licensePlateState: 'WA',
    isBusPrimaryTransport: true, //todo add to schema
    reasonForNeed: 'behind on rent',
    futurePlans: 'increased hours at work over summer',
    fName: 'May',
    middleInitial: 'D',
    lName: 'Madeline',
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
        isHomeless: true,
        durationXpHomelessness: 5, // fixme: this is required for schema to validate correctly
        placeStayedRecently: 'friend\'s house',
        whyHomeless: 'jobless',
        tempAddress: {
            street1: '123 Gospel Way',
            street2: '',
            city: 'Federal Way',
            state: 'WA',
            zip: '98106'
        }
    },
    children: {
        hasChildrenUnder18: true,
        kids: [
            {
                gender: 'female',
                age: 14,
                school: 'Tacoma School',
                schoolDistrict: 'Tacoma School District',
                relationshipToApplicant: 'daughter'
            },
            {
                gender: 'male',
                age: 9,
                school: 'Tacoma School',
                schoolDistrict: 'Tacoma School District',
                relationshipToApplicant: 'son'
            }
        ],
        boysCount: 1,
        girlsCount: 1,
        boysAges: [9],
        girlsAges: [14],
        relationsToApplicant: ['daughter'],
        schoolDistricts: ['Tacoma School District', 'Tacoma School District'],
        schools: ['Tacoma School', 'Tacoma School']
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
                        relationDetails: ''
                    },
                    {
                        adultFName: 'John',
                        adultMiddleInitial: '',
                        adultLName: 'Doe',
                        adultGender: 'Male',
                        adultAge: '33',
                        relationshipToAdult: 'relative',
                        relationDetails: 'step-brother'
                    }
        ]
    },
    homeAddress: {
        homeStreet1: '123 oak st',
        homeStreet2: 'Apt. 100',
        homeCity: 'Tacoma',
        homeState: 'WA',
        homeZip: '98142',
        isMoreThanMonthBehind: false,
        verified: true
    },
    rentAssistance: {
        hasRentAssistance: true,
        monthlyRentPaidByApplicant: 300,
        hasSection8Assistance: true,
        monthlyRentPaidBySection8: 650,
        otherAssistance: [
            {
                rentAssistanceProgram: 'Second Chances',
                amountPaidByProgram: 25
            }
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
        singleFemaleHeadOfHousehold: true,
        incomeSituation: "getting laid off in one week. A month behind.",
        incomeSources: [
            {
                name: "Job(s)",
                peopleCount: 1
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
                peopleCount: 2
            },
            {
                name: "State Medical",
                peopleCount: 0
            },
        ],
        isIncomeVerified: true
    },
    race: {
        americanIndianOrAlaskaNative: 0,
        whiteOrCaucasian: 0,
        asianAsianAmerican: 0,
        otherRace: 0,
        blackAfricanAmerican: 0,
        multiRacial: 0,
        latinoAmericanHispanic: 4,
        unknown: 0,
        nativeAmericanPacificIslander: 0
    },
}

export default form_data_defaults;