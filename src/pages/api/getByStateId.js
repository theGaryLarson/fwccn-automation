import connectMongo from "../../../lib/connectMongo";
import Applicant from "../../../models/applicant_schema";

export default async function getByAddress(req, res) {
    await connectMongo();
    console.log('CONNECTED TO MONGO');
    console.log('RETRIEVING DOCS BY STATE ID');

    try {
        console.log("req_query: ", req.query.driverLicenseOrId)
        const formsByAddress = await Applicant.find({
            "idSource.driverLicenseOrId": req.query.driverLicenseOrId
        }).exec();

        res.status(200).json(formsByAddress);
        // console.log('RETRIEVED DOCUMENTS BY ADDRESS\n', formsByAddress);
        console.log("RECEIVED DOCS BY STATE ID")
    } catch (error) {
        console.error('ERROR RETRIEVING DOCUMENTS:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
