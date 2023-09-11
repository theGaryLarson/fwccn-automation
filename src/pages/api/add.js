import connectMongo from "../../../lib/connectMongo";
import Applicant from "../../../models/applicant_schema";
import {
    getIncomeCategory,
    getKingAnnualIncomeCategory,
    getPercentOfKingAMI
} from "../../../models/monthlyMedianIncomeData";

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addApplicant(req, res) {
    const application = req.body.data;
    const year = new Date(application.timestamp.slice(0, 10)).getFullYear();
    const annualHouseholdIncome = application.houseHoldIncome.houseHoldIncomePastYear;
    const familySize = application.houseHoldIncome.totalSupportMembers;
    console.log('familySize', familySize, 'year: ', year, "monthlyIncome: ", annualHouseholdIncome);
    if (familySize && annualHouseholdIncome) {
        application.houseHoldIncome = {
            ...application.houseHoldIncome,
            incomeLevel: getKingAnnualIncomeCategory(year, annualHouseholdIncome, familySize),
            percentOfAnnualAmi: getPercentOfKingAMI(year, familySize, annualHouseholdIncome)
        };
    }
    await connectMongo();
    const applicant = await Applicant.create(application);
    res.json(applicant);

}
