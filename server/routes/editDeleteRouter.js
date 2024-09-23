import express from 'express';
import bcrypt from 'bcrypt';
import multer from 'multer';
import mongoose from 'mongoose';
import User from '../models/user.js';

const router = express.Router();

// Multer setup for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/public/uploads/user_images/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

// Edit Code:
router.put('/UpdateUserData/:userId', upload.single('image'), async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.params.userId);
    const userData = { ...req.body };

    const fullName = userData.firstName + " " + userData.lastName;
    const userName = userData.email;
    const imageName = req.file ? req.file.filename : null;
    const imagePath = req.file ? req.file.path : null;

    if (!userData.firstName || !userData.lastName || !userData.email || !userData.contactNo || !userData.userRole) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (userData.password !== userData.confirmPassword) {
        return res.status(400).json({ error: 'Password and confirm password do not match' });
    }

    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const updateUser = await User.findByIdAndUpdate(userId, {
            ...(userData.firstName && { firstName: userData.firstName }),
            ...(userData.lastName && { lastName: userData.lastName }),
            ...(userData.email && { email: userData.email }),
            ...(userData.contactNo && { contactNo: userData.contactNo }),
            ...(userData.password && { password: userData.password }),
            ...(userData.confirmPassword && { confirmPassword: userData.confirmPassword }),
            ...(userData.userRole && { role: userData.userRole }),
            ...(userData.password && { hashedPassword: hashedPassword }),
            ...(imageName && { profileImageName: imageName }),
            ...(imagePath && { profileImagePath: imagePath }),
            fullName: fullName,
            userName: userName
        }, {new: true});

        if(!updateUser){
            return res.status(400).json({error: "User not found!"});
        }
        
        res.status(200).json({message: "User updated successfully!", updatedUserData: updateUser});
    } catch (error) {
        console.log("Error during user updation: ", error);
        return res.status(500).json({error: "Internal server error!"});
    }
});

// Delete Code:
router.delete('/Delete', async (req, res) => {
    const { UserId } = req.query;
    if (!UserId) {
        return res.status(400).json({ message: "UserId is required" });
    }
    try {
        const deleteUser = await User.deleteOne({_id: UserId});
        if (!deleteUser) {
            res.status(400).json({ error: "User not deleted!" });
        } else {
            res.status(200).json({ message: "User deleted successfully!" });
        }
    } catch (error) {
        console.error("Error during deletion: ", error);
        res.status(500).json({ message: "Internal server error: ", error });
    }
});

export default router;
