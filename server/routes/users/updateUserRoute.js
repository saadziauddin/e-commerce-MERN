import express from 'express';
import bcrypt from 'bcrypt';
import multer from 'multer';
import mongoose from 'mongoose';
import User from '../../models/userModel.js';
import moment from 'moment';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../../public/uploads/product_images/');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const timestamp = moment().format('DD-MM-YYYY');
        const fileName = `${timestamp}-${file.originalname}`;
        cb(null, fileName);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (['image/jpeg', 'image/png', 'image/jpg'].includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only .png, .jpg, and .jpeg formats are allowed!'), false);
        }
    },
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

const sanitizeField = (field) => {
    if (Array.isArray(field)) {
        return field.length > 0 ? field.map(f => f.trim()).filter(f => f !== '') : null;
    }
    return typeof field === 'string' && field.trim() !== '' ? field.trim() : null;
};

// Validation function for required fields
// const validateUserFields = (body) => {
//     const errors = {};

//     if (!body.firstName || body.firstName.trim() === '') {
//         errors.firstName = 'First name is required.';
//     }
//     if (!body.lastName || body.lastName.trim() === '') {
//         errors.lastName = 'Last name is required.';
//     }
//     if (!body.email || body.email.trim() === '') {
//         errors.email = 'Email is required.';
//     }
//     if (!body.contactNo || isNaN(body.contactNo)) {
//         errors.contactNo = 'Contact number is required.';
//     }
//     if (!body.address || body.address.trim() === '') {
//         errors.address = 'Address is required.';
//     }
//     if (!body.city || body.city.trim() === '') {
//         errors.city = 'City is required.';
//     }
//     if (!body.country || body.country.trim() === '') {
//         errors.country = 'Country is required.';
//     }
//     if (!body.password || isNaN(body.password)) {
//         errors.password = 'Password is required.';
//     }
//     if (!body.confirmPassword || isNaN(body.confirmPassword)) {
//         errors.confirmPassword = 'Confirm Password is required.';
//     }
//     if (!body.role || body.role.trim() === '') {
//         errors.role = 'Role is required.';
//     }

//     return errors;
// };

router.put('/api/updateUser/:userId', (req, res) => {
    upload.single('image')(req, res, async (uploadError) => {
        if (uploadError) {
            if (uploadError instanceof multer.MulterError) {
                if (uploadError.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({ error: 'File size limit exceeds 5MB!' });
                }
                if (uploadError.code === 'LIMIT_UNEXPECTED_FILE') {
                    return res.status(400).json({ error: 'You can only upload up to 5 images at a time!' });
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

        // const errors = validateUserFields(req.body);
        // if (Object.keys(errors).length > 0) {
        //     return res.status(400).json({ errors });
        // }

        try {
            const existingUser = await User.findById(userId);
            if (!existingUser) {
                return res.status(404).json({ error: "User not found!" });
            }

            // If there's a new image uploaded, delete the old image
            if (req.file && existingUser.profileImage && existingUser.profileImage.length > 0) {
                const oldImagePath = existingUser.profileImage[0].imagePath;
                if (fs.existsSync(oldImagePath)) {
                    deleteOldImage(oldImagePath);
                }
            }

            const profileImage = req.file ? [{ imageName: req.file.filename, imagePath: req.file.path }] : existingUser.profileImage;
            const hashedPassword = await bcrypt.hash(userData.password, 10);

            const sanitizedUser = {
                ...(userData.firstName && { firstName: sanitizeField(userData.firstName) }),
                ...(userData.lastName && { lastName: sanitizeField(userData.lastName) }),
                ...(userData.email && { email: sanitizeField(userData.email) }),
                ...(userData.contactNo && { contactNo: sanitizeField(userData.contactNo) }),
                ...(userData.address && { address: sanitizeField(userData.address) }),
                ...(userData.city && { city: sanitizeField(userData.city) }),
                ...(userData.country && { country: sanitizeField(userData.country) }),
                ...(userData.postalCode && { postalCode: sanitizeField(userData.postalCode) }),
                ...(userData.password && { password: sanitizeField(userData.password) }),
                ...(userData.confirmPassword && { confirmPassword: sanitizeField(userData.confirmPassword) }),
                ...(userData.role && { role: sanitizeField(userData.role) }),
                ...(userData.password && { hashedPassword: hashedPassword }),
                ...(req.file && { profileImage: profileImage }),
                fullName: fullName,
                userName: userName
            };

            const updatedUser = await User.findByIdAndUpdate(userId, sanitizedUser, { new: true });

            if (!updatedUser) {
                return res.status(400).json({ error: "User not found!" });
            }

            res.status(200).json({ message: "User updated successfully!", updatedUserData: updatedUser });

        } catch (error) {
            console.log("Error during user updation: ", error);
            return res.status(500).json({ error: "Internal server error!" });
        }
    });
});

export default router;
