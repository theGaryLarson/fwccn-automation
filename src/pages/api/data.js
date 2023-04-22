import clientPromise from "../../../lib/mongodb";


export default async function handler(req, res) {
    const { dbType } = req.body;

    let result;
    try {
        // todo: update sql insert statement iteratively as front end matures
        if (dbType === "mysql") {
            // const sql =
            //     `INSERT INTO applicants (
            //             timestamp,
            //             status,
            //             f_name,
            //             l_name,
            //             social_sec_last_four,
            //             last_help_date,
            //             household_income)
            //     VALUES (?, ?, ?, ?, ?, ?, ?)`;
            // const params = [
            //     new Date(req.body.data.timeStamp),
            //     req.body.data.status,
            //     req.body.data.fName,
            //     req.body.data.lName,
            //     req.body.data.socialSecLastFour,
            //     req.body.data.lastHelpDate,
            //     req.body.data.monthlyHouseholdIncome,
            // ];
            //
            // await connection.execute(sql, params);
            // connection.commit();
            // result = "Successfully inserted data into MySQL database";
        } else if (dbType === "mongodb") {

            try {
                const client = await clientPromise;
                const db = client.db(process.env.MONGO_DB);
                await db.collection(process.env.MONGO_DB_COL).insertOne(req.body.data);
            } catch (e) {
                console.error(e);
            }
            result = "Successfully inserted applicant info into MongoDB database";
        } else {
            return res.status(400).send("Invalid database type");
        }
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
