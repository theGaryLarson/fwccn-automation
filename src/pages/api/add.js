import connectMongo from "../../../lib/connectMongo";
import Applicant from "../../../models/applicant_schema";

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addApplicant(req, res) {
    await connectMongo();
    console.log('CONNECTED TO MONGO');
    console.log('CREATING DOCUMENT FOR ' + req.body.data.fName.toUpperCase());
    const applicant = await Applicant.create(req.body.data);
    console.log('CREATED DOCUMENT');
    res.json(applicant);

}
