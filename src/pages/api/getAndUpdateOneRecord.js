import connectMongo from "../../../lib/connectMongo";
import Applicant from "../../../models/applicant_schema";

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
    console.log("_id: ", _id);
    const condition = { "_id": _id };

    try {
        const existingRecord = await Applicant.findOne(condition);
        if (!existingRecord) {
            return res.status(404).json({ message: "Record not found", error: true });
        }

        const updatedRecord = {
            ...existingRecord._doc,
            ...updateData
        };
        const updateResult = await Applicant.updateOne(condition, updatedRecord);

        if (updateResult.nModified === 0) {
            return res.status(400).json({ message: "No changes were made", error: true });
        }

        res.json({ message: "Record updated successfully", record: updatedRecord });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while updating the record", error: true, details: error.message });
    }
}

