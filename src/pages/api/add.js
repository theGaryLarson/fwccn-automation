import connectMongo from "../../../lib/connectMongo";
import Applicant from "../../../models/applicant_schema";

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addApplicant(req, res) {
    await connectMongo();
    const applicant = await Applicant.create(req.body.data);
    res.json(applicant);

}
