import connectMongo from "../../../lib/connectMongo";
import Applicant from "../../../models/applicant_schema";

export default async function getByAddress(req, res) {
    await connectMongo();
    console.log('CONNECTED TO MONGO');
    console.log('RETRIEVING DOCS BY ADDRESS');

    try {
        const formsByAddress = await Applicant.find({
                "homeAddress.homeStreet1": req.query.homeStreet1
        }).exec();

        res.status(200).json(formsByAddress);
        // console.log('RETRIEVED DOCUMENTS BY ADDRESS\n', formsByAddress);
        console.log(`RECEIVED ${formsByAddress.length} DOCS BY ADDRESS`)
    } catch (error) {
        console.error('ERROR RETRIEVING DOCUMENTS:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
