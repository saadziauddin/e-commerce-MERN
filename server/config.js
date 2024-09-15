import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI_ATLAS;
// const uri = process.env.MONGODB_URI_LOCAL;

mongoose.connect(uri)
.then(() => {
    console.log(`Connected Successfully to MongoDB Atlas!`);
    // console.log(`Connected Successfully to MongoDB Local!`);
}).catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
});

// import Role from './models/role.js';

// const createRoles = async () => {
//     try {
//         await Role.create({ name: 'Admin' });
//         await Role.create({ name: 'User' });
//         console.log('Roles created successfully');
//     } catch (error) {
//         console.error('Error creating roles:', error);
//     }
// };

// createRoles();
