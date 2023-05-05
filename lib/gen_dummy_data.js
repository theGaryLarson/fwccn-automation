import Applicant from "../models/applicant_schema";
import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';

// fixme: need to change json to map to the unique names in Applicant Schema and
//  and in form_data_defaults.js

// const Applicant = require('../models/applicant_schema');
// const { faker } = require('@faker-js/faker');
// const fs = require('fs');
// const path = require('path');
 export async function generateRentWithKids() {
    // Define the number of entries to generate
    const entriesCount = 10;
    const applicants = [];
    const status = ['PENDING', 'APPROVED', 'DENIED', 'OVERRIDE-APPROVAL'];
    const district = ['Tacoma School District', 'Federal Way Public Schools District'];
    const schools = [
        'Lincoln High School (Tacoma)',
        'Fern Hill Elementary School (Tacoma)',
        'Federal Way High School (Federal Way)',
        'Rainier View Elementary School (Federal Way)',
        'Stewart Middle School (Tacoma)',
        'Twin Lakes Elementary School (Federal Way)'
    ];
    const gender = ['male', 'female', 'non-binary'];
    const childRelation = ['parent', 'roommate\'s child', 'relative\'s child'];
    const adultRelation = ['spouse', 'roommate', 'romantic partner', 'relative']

    for (let i = 0; i < entriesCount; i++) {
        const applicant = new Applicant({
            timestamp: faker.date.recent().toISOString().slice(0, 19)
                .replace('T', ' '),
            status: status[faker.datatype.number({min: 0, max: 3})],
            referredBy: faker.datatype.boolean() ? faker.company.name() : '',
            lastHelpDate: faker.datatype.boolean ? faker.date.past().toISOString().slice(0, 19)
                .replace('T', ' ') : 0,
            helpRequested: {
                rent: faker.datatype.boolean(),
                gasoline: faker.datatype.boolean(),
                licensePlate: faker.random.alphaNumeric(8),
                busTicket: faker.datatype.boolean(),
                food: faker.datatype.boolean(),
            },
            reasonForNeed: faker.lorem.sentences(),
            futurePlans: faker.lorem.sentences(),
            fName: faker.name.firstName(),
            middleInitial: faker.name.firstName().charAt(0),
            lName: faker.name.lastName(),
            otherLastNames: [faker.name.lastName()],
            gender: "MALE",
            age: faker.datatype.number({min: 18, max: 65}),
            phone: faker.phone.number("253-###-####"),
            income: {
                currentMonthlyIncome: faker.datatype.number({min: 1000, max: 5000}),
                monthlyIncomeLast12Months: faker.datatype.number({min: 12000, max: 60000}),
                totalHouseholdMembersIncomeSupports: faker.datatype.number({min: 1, max: 6}),
            },
            disabled: faker.datatype.boolean(),
            idSource: {
                driverLicenseOrId: faker.random.alphaNumeric(10),
                expDate: faker.date.future().toISOString().slice(0, 19)
                    .replace('T', ' '),
                socialSecLastFour: faker.datatype.number({min: 1000, max: 9999}),
            },
            homelessness: {
                homeless: faker.datatype.boolean(),
                durationXpHomelessness: faker.datatype.number({min: 0, max: 24}),
                whyHomeless: faker.lorem.sentences(),
                tempAddress: {
                    street1: faker.address.street(),
                    street2: faker.address.secondaryAddress(),
                    city: faker.address.city(),
                    state: faker.address.stateAbbr(),
                    zip: faker.address.zipCode(),
                },
            },
            children: {
                hasChildrenUnder18: faker.datatype.boolean(),
                boysCount: faker.datatype.number({min: 0, max: 3}),
                boysAges: [faker.datatype.number({min: 1, max: 17})],
                girlsCount: faker.datatype.number({min: 0, max: 3}),
                girlsAges: [faker.datatype.number({min: 1, max: 17})],
                nonBinaryCount: faker.datatype.number({min: 0, max: 3}),
                nonBinaryAges: [faker.datatype.number({min: 1, max: 17})],
                relationshipToChildren: [childRelation[faker.datatype.number({min:0, max:2})]],
                schoolDistrict: [district[faker.datatype.number({min:0, max:0})]],
                schools: [schools[faker.datatype.number({min:0, max:5})]],
            },
            otherAdults: [
                {
                    adultFName: faker.name.firstName(),
                    adultMiddleInitial: faker.name.firstName().charAt(0),
                    adultLName: faker.name.lastName(),
                    adultGender: gender[faker.datatype.number({min:0, max:2})],
                    adultAge: faker.datatype.number({min: 18, max: 65}),
                    relationshipToAdult: adultRelation[faker.datatype.number({min:0, max:3})],
                },
            ],
            address: {
                street1: faker.address.street(),
                street2: faker.address.secondaryAddress(),
                city: faker.address.city(),
                state: faker.address.stateAbbr(),
                zip: faker.address.zipCode(),
            },
            landLord: {
                name: faker.name.firstName() + ' ' + faker.name.lastName(),
                landLordPhone: faker.phone.number('###-###-####'),
                verified: faker.datatype.boolean(),
                landLordAddress: {
                    street1: faker.address.street(),
                    street2: faker.address.secondaryAddress(),
                    city: faker.address.city(),
                    zip: faker.address.zipCode(),
                },
            },
            HouseHoldIncome: {
                totalHouseholdIncome: faker.datatype.number({min: 10000, max: 100000}),
                totalSupportMembers: faker.datatype.number({min: 1, max: 6}),
                singleMaleHeadOfHousehold: faker.datatype.boolean(),
                singleFemaleHeadOfHousehold: faker.datatype.boolean(),
            },
            race: {
                americanIndianOrAlaskaNative: faker.datatype.number(10),
                whiteOrCaucasian: faker.datatype.number(10),
                asianAsianAmerican: faker.datatype.number(10),
                otherRace: faker.datatype.number(10),
                blackAfricanAmerican: faker.datatype.number(10),
                multiRacial: faker.datatype.number(10),
                latinoAmericanHispanic: faker.datatype.number(10),
                unknown: faker.datatype.number(10),
                nativeAmericanPacificIslander: faker.datatype.number(10),
            },
        });
        applicants.push(applicant);
    }
    try {
        writeDataToFile(applicants, 'dummyRentData.json')
    } catch (error) {
        console.log('Error exporting data to file', error)
    }

    try {
        // Insert the applicants into the database using Mongoose's insertMany method
        // await Applicant.insertMany(applicants);

    } catch (error) {
        console.log('Error inserting applicants', error);
    }
}

// Function to write data to a file
function writeDataToFile(data, filename) {
    const filePath = path.join(__dirname, 'data', filename);
    const jsonString = JSON.stringify(data, null, 2);

    fs.writeFile(filePath, jsonString, (err) => {
        if (err) {
            console.log('Error writing file:', err);
        } else {
            console.log('Data written to file');
        }
    });
}