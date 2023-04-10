import connection from './../../../database/sql';
import client from './../../../database/mongodb';


export default async function handler(req, res) {
    const { dbType } = req.body;

    let result;
    try {
        // todo: update sql insert statement iteratively as front end matures
        if (dbType === "mysql") {
            const sql =
                `INSERT INTO applicants (
                        timestamp,
                        f_name,
                        l_name,
                        social_sec_last_four,
                        last_help_date,
                        household_income)
                VALUES (?, ?, ?, ?, ?, ?)`;
            const params = [
                new Date().toISOString().slice(0, 19).replace('T', ' '),
                req.body.data.fName,
                req.body.data.lName,
                req.body.data.socialSecLastFour,
                req.body.data.lastHelpDate,
                req.body.data.householdIncome,
            ];

            await connection.execute(sql, params);
            connection.commit();
            result = "Successfully inserted data into MySQL database";
        } else if (dbType === "mongodb") {
            // optimize: discuss whether database/collection should be hardcoded are given as an argument is this
            //  a security concern?
            await client.connect();
            // need to assign collection from req.body collection
            const col = client.db(req.body.database).collection(req.body.collection)
            await col.insertOne(req.body.data);
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
