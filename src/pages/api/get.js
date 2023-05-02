import Applicant from "../../../models/applicant_schema";

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function getApplicant(req, res) {
    const { id } = req.query;
    try {
        const applicant = await Applicant.findById(id).exec();
        if (applicant) {
            console.log(`RETRIEVED APPLICANT WITH ID: ${id}`);
        }
        console.log(applicant)
        res.json(applicant);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}