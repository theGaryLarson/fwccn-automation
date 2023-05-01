import Applicant from "../../../models/applicant_schema";
import { faker } from '@faker-js/faker';

export default async function genDummyData(req, res) {

    // Define the number of entries to generate
    const entriesCount = 10;

    for (let i = 0; i < entriesCount; i++) {
        const applicant = new Applicant({
            timestamp: faker.date.recent(),
            status: faker.random.arrayElement(['PENDING', 'APPROVED', 'DENIED']),
            referredBy: faker.random.boolean() ? faker.company.companyName() : '',
            lastHelpDate: faker.date.past(),
            helpRequested: {
                rent: faker.random.boolean(),
                gasoline: faker.random.boolean(),
                licensePlate: faker.random.alphaNumeric(8),
                busTicket: faker.random.boolean(),
                food: faker.random.boolean(),
            },
            reasonForNeed: faker.lorem.sentences(),
            futurePlans: faker.lorem.sentences(),
            fName: faker.name.firstName(),
            middleInitial: faker.name.firstName().charAt(0),
            lName: faker.name.lastName(),
            otherLastNames: [faker.name.lastName()],
            gender: faker.random.arrayElement(['Male', 'Female']),
            age: faker.random.number({min: 18, max: 65}),
            phone: faker.phone.phoneNumber(),
            income: {
                currentMonthlyIncome: faker.random.number({min: 1000, max: 5000}),
                monthlyIncomeLast12Months: faker.random.number({min: 12000, max: 60000}),
                totalHouseholdMembersIncomeSupports: faker.random.number({min: 1, max: 6}),
            },
            disabled: faker.random.boolean(),
            idSource: {
                driverLicenseOrId: faker.random.alphaNumeric(10),
                expDate: faker.date.future(),
                socialSecLastFour: faker.random.number({min: 1000, max: 9999}),
            },
            homelessness: {
                homeless: faker.random.boolean(),
                durationXpHomelessness: faker.random.number({min: 0, max: 24}),
                whyHomeless: faker.lorem.sentences(),
                tempAddress: {
                    street1: faker.address.streetName(),
                    street2: faker.address.secondaryAddress(),
                    city: faker.address.city(),
                    state: faker.address.stateAbbr(),
                    zip: faker.address.zipCode(),
                },
            },
            children: {
                hasChildrenUnder18: faker.random.boolean(),
                boysCount: faker.random.number({min: 0, max: 3}),
                boysAges: [faker.random.number({min: 1, max: 17})],
                girlsCount: faker.random.number({min: 0, max: 3}),
                girlsAges: [faker.random.number({min: 1, max: 17})],
                nonBinaryCount: faker.random.number({min: 0, max: 3}),
                nonBinaryAges: [faker.random.number({min: 1, max: 17})],
                relationshipToChildren: faker.lorem.word(),
                schoolDistrict: faker.address.city(),
                schools: [faker.company.companyName()],
            },
            otherAdults: [
                {
                    adultFName: faker.name.firstName(),
                    adultMiddleInitial: faker.name.firstName().charAt(0),
                    adultLName: faker.name.lastName(),
                    adultGender: faker.random.arrayElement(['Male', 'Female']),
                    adultAge: faker.random.number({min: 18, max: 65}),
                    relationshipToAdult: faker.lorem.word(),
                },
            ],
            address: {
                street1: faker.address.streetName(),
                street2: faker.address.secondaryAddress(),
                city: faker.address.city(),
                state: faker.address.stateAbbr(),
                zip: faker.address.zipCode(),
            },
            landLord: {
                name: faker.name.firstName() + ' ' + faker.name.lastName(),
                landLordPhone: faker.phone.phoneNumber(),
                verified: faker.random.boolean(),
                landLordAddress: {
                    street1: faker.address.streetName(),
                    street2: faker.address.secondaryAddress(),
                    city: faker.address.city(),
                    zip: faker.address.zipCode(),
                },
            },
            HouseHoldIncome: {
                totalHouseholdIncome: faker.random.number({min: 10000, max: 100000}),
                totalSupportMembers: faker.random.number({min: 1, max: 6}),
                singleMaleHeadOfHousehold: faker.random.boolean(),
                singleFemaleHeadOfHousehold: faker.random.boolean(),
            },
            race: {
                americanIndianOrAlaskaNative: faker.random.number(10),
                whiteOrCaucasian: faker.random.number(10),
                asianAsianAmerican: faker.random.number(10),
                otherRace: faker.random.number(10),
                blackAfricanAmerican: faker.random.number(10),
                multiRacial: faker.random.number(10),
                latinoAmericanHispanic: faker.random.number(10),
                unknown: faker.random.number(10),
                nativeAmericanPacificIslander: faker.random.number(10),
            },
        });
        applicant.create().then()
    }

    // Insert the applicants into the database using Mongoose's insertMany method
    try {
        const result = await Applicant.insertMany(applicants);
        res.status(200).json({ message: `Inserted ${result.length} applicants.` });
    } catch (error) {
        res.status(500).json({ message: 'Error inserting applicants.', error });
    }
}
