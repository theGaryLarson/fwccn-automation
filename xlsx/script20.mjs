import path, {dirname} from 'path';
import xlsx from 'xlsx';
import {fileURLToPath} from 'url'
import fs from 'fs';
import templateRecord, {adjustForTimeZone} from "./templateRecord.mjs";



const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

readAndTransformData('FWCCN', '2020')
function readAndTransformData(filename, year) {
    const filePath = path.resolve(__dirname, `${year}-Data-${filename}.xlsx`);
    const workbook = xlsx.readFile(filePath, {cellDates: true});
    const sheetNames = workbook.SheetNames;
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]])

    let previousDateOfService = null;
    const transformedData = data.map((clientRecord, index) => {
        let dateOfService = clientRecord['DATE OF SERVICE'] ?
            adjustForTimeZone(clientRecord['DATE OF SERVICE'])
            : new Date('1492-10-12').toISOString().replace(/T\d{2}/, 'T08');

        if (!dateOfService && index > 0) {
            dateOfService = null; // previousDateOfService;
        }

        const transformedRecord = transformRecord(clientRecord, dateOfService);
        previousDateOfService = null; // transformedRecord.dateOfService
        return transformedRecord;
    });
    fs.writeFileSync(`transformedData${year}.json`, JSON.stringify(transformedData, null, 2))

    function transformRecord(r, dateOfService) {
        const otherAdultsList = [];
        buildAdultJsonList(r['OTHER ADULTS 1'], otherAdultsList);
        buildAdultJsonList(r['OTHER ADULTS 2'], otherAdultsList);
        buildAdultJsonList(r['OTHER ADULTS 3'], otherAdultsList);
        buildAdultJsonList(r['OTHER ADULTS 4'], otherAdultsList);
        return {
            ...templateRecord,
            timestamp: createTimeStamp(),
            // DO NOT HAVE ENOUGH INFO TO DETERMINE DENIED/NO-RETURN OPTED FOR NO-RETURN LESS NEGATIVE CONNOTATION
            status: r['AMT']  ?  'APPROVED' : 'NO-RETURN',
            dateOfService: dateOfService,
            serviceDate: {
               $date: dateOfService // 2020 has a lot of missing CHECK # and DATE OF SERVICE fields
            },
            actionTaken: {
                ...templateRecord.actionTaken,
                actionNotes: r['NOTES'] ? '2020 EXCEL IMPORT\n\n' + r['NOTES'] + '\n\n' + templateRecord.actionTaken.actionNotes : templateRecord.actionTaken.actionNotes,
                promiseFilled: r['PROMISE FILLED'],
                amountPromised: r['PROMISE AMT.'],
                checkNumber: r['CHECK #'],
                checkAmount: r['AMT'],
                motelLocation: r["SERVICE"]?.trim() === 'MOTEL' ? r['APT/MOTEL NAME'] : '',
                motelDurationDays: r["TOTAL NIGHTS"] ? r["TOTAL NIGHTS"] : '',

            },
            helpRequested: r['SERVICE']?.trim() === 'RENT' ? 'rent' : (r['SERVICE']?.trim() === 'GAS' ? 'gasoline' : (r['SERVICE']?.trim() === 'BUS' ? 'busTicket' : (r['SERVICE']?.trim() === 'MOTEL' ? 'motel' : ''))),
            licensePlate: r['SERVICE']?.trim() === 'GAS' ? `[ NO DATA ]` : '',
            licensePlateState: r['SERVICE']?.trim() === 'GAS' ? 'WA' : '',
            isBusPrimaryTransport: r['SERVICE']?.trim() === 'BUS',
            reasonForNeed: `[EXCEL ${year} ENTRY. NO DATA]`,
            futurePlans: `[EXCEL ${year} ENTRY. NO DATA]`,
            fName: r['FNAME'],
            middleInitial: r['MI'],
            lName: r['LNAME'],
            applicantGender: `[EXCEL ${year} ENTRY. NO DATA]`,
            applicantAge: undefined,
            phone: `[NO DATA]`, // r['REMARKS/TELE. #'] ? r['REMARKS/TELE. #']?.split('-')[0] + r['REMARKS/TELE. #']?.split('-')[1] + r['REMARKS/TELE. #']?.split('-')[2] : '',
            idSource: {
                ...templateRecord.idSource,
                driverLicenseOrId: r['ID']?.length > 4 ? r['ID'] : `[EXCEL ${year} ENTRY. NO DATA]`,
                isValidLicense: r['SERVICE']?.trim() === 'GAS',
                socialSecLastFour: typeof r['ID'] === 'number' && String(r['ID']).length <= 4 ? String(r['ID']).padStart(4, '0') : '',
            },
            homelessness: {
                ...templateRecord.homelessness,
                isHomeless: !!r['HMLS'],
                tempAddress: !!r['HMLS'] ? {
                    ...templateRecord.homelessness.tempAddress,
                    street1: r['APT/MOTEL NAME']?.trim(),
                    street2: r['ADDRESS']?.trim(),
                    city: r['CITY']?.trim(),
                    zip: r['ZIP']
                } : {},
            },
            otherAdults: {
                ...templateRecord.otherAdults,
                isOtherAdultsAtResidence: !!r['OTHER ADULTS 1'] || !!r['OTHER ADULTS 2'] || !!r['OTHER ADULTS 3'] || !!r['OTHER ADULTS 4'],
                adults: otherAdultsList.length > 0 ? otherAdultsList : [],

            },
            homeAddress: !r['HMLS'] ? {
                ...templateRecord.homeAddress,
                aptName: r['APT/MOTEL NAME'],
                homeStreet1: r['ADDRESS'],
                homeCity: r['CITY'],
                homeZip: r['ZIP'],
                verified: !!r['CHECK #'] && r['SERVICE']?.trim() === 'RENT'
            } : {},
            landLord: {
                ...templateRecord.landLord,
                fullName: r['LANDLORD']
            },
            houseHoldIncome: {
                ...templateRecord.houseHoldIncome,
                percentOfAnnualAmi: r['INC BELOW 30'] ? Number(29) : (r['INC BELOW 40'] ? Number(39) : ''),
                isIncomeVerified: !!r['CHECK #'],
                incomeLevel: r['INC BELOW 30'] ? 'extremely low' : (r['INC BELOW 40'] ? 'low' : 'NO-DATA')
            },
            maleAgeRange: {
                zeroToFive: r['M0 to 5'],
                sixToTwelve: r['M6 to 12'],
                thirteenToSeventeen: r['M13 to 17'],
                eighteenToTwentyFour: r['M18 to 24'],
                twentyFiveToThirtyFour: r['M25 to 34'],
                thirtyFiveToFiftyFour: r['M35 to 54'],
                fiftyFiveToSeventyFour: r['M55 to 74'],
                seventyFiveToEightyFour: r['M75 to 84'],
                eightyFivePlus: r['M85+'],
                unknown: r['MUNKNOWN']
            },
            demographics: {
                totalMales: r['MALE'],
                totalFemales: r['FEMALE'],
                whiteOrCaucasian: r['WHT'],
                blackAfricanAmerican: r['BLK'],
                asianAsianAmerican: r['AS'],
                americanIndianOrAlaskaNative: r['IND/ASK'],
                nativeHawaiianPacificIslander: r['NAT HI/PI'],
                latinoAmericanHispanic: r['LAT'],
                americanIndianOrAlaskaNativeAndWhite: 0,
                asianAsianAmericanAndWhite: 0,
                blackAfricanAmericanAndWhite: 0,
                americanIndianOrAlaskaNativeAndBlackAfricanAmerican: 0,
                otherRace: r['OTHER'],
                multiRacial: r['MULTI'],
                unknown: r['RACE UNKNOWN']
            },
            femaleAgeRange: {
                zeroToFive: r['F0 to 5'],
                sixToTwelve: r['F6 to 12'],
                thirteenToSeventeen: r['F13 to 17'],
                eighteenToTwentyFour: r['F18 to 24'],
                twentyFiveToThirtyFour: r['F25 to 34'],
                thirtyFiveToFiftyFour: r['F35 to 54'],
                fiftyFiveToSeventyFour: r['F55 to 74'],
                seventyFiveToEightyFour: r['F75 to 84'],
                eightyFivePlus: r['F85+'],
                unknown: r['FUNKNOWN']
            }
        }
    }
    function createTimeStamp() {
        const pacificTimeDiff = 7 * 60 * 60 * 1000;
        return new Date(Date.now() - pacificTimeDiff)
            .toISOString().slice(0, 19)
            .replace('T', ' ');
    }

    function buildAdultJsonList(otherAdult, otherAdultsList) {
        if (otherAdult) {
            const fullName = otherAdult.split(',')
            otherAdultsList.push({
                adultFName: fullName[1]?.trim()?.split(' ')[0]?.trim(),
                adultMiddleInitial: fullName[1]?.trim()?.split(' ')[1]?.trim(),
                adultLName: fullName[0]?.trim(),
                adultGender: `[EXCEL ${year}. SEE SUMMARY IN DEMOGRAPHICS]`,
                adultAge: `[EXCEL ${year}. SEE SUMMARY IN DEMOGRAPHICS]`,
                relationshipToAdult: `[EXCEL ${year}. NO DATA]`,
                relationDetails: `[EXCEL ${year}. NO DATA]`
            })
        }
    }
}

