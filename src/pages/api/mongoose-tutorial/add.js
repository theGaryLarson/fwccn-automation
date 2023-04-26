import connectMongo from "../../../../utils/connectMongo";
import Applicant from "../../../../models/applicant_schema";

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addApplicant(req, res) {
    const {fName, lName} = req.body;
    await connectMongo();
    console.log('CONNECTED TO MONGO');
    console.log('CREATING DOCUMENT');
    const applicant = await Applicant.create(req.body);
    console.log('CREATED DOCUMENT');
    res.json(applicant);

}
