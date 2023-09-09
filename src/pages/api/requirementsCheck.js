import connectMongo from "../../../lib/connectMongo";
import Applicant from "../../../models/applicant_schema";

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function validateApplicantRecord(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }
    await connectMongo();
    const { retrieveAll, firstName, lastName, lastFour, driverLicenseOrId, homeStreet1, homeStreet2, homeZip } = req.body;

    // Build our search condition
    const condition = {};

    if (firstName && firstName !== "") {
        condition["fName"] = firstName;
    }
    if (lastName && lastName !== "") {
        condition["lName"] = lastName;
    }
    if (lastFour && lastFour !== "") {
        condition["idSource.socialSecLastFour"] = lastFour;
    }
    if (driverLicenseOrId && driverLicenseOrId !== "") {
        condition["idSource.driverLicenseOrId"] = driverLicenseOrId;
    }

    if (homeStreet1 && homeStreet1 !== "") {
        condition["homeAddress.homeStreet1"] = homeStreet1;
    }
    if (homeStreet2 && homeStreet2 !== "") {
        condition["homeAddress.homeStreet2"] = homeStreet2;
    }
    if (homeZip && homeZip !== "") {
        condition["homeAddress.homeZip"] = homeZip;
    }
    // console.log("qry", condition);
    // Find applicants based on the built condition
    if (retrieveAll === "yes" || Object.keys(condition).length > 0) {
        const retrievedRecords = await Applicant.find(condition).exec();
        retrievedRecords.sort((a, b) => {
            const dateA = new Date(a.dateOfService);
            const dateB = new Date(b.dateOfService);

            if (isNaN(dateA)) {
                return -1; // or some other logic to handle invalid dates
            }
            if (isNaN(dateB)) {
                return 1; // or some other logic to handle invalid dates
            }

            return dateB - dateA;
        });
        res.json(retrievedRecords);
    } else {
        res.json([])
    }
}

