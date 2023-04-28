// import clientPromise from "../../../lib/mongodb";
//
//
// export default async function handler(req, res) {
//     const { dbType } = req.body;
//
//
//     try {
//             // todo: get mongo working on deployed server.
//             try {
//                 const client = await clientPromise;
//                 const db = client.db("fwccn_applicants");
//                 await db.collection("gary_test").insertOne(req.body.data);
//             } catch (e) {
//                 console.error(e);
//             }
//
//         res.status(200).json("Successfully Inserted!");
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Internal Server Error");
//     }
// }
