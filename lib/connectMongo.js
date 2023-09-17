import mongoose from "mongoose";
let connectMongo;

    if(!connectMongo) {
        connectMongo = async () => mongoose.connect(process.env.DB_URI);
        console.log("-------------------");
        console.log("CONNECTING TO MONGO");
        console.log("-------------------");
    }




export default connectMongo;
