import connectMongo from "../../../lib/connectMongo";
import Applicant from "../../../models/applicant_schema";

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function getApplicant(req, res) {
    const { id } = req.query;
    await connectMongo();
    console.log('CONNECTED TO MONGO');
    console.log(`RETRIEVING APPLICANT WITH ID: ${id}`);
    const applicant = await Applicant.findById(id);
    console.log(`RETRIEVED APPLICANT WITH ID: ${id}`);
    res.json(applicant);
}