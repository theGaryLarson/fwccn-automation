import path, {dirname} from 'path';
import xlsx from 'xlsx';
import {fileURLToPath} from 'url'
import fs from 'fs';
import templateRecord, {adjustForTimeZone} from "./templateRecord.mjs";

/*
REMEMBER THIS WAS ALTERED FOR CATCH UP DATA AFTER 9/5/2023

TIMESTAMP WAS REPLACED WITH ACTUAL DATE OF ENTRY

STATUS WAS TRANSFERRED OVER RATHER THAN INFERRED FROM DATA

DATE OF SERVICE IS LEFT EMPTY SO IT DOES NOT GET POPULATED WITH 10-12-1492 FILLER DATE INSTEAD IT SAYS
AWAITING SERVICE IN THE UI.

FILE THAT IS SAVED HAS DIFFERENT NAMING CONVENTION
 */

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

readAndTransformData('CATCHUPFWCCN', '2023')
function readAndTransformData(filename, year) {
    const filePath = path.resolve(__dirname, `${year}-Data-${filename}.xlsx`);
    const workbook = xlsx.readFile(filePath, {cellDates: true});
    const sheetNames = workbook.SheetNames;
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]])

    let previousDateOfService = null;
    const transformedData = data.map((clientRecord) => {
        let dateOfService = clientRecord['DATE OF SERVICE'] ?
            adjustForTimeZone(clientRecord['DATE OF SERVICE'])
            : ""; //new Date('1492-10-12').toISOString().replace(/T\d{2}/, 'T12');

        // if (!dateOfService && index > 0) {
        //     dateOfService = null; // previousDateOfService
        // }

        const transformedRecord = transformRecord(clientRecord, dateOfService);
        previousDateOfService = null; // transformedRecord.dateOfService
        return transformedRecord;
    });
    fs.writeFileSync(`CatchUpData${year}.json`, JSON.stringify(transformedData, null, 2))

    function transformRecord(r, dateOfService) {
        const otherAdultsList = [];
        buildAdultJsonList(r['OTHER ADULTS 1'], otherAdultsList);
        buildAdultJsonList(r['OTHER ADULTS 2'], otherAdultsList);
        buildAdultJsonList(r['OTHER ADULTS 3'], otherAdultsList);
        buildAdultJsonList(r['OTHER ADULTS 4'], otherAdultsList);
        return {
            ...templateRecord,
            timestamp: createTimeStampFromExcel(r['DATE OF ENTRY']),
            // DO NOT HAVE ENOUGH INFO TO DETERMINE DENIED/NO-RETURN OPTED FOR NO-RETURN LESS NEGATIVE CONNOTATION
            status: r['STATUS'],/*(r['RENT'] && r['CHECK #'] && r['AMT RENT PAID'] > 0)
            || (r['GAS'] && r['AMT GAS'] > 0)
            || (r['MOTEL'] && r['AMT MOTEL'] > 0)
            || (r['BUS'] && r['AMT BUS'] > 0)
                ? 'APPROVED'
                : 'NO-RETURN',*/
            dateOfService: dateOfService,
            serviceDate: {
                $date: dateOfService
            },
            actionTaken: {
                ...templateRecord.actionTaken,
                promiseFilled: r['PROMISE FILLED'],
                amountPromised: r['PROMISE AMT.'],
                checkNumber: r['CHECK #'],
                checkAmount: (!!r['RENT'] && r['AMT RENT PAID'] > 0)
                    ? r['AMT RENT PAID']
                    : (!!r['GAS'] && r['AMT GAS'] > 0
                        ? r['AMT GAS']
                        : (!!r['MOTEL'] && r['AMT MOTEL'] > 0
                            ? r['AMT MOTEL']
                            : (!!r['BUS'] && r['AMT BUS'] > 0
                                ? r['AMT BUS']
                                : 0))),
                motelLocation: r["MOTEL"] ? r["MOTEL"] : '',
                motelDurationDays: r["MOTEL"] ? r["TOTAL NIGHTS"] : '',
                actionNotes: r['NOTES']
                    ? '2023 EXCEL IMPORT\n\n' + r['NOTES'] + '\n\n' + templateRecord.actionTaken.actionNotes
                    : '2023 EXCEL IMPORT\n\n' + templateRecord.actionTaken.actionNotes
            },
            helpRequested: r['RENT']
                ? 'rent'
                : (r['GAS']
                    ? 'gasoline'
                    : (r['MOTEL']
                        ? 'motel'
                        : (r['BUS']
                            ? 'busTicket'
                            : ''))),
            licensePlate: r['GAS'] ? `[EXCEL ${year} ENTRY. NO DATA]` : '',
            licensePlateState: r['GAS'] ? 'WA' : '',
            isBusPrimaryTransport: !!r['BUS'] && !!r['AMT BUS'],
            reasonForNeed: `[EXCEL ${year} ENTRY. NO DATA]`,
            futurePlans: `[EXCEL ${year} ENTRY. NO DATA]`,
            fName: r['FNAME'] ? r['FNAME'] : '',
            middleInitial: r['MI'],
            lName: r['LNAME'] ? r['LNAME'] : '',
            applicantGender: `[EXCEL ${year} ENTRY. NO DATA]`,
            applicantAge: undefined,
            phone: r['REMARKS/TELE. #'] ? r['REMARKS/TELE. #']?.split('-')[0] + r['REMARKS/TELE. #']?.split('-')[1] + r['REMARKS/TELE. #']?.split('-')[2] : '',
            idSource: {
                ...templateRecord.idSource,
                driverLicenseOrId: r['ID']?.toString().length > 4 ? r['ID'].toString().toUpperCase() : `[EXCEL ${year} ENTRY. NO DATA]`,
                isValidLicense: !!r['GAS'] && !!r['AMT GAS'],
                socialSecLastFour: typeof r['ID'] === 'number' && String(r['ID']).length <= 4 ? String(r['ID']).padStart(4, '0') : '',
            },
            homelessness: {
                ...templateRecord.homelessness,
                isHomeless: !!r['HMLS'],
                tempAddress: r['HMLS'] ? {
                    ...templateRecord.homelessness.tempAddress,
                    aptName: r['APT/MOTEL NAME'],
                    street1: r['ADDRESS']?.trim(),
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
                verified: !!r['AMT RENT PAID']
            } : {},
            landLord: {
                ...templateRecord.landLord,
                fullName: r['LANDLORD']
            },
            houseHoldIncome: {
                ...templateRecord.houseHoldIncome,
                percentOfAnnualAmi: r['INC BELOW 30'] ? Number(29) : (r['INC BELOW 40'] ? Number(39) : ''),
                isIncomeVerified: (!!r['RENT'] && !!r['CHECK #'])
                    || !!(r['GAS'] && r['AMT GAS'] > 0)
                    || !!(r['MOTEL'] && r['AMT MOTEL'] > 0)
                    || !!(r['BUS'] && r['AMT BUS'] > 0),
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

    function createTimeStampFromExcel(dateOfEntry) {
        const pacificTimeDiff = 7 * 60 * 60 * 1000;
        return new Date(dateOfEntry - pacificTimeDiff)
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

