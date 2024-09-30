import express from 'express';
import bcrypt from 'bcrypt';
import multer from 'multer';
import mongoose from 'mongoose';
import User from '../../models/userModel.js';
import fs from 'fs';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/public/uploads/user_images/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            cb(null, true);
        } else {
            cb(new Error('Only .png, .jpg and .jpeg format allowed!'), false);
        }
    }
});

const deleteOldImage = (imagePath) => {
    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error("Error deleting old image: ", err);
        } else {
            console.log("Old image deleted successfully.");
        }
    });
};

router.put('/api/updateUser/:userId', (req, res) => {
    upload.single('image')(req, res, async (uploadError) => {
        if (uploadError) {
            if (uploadError instanceof multer.MulterError) {
                if (uploadError.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({ error: 'File size exceeds 5MB!' });
                }
            } else if (uploadError.message) {
                return res.status(400).json({ error: uploadError.message });
            } else {
                return res.status(500).json({ error: 'An error occurred during file upload!' });
            }
        }

        const userId = new mongoose.Types.ObjectId(req.params.userId);
        const userData = { ...req.body };
        if (userData.password !== userData.confirmPassword) {
            return res.status(400).json({ error: 'Password and confirm password do not match' });
        }
        const fullName = userData.firstName + " " + userData.lastName;
        const userName = userData.email;
        try {
            const existingUser = await User.findById(userId);
            if (!existingUser) {
                return res.status(404).json({ error: "User not found!" });
            }

            // If there's a new image uploaded, delete the old image
            if (req.file && existingUser.profileImage && existingUser.profileImage.length > 0) {
                const oldImagePath = existingUser.profileImage[0].imagePath;
                if (fs.existsSync(oldImagePath)) {
                    deleteOldImage(oldImagePath); // Delete the old image
                }
            }

            const profileImage = req.file ? [{ imageName: req.file.filename, imagePath: req.file.path }] : existingUser.profileImage;

            const hashedPassword = await bcrypt.hash(userData.password, 10);

            const updateUser = await User.findByIdAndUpdate(userId, {
                ...(userData.firstName && { firstName: userData.firstName }),
                ...(userData.lastName && { lastName: userData.lastName }),
                ...(userData.email && { email: userData.email }),
                ...(userData.contactNo && { contactNo: userData.contactNo }),
                ...(userData.address && { address: userData.address }),
                ...(userData.city && { city: userData.city }),
                ...(userData.country && { country: userData.country }),
                ...(userData.postalCode && { postalCode: userData.postalCode }),
                ...(userData.password && { password: userData.password }),
                ...(userData.confirmPassword && { confirmPassword: userData.confirmPassword }),
                ...(userData.role && { role: userData.role }),
                ...(userData.password && { hashedPassword: hashedPassword }),
                ...(req.file && { profileImage: profileImage }),
                fullName: fullName,
                userName: userName
            }, { new: true });

            if (!updateUser) {
                return res.status(400).json({ error: "User not found!" });
            }
            res.status(200).json({ message: "User updated successfully!", updatedUserData: updateUser });
        } catch (error) {
            console.log("Error during user updation: ", error);
            return res.status(500).json({ error: "Internal server error!" });
        }
    });
});

export default router;
