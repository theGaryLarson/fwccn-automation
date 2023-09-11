import connectMongo from "../../../lib/connectMongo";
import Applicant from "../../../models/applicant_schema";
import { getIncomeCategory } from "../../../models/monthlyMedianIncomeData";

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addApplicant(req, res) {
    const application = req.body.data;
    const year = new Date(application.timestamp.slice(0, 10)).getFullYear();
    const monthlyHouseholdIncome = application.houseHoldIncome.totalHouseholdIncome;
    const familySize = application.houseHoldIncome.totalSupportMembers;
    console.log(year, monthlyHouseholdIncome, familySize);
    if ( monthlyHouseholdIncome && familySize) {
        application.houseHoldIncome = {
            ...application.houseHoldIncome,
            incomeLevel: getIncomeCategory(year, monthlyHouseholdIncome, familySize),
        };
    }
    await connectMongo();
    const applicant = await Applicant.create(application);
    res.json(applicant);

}
