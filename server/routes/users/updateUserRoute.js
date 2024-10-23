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
        const uploadPath = path.join(__dirname, '../../public/uploads/user_images/');
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
    limits: { fileSize: 1024 * 1024 * 3 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (['image/jpeg', 'image/png', 'image/jpg'].includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only .png, .jpg, and .jpeg formats are allowed!'), false);
        }
    },
});

router.put('/api/updateUser/:userId', (req, res) => {
    upload.single('image')(req, res, async (uploadError) => {
        if (uploadError) {
            if (uploadError instanceof multer.MulterError) {
                if (uploadError.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({ error: 'File size limit exceeds 5MB!' });
                }
            } else if (uploadError.message) {
                return res.status(400).json({ error: uploadError.message });
            } else {
                return res.status(500).json({ error: 'An error occurred during file upload!' });
            }
        }

        const userId = new mongoose.Types.ObjectId(req.params.userId);
        const { firstName, lastName, email, contactNo, address, city, country, postalCode, password, confirmPassword, role } = req.body;
        const fullName = firstName + " " + lastName;
        const userName = email;

        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: "User not found!" });
            }

            // If there's a new image uploaded, delete the old image
            if (req.file) {
                // Check if user already has an image
                if (user.profileImage && user.profileImage[0]?.imageName && user.profileImage[0]?.imagePath) {
                    const oldImagePath = path.join(__dirname, '../../public/uploads/user_images/', user.profileImage[0].imageName);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlink(oldImagePath, (err) => {
                            if (err) {
                                console.error(`Error deleting image from system:`, err);
                            } else {
                                console.log(`Image deleted: ${oldImagePath}`);
                            }
                        });
                    } else {
                        console.log(`Image file not found at path: ${oldImagePath}`);
                    }
                }
                user.profileImage = [{ imageName: req.file.filename }];
            }

            const profileImage = req.file
                ? [{ imageName: req.file.filename, imagePath: `/uploads/user_images/${req.file.filename}` }]
                : user.profileImage;

            let hashedPassword = user.password;
            if (password && password.trim() !== "") {
                hashedPassword = await bcrypt.hash(password, 10);
            }

            const sanitizedUser = {
                ...(firstName && {
                    firstName: sanitizeField(firstName)
                }),
                ...(lastName && {
                    lastName: sanitizeField(lastName)
                }),
                ...(email && {
                    email: sanitizeField(email)
                }),
                ...(contactNo && {
                    contactNo: sanitizeField(contactNo)
                }),
                ...(address && {
                    address: sanitizeField(address)
                }),
                ...(city && {
                    city: sanitizeField(city)
                }),
                ...(country && {
                    country: sanitizeField(country)
                }),
                ...(postalCode && {
                    postalCode: sanitizeField(postalCode)
                }),
                ...(password && {
                    password: sanitizeField(password)
                }),
                ...(confirmPassword && {
                    confirmPassword: sanitizeField(confirmPassword)
                }),
                ...(password && {
                    hashedPassword: hashedPassword
                }),
                ...(role && {
                    role: role
                }),
                ...(req.file && {
                    profileImage: profileImage
                }),
                fullName: fullName,
                userName: userName
            };

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                sanitizedUser,
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found!' });
            }

            // await newUser.save();

            res.status(200).json({ message: "User updated successfully!", updatedUser });

        } catch (error) {
            console.log("Error during user updation: ", error);
            return res.status(500).json({ error: "Internal server error!" });
        }
    });
});

export default router;
