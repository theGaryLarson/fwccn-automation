import connectMongo from "../../../lib/connectMongo";
import Applicant from "../../../models/applicant_schema";

export default async function updateApplicantRecord(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }
    await connectMongo();
    const { retrieveAll, firstName, lastName, lastFour, driverLicenseOrId, homeStreet1, homeStreet2, homeZip } = req.body;

    // Build our search condition
    const condition = { $and: []};
    const nameConditions = [];

    if (firstName) {
        nameConditions.push({ "$or": [
                { "fName": { $regex: new RegExp(`${firstName}`, 'i') } },
                { "otherNames.additionalNames.otherFirstName": { $regex: new RegExp(`${firstName}`, 'i') } },
                { "otherAdults.adults.adultFName": { $regex: new RegExp(`${firstName}`, 'i') } },
            ]});
    }
    if (lastName) {
        nameConditions.push({ "$or": [
                { "lName": { $regex: new RegExp(`${lastName}`, 'i') } },
                { "otherNames.additionalNames.otherLastName": { $regex: new RegExp(`${lastName}`, 'i') } },
                { "otherAdults.adults.adultLName": { $regex: new RegExp(`${lastName}`, 'i') } }, // New condition
            ]});
    }
    if (nameConditions.length > 0) {
        condition.$and.push({ $and: nameConditions });
    }
    if (lastFour) {
        condition.$and.push({ "idSource.socialSecLastFour": lastFour });
    }
    if (driverLicenseOrId) {
        condition.$and.push({ "idSource.driverLicenseOrId": driverLicenseOrId });
    }
    if (homeStreet1) {
        condition.$and.push({ "homeAddress.homeStreet1": homeStreet1 });
    }
    if (homeStreet2) {
        condition.$and.push({ "homeAddress.homeStreet2": homeStreet2 });
    }
    if (homeZip) {
        condition.$and.push({ "homeAddress.homeZip": homeZip });
    }

    // Find applicants based on the built condition
    if (retrieveAll === "yes" || condition.$and.length > 0) {
        const query = retrieveAll === "yes" ? {} : condition;
        // console.log('Query: ', JSON.stringify(query, regexReplacer, 2));
        const retrievedRecords = await Applicant.find(query).exec();
        retrievedRecords.sort((a, b) => {

            // Place records with 'NO-RETURN' status at the bottom
            if (a.status === 'NO-RETURN' && b.status !== 'NO-RETURN') {
                return 1;
            }
            if (b.status === 'NO-RETURN' && a.status !== 'NO-RETURN') {
                return -1;
            }

            const dateA = new Date(a.dateOfService);
            const dateB = new Date(b.dateOfService);

            if (isNaN(Date.parse(a.dateOfService))) {
                return -1;
            }
            if (isNaN(Date.parse(b.dateOfService))) {
                return 1;
            }

            // Primary sorting by dateOfService
            const dateDifference = dateB - dateA;
            if (dateDifference !== 0) {
                return dateDifference;
            }

            // Secondary sorting by timestamp
            const timestampA = new Date(a.timestamp);
            const timestampB = new Date(b.timestamp);

            return timestampB - timestampA;
        });
        res.json(retrievedRecords);
    } else {
        res.json([])
    }
}
