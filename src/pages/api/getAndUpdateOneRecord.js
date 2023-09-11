import connectMongo from "../../../lib/connectMongo";
import Applicant from "../../../models/applicant_schema";
import {
    getKingAnnualIncomeCategory,
    getPercentOfKingAMI
} from "../../../models/monthlyMedianIncomeData";

/**
*
* @param {import('next').NextApiRequest} req
* @param {import('next').NextApiResponse} res
*/
export default async function getAndUpdateOneRecord(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    await connectMongo();
    const { _id } = req.body;
    const updateData = req.body;

    try {
        // Fetch the existing record to calculate the new income level
        const existingRecord = await Applicant.findById(_id);
        if (!existingRecord) {
            return res.status(404).json({ message: "Record not found", error: true });
        }

        // Calculate the new income level
        const year = new Date(updateData.timestamp.slice(0, 10)).getFullYear();
        const annualHouseholdIncome = updateData.houseHoldIncome.houseHoldIncomePastYear;
        const familySize = updateData.houseHoldIncome.totalSupportMembers;
        // console.log('familySize', familySize, 'year: ', year, "monthlyIncome: ", annualHouseholdIncome);
        if (familySize && annualHouseholdIncome) {
            updateData.houseHoldIncome = {
                ...updateData.houseHoldIncome,
                incomeLevel: getKingAnnualIncomeCategory(year, annualHouseholdIncome, familySize),
                percentOfAnnualAmi: getPercentOfKingAMI(year, familySize, annualHouseholdIncome)
            };
        }


        const updatedRecord = await Applicant.findByIdAndUpdate(_id, updateData, { new: true });
        if (!updatedRecord) {
            return res.status(400).json({ message: "No changes were made", error: true, record: 'none' });
        }

        res.json({ message: "Record updated successfully", record: updatedRecord });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while updating the record", error: true, details: error.message });
    }
}


