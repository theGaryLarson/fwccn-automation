import connectMongo from "../../../lib/connectMongo";
import Applicant from "../../../models/applicant_schema";

export default async function updateApplicantRecord(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }
    await connectMongo();
    const { retrieveAll, firstName, lastName, lastFour, driverLicenseOrId, homeStreet1, homeStreet2, homeZip } = req.body;

    // Build our search condition
    const condition = [];
    const nameConditions = [];
    const otherConditions = {};

    if (firstName && firstName !== "") {
        nameConditions.push({ "$or": [
                { "fName": { $regex: new RegExp(`^${firstName}$`, 'i') } },
                { "otherNames.additionalNames.otherFirstName": { $regex: new RegExp(`^${firstName}$`, 'i') } },
                { "otherAdults.adults.adultFName": { $regex: new RegExp(`^${firstName}$`, 'i') } },
            ]});
    }

    if (lastName && lastName !== "") {
        nameConditions.push({ "$or": [
                { "lName": { $regex: new RegExp(`^${lastName}$`, 'i') } },
                { "otherNames.additionalNames.otherLastName": { $regex: new RegExp(`^${lastName}$`, 'i') } },
                { "otherAdults.adults.adultLName": { $regex: new RegExp(`^${lastName}$`, 'i') } }, // New condition
            ]});
    }

    if (nameConditions.length > 0) {
        otherConditions["$and"] = nameConditions;
    }

    if (lastFour && lastFour !== "") {
        otherConditions["idSource.socialSecLastFour"] = lastFour;
    }
    if (driverLicenseOrId && driverLicenseOrId !== "") {
        otherConditions["idSource.driverLicenseOrId"] = driverLicenseOrId;
    }

    if (homeStreet1 && homeStreet1 !== "") {
        otherConditions["homeAddress.homeStreet1"] = homeStreet1;
    }
    if (homeStreet2 && homeStreet2 !== "") {
        otherConditions["homeAddress.homeStreet2"] = homeStreet2;
    }
    if (homeZip && homeZip !== "") {
        otherConditions["homeAddress.homeZip"] = homeZip;
    }

    if (Object.keys(otherConditions).length > 0) {
        condition.push(otherConditions);
    }

    // Find applicants based on the built condition
    if (retrieveAll === "yes" || condition.length > 0) {
        const query = retrieveAll === "yes" ? {} : { "$and": condition };
        const retrievedRecords = await Applicant.find(query).exec();
        retrievedRecords.sort((a, b) => {
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
