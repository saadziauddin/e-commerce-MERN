

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load both environment files
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.production' });

// Define the URIs
const atlasUri = process.env.MONGODB_URI_ATLAS;
const localUri = process.env.MONGODB_URI_LOCAL;

// Function to connect to MongoDB Atlas and fall back to Local MongoDB
const connectToMongoDB = async () => {
    try {
        // Try to connect to MongoDB Atlas first
        await mongoose.connect(atlasUri);
        console.log("Connected to MongoDB Atlas!");
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas. Falling back to local MongoDB:", error.message);
        // If Atlas connection fails, fall back to Local MongoDB
        try {
            await mongoose.connect(localUri);
            console.log("Connected to Local MongoDB!");
        } catch (localError) {
            console.error("Error connecting to Local MongoDB:", localError.message);
        }
    }
};

connectToMongoDB();

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