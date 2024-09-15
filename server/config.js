import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI_ATLAS;
// console.log('MONGODB_URI_ATLAS:', process.env.MONGODB_URI_ATLAS);

mongoose.connect(uri)
.then(() => {
    console.log(`Connected Successfully to MongoDB!`);
}).catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
});
