import connection from './../../../database/sql';
import client from './../../../database/mongodb';

export default async function handler(req, res) {
    const { dbType } = req.query;

    let result;

    if (dbType === 'sql') {
        const [rows] = await connection.query('SELECT * FROM applicants');
        result = rows;
    } else if (dbType === 'mongodb') {
        await client.connect();
        const collection = client.db('sample_mflix').collection('movies');
        result = await collection.find().toArray();
    } else {
        return res.status(400).send('Invalid database type');
    }

    res.status(200).json(result);
}
