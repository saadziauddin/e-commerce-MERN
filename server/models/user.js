import mongoose from "mongoose";
import '../config.js';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },    
    fullName: { type: String, required: true },
    userName: { type: String, required: true },
    hashedPassword: { type: String, required: true, unique: true },
    profileImageName: { type: String },
    profileImagePath: { type: String },
    // roles: [{ type: mongoose.Schema.Types., ref: 'Role' }],
    role: { type: String, required: true },
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
