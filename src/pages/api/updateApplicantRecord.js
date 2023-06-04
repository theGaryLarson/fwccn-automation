// import connectMongo from "../../../lib/connectMongo";
// import Applicant from "../../../models/applicant_schema";

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
    const { driverLicenseOrId, timestamp } = req.body;
    const item = req.body

    const condition = {
        "idSource.driverLicenseOrId": driverLicenseOrId,
        "timestamp": timestamp
    };

    const updateData = {
        ...item
    };
    console.log("updateData: ", updateData)
    res.json({
        test: "test"
    })
    // try {
    //     const existingRecord = await Applicant.findOne(condition);
    //
    //     if (existingRecord) {
    //         console.log("_doc: \n", existingRecord/*._doc*/)
    //         const updatedRecord = { ...existingRecord/*._doc*/, ...updateData };
    //         console.log("updated_record:\n", updatedRecord)
    //         await Applicant.updateOne(condition, updatedRecord);
    //
    //         res.json({ message: "Record updated successfully" });
    //     } else {
    //         await Applicant.create(updateData);
    //
    //         res.json({ message: "Record created successfully" });
    //     }
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: "An error occurred while updating/creating the record" });
    // }
}
