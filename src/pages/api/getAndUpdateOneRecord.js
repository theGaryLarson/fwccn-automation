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

    // await connectMongo();
    const { _id } = req.body;
    const updateData = req.body
    console.log("_id: ", _id)
    const condition = {
        "_id": _id,
    };

    try {
        const existingRecord = await Applicant.findOne(condition);
        if (existingRecord) {
            console.log("_doc: \n", existingRecord?._doc)
            const updatedRecord = {
                ...existingRecord?._doc,
                ...updateData
            };
            console.log("updated_record:\n", updatedRecord)
            await Applicant.updateOne(condition, updatedRecord);

            res.json({ message: "Record updated successfully", record: updatedRecord });
        } else {
            // await Applicant.create(updateData);
            //
            // res.json({ message: "Record created successfully" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while updating/creating the record" });
    }
}
