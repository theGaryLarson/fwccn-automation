import connectMongo from "../../../lib/connectMongo";
import Applicant from "../../../models/applicant_schema";
import {checkEligibility, groupFilteredRecords} from "../../../lib/util"

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
    const { driverLicenseOrId, homeStreet1, homeStreet2, homeZip } = req.body;

    // Build our search condition
    const condition = {};

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
    // fixme: need different logic if condition is {} which returns all records.
    //  Current code assumes returning duplicates.
    //  Also, fetches all data on load
    // Find applicants based on the built condition
    const duplicateRecords = await Applicant.find(condition).exec();
    console.log("/api/reqCheckL40\n    fix returned records: \n", duplicateRecords.length)
    // Build Requirements object
    let responseFlags = {
        addressDuplicates: { flag: false, records: [] },
        stateIdDuplicates: { flag: false, records: [] },
        helpLast2Years: { flag: false },
        help2TimesLast4Years: { flag: false }
    };

    // Set today's Date for time limits
    const today = new Date();

    // build address for key comparison
    const street1 = homeStreet1 || ""
    const street2 = homeStreet2 || ""
    const zip = homeZip || ""
    const address = `${street1}${street2}${zip}`
    const targetStateId = driverLicenseOrId !== "" ? driverLicenseOrId : undefined;
    const targetAddress = address !== "" ? address : undefined;


    // Group the applicants by their home address or state ID
    const groupedRecords = groupFilteredRecords(targetStateId, targetAddress,duplicateRecords);
    // flag duplicate applicants check for eligibility
    if (groupedRecords.idGroup) {
        responseFlags.stateIdDuplicates.flag = true;
        responseFlags.stateIdDuplicates.records = groupedRecords.idGroup;
        responseFlags = {
            ...responseFlags,
            ...checkEligibility(duplicateRecords, today,  true)
        }
    }

    // flag multiple addresses check for eligibility
    if (groupedRecords.addressGroup) {
        responseFlags.addressDuplicates.flag = true;
        responseFlags.addressDuplicates.records = groupedRecords.addressGroup;
        responseFlags = {
            ...responseFlags,
            ...checkEligibility(duplicateRecords, today,  false)
        }

    }
    res.json(responseFlags);
}

