// tutorial file to connect to mongodb with mongoose
import mongoose from "mongoose";
let connectMongo;

    if(!connectMongo) {
        connectMongo = async () => mongoose.connect(process.env.MONGODB_URI);
        console.log("-------------------");
        console.log("CONNECTING TO MONGO");
        console.log("-------------------");
    }




export default connectMongo;
