import path, {dirname} from 'path';
import xlsx from 'xlsx';
import {fileURLToPath} from 'url'
import fs from 'fs';
import templateRecord23 from "./templateRecord23.mjs";



const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const filePath = path.resolve(__dirname,"2023-Data-FWCCN.csv");
const workbook = xlsx.readFile(filePath, {cellDates: true });
const sheetNames = workbook.SheetNames;
const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]])

function transformRecord2023(r) {
    const otherAdultsList = [];
    buildAdultJsonList(r['OTHER ADULTS 1'], otherAdultsList);
    buildAdultJsonList(r['OTHER ADULTS 2'], otherAdultsList);
    buildAdultJsonList(r['OTHER ADULTS 3'], otherAdultsList);
    buildAdultJsonList(r['OTHER ADULTS 4'], otherAdultsList);
    return {
        ...templateRecord23,
        timestamp: createTimeStamp(),
        // DO NOT HAVE ENOUGH INFO TO DETERMINE DENIED/NO-RETURN OPTED FOR NO-RETURN LESS NEGATIVE CONNOTATION
        status: r['PROMISE FILLED'] ? 'APPROVED' : 'NO-RETURN',
        dateOfService: r['DATE OF SERVICE']?.toISOString().split('T')[0],
        actionTaken: {
            ...templateRecord23.actionTaken,
            promiseFilled: r['PROMISE FILLED'],
            amountPromised: r['PROMISE AMT.']?.trim(),
            checkNumber: r['CHECK #'],
            checkAmount: r['RENT'] ? r['AMT RENT PAID'] : (r['GAS'] ? r['AMT GAS'] : (r['MOTEL'] ? r['AMT MOTEL'] : (r['BUS'] ? r['AMT BUS'] : 0))),
            motelLocation: r["MOTEL"] ? r["MOTEL"] : '',
            motelDurationDays: r["MOTEL"] ? r["TOTAL NIGHTS"] : '',

        },
        helpRequested: r['RENT'] ? 'rent' : (r['GAS'] ? 'gasoline' : (r['MOTEL'] ? 'motel' : (r['BUS'] ? 'busTicket' : 0))),
        licensePlate: r['GAS'] ? '[EXCEL 2023 ENTRY. NO DATA]' : '',
        licensePlateState: r['GAS'] ? 'WA' : '',
        isBusPrimaryTransport: !!r['BUS'],
        reasonForNeed: '[EXCEL 2023 ENTRY. NO DATA]',
        futurePlans: '[EXCEL 2023 ENTRY. NO DATA]',
        fName: r['FNAME'],
        middleInitial: r['MI'],
        lName: r['LNAME'],
        applicantGender: '[EXCEL 2023 ENTRY. NO DATA]',
        applicantAge: undefined,
        phone: r['REMARKS/TELE. #'] ? r['REMARKS/TELE. #']?.split('-')[0] + r['REMARKS/TELE. #']?.split('-')[1] + r['REMARKS/TELE. #']?.split('-')[2] : '',
        idSource: {
            ...templateRecord23.idSource,
            driverLicenseOrId: r['ID'] ? r['ID'] : '[EXCEL 2023 ENTRY. NO DATA]',
            isValidLicense: !!r['GAS'],
        },
        homelessness: {
            ...templateRecord23.homelessness,
            isHomeless: !!r['HMLS'],
            tempAddress: r['HMLS'] ? {
                ...templateRecord23.homelessness.tempAddress,
                street1: r['ADDRESS']?.trim(),
                city: r['CITY']?.trim(),
                zip: r['ZIP']
            } : {},
        },
        otherAdults: {
            ...templateRecord23.otherAdults,
            isOtherAdultsAtResidence: !!r['OTHER ADULTS 1'] || !!r['OTHER ADULTS 2'] || !!r['OTHER ADULTS 3'] || !!r['OTHER ADULTS 4'],
            adults: otherAdultsList.length > 0 ? otherAdultsList : [],

        },
        homeAddress: !r['HMLS'] ? {
            ...templateRecord23.homeAddress,
            aptName: r['APT/MOTEL NAME'],
            homeStreet1: r['ADDRESS'],
            homeCity: r['CITY'],
            homeZip: r['ZIP'],
            verified: !!r['AMT RENT PAID']
        } : {},
        landLord: {
            ...templateRecord23.landLord,
            fullName: r['LANDLORD']
        },
        houseHoldIncome: {
            ...templateRecord23.houseHoldIncome,
            percentOfAnnualAmi: r['INC BELOW 30'] ? '< 30' : (r['INC BELOW 40'] ? '< 40' : ''),
            isIncomeVerified: !!r['PROMISE FILLED']
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
            asianAsianAmerican: 0,
            americanIndianOrAlaskaNative: 0,
            nativeHawaiianPacificIslander: r['NAT HI/PI'],
            latinoAmericanHispanic: r['LAT'],
            americanIndianOrAlaskaNativeAndWhite: r['IND/ASK'],
            asianAsianAmericanAndWhite: r['AS'],
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
 const transformedData2023 = data.map( clientRecord => {
     return transformRecord2023(clientRecord);
});
fs.writeFileSync('transformedData2023.json', JSON.stringify(transformedData2023, null, 2))



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
            adultGender: '[EXCEL 2023. SEE SUMMARY IN DEMOGRAPHICS]',
            adultAge: '[EXCEL 2023. SEE SUMMARY IN DEMOGRAPHICS]',
            relationshipToAdult: '[EXCEL 2023. NO DATA]',
            relationDetails: '[EXCEL 2023. NO DATA]'
        })
    }
}

