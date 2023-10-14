// src/pages/api/delete/[id].js
import connectMongo from "../../../lib/connectMongo";
import Applicant from "../../../models/applicant_schema";

export default async function deleteRecordById(req, res) {
    const id = req.body.data; // Retrieve ID from URL query
    console.log('id: ', req.body.data);
    await connectMongo();

    try {
        const applicant = await Applicant.findByIdAndDelete(id);
        if (!applicant) {
            return res.status(404).json({ message: 'Applicant not found' });
        }
        res.status(200).json(applicant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
