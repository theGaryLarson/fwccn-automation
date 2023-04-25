import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI, {maxPoolSize: 10});

module.exports = client;