import mongoose from "mongoose";
import './config.js';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },    
    fullName: { type: String, required: true },
    userName: { type: String, required: true },
    hashedPassword: { type: String, required: true, unique: true },
    profileImage: [
        { imageName: { type: String }, imagePath: { type: String } }
    ],
    // roles: [{ type: mongoose.Schema.Types., ref: 'Role' }], // For _id of Roles
    role: { type: String, default: 'Client' },
    dateOfCreation: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// const userDocument1 = {
//     firstName: "Saad",
//     lastName: "Dev",
//     email: "saad@gmail.com",
//     contactNo: "03123445689",
//     password: "saad",
//     confirmPassword: "saad",
//     fullName: "Saad Dev",
//     userName: "saad@gmail.com",
//     passwordHash: "$2a$12$XNX1Ml.5v4KLasvdgqsfkjasnGRZ4uQFYAaYHJuWVscpLqDB2NsG",
// }

// const insertUsers = async () => {
//     try {
//         await user.insertMany(userDocument1);
//         // const findInsertedDocument = await user.find();
//         // console.log(findInsertedDocument);
//     } catch (error) {
//         console.log(error);
//     } finally {
//         mongoose.connection.close();
//     }
// }

export default User;
