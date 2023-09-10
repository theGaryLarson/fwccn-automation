import connectMongo from "../../../lib/connectMongo";
import Applicant from "../../../models/applicant_schema";
import { medianIncomeData } from "../../../models/medianIncomeData";

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addApplicant(req, res) {
    console.log(req.body.data.totalHouseholdIncome.incomeLevel);
    await connectMongo();
    const applicant = await Applicant.create(req.body.data);
    res.json(applicant);

}
