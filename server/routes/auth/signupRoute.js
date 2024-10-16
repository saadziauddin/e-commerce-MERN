import express from 'express';
import bcrypt from 'bcrypt';
import multer from 'multer';
import User from '../../models/userModel.js';
import Role from '../../models/roleModel.js';
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
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            cb(null, true);
        } else {
            cb(new Error('Only .png, .jpg, and .jpeg formats are allowed!'), false);
        }
    }
});

const sanitizeField = (field) => {
    if (Array.isArray(field)) {
        return field.length > 0 ? field.map(f => f.trim()).filter(f => f !== '') : null;
    }
    return typeof field === 'string' && field.trim() !== '' ? field.trim() : null;
};

// Validation for required fields
const validateFields = (body) => {
    const errors = {};

    if (!body.firstName || body.firstName.trim() === '') {
        errors.firstName = 'First Name is required.';
    }
    if (!body.lastName || body.lastName.trim() === '') {
        errors.lastName = 'Last Name is required.';
    }
    if (!body.email || body.email.trim() === '') {
        errors.email = 'Email is required.';
    }
    if (!body.contactNo || body.contactNo.trim() === '') {
        errors.contactNo = 'Contact Number is required.';
    }
    if (!body.address || body.address.trim() === '') {
        errors.address = 'Address is required.';
    }
    if (!body.city || body.city.trim() === '') {
        errors.city = 'City is required.';
    }
    if (!body.country || body.country.trim() === '') {
        errors.country = 'Country is required.';
    }
    if (!body.password || body.password.trim() === '') {
        errors.password = 'Password is required.';
    }
    if (!body.confirmPassword || body.confirmPassword.trim() === '') {
        errors.confirmPassword = 'Confirm Password is required.';
    }
    if (!body.password || body.password.trim() === '') {
        errors.password = 'Password is required.';
    }
    if (!body.password || body.password.trim() === '') {
        errors.password = 'Password is required.';
    }
    // if (!body.stock || isNaN(body.stock)) {
    //     errors.stock = 'Valid stock quantity is required.'; // For number fields
    // }

    return errors;
};

router.post('/api/signup', (req, res) => {
    upload.single('profileImage')(req, res, async (uploadError) => {
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

        const userData = { ...req.body };
        const fullName = userData.firstName + " " + userData.lastName;
        const userName = userData.email;
        const postalCode = userData.postalCode ? userData.postalCode : null;
        const userRole = userData.userRole ? userData.userRole : null;
        const profileImage = req.file
            ? [{ imageName: req.file.filename, imagePath: req.file.path }]
            : [{ imageName: "No Image", imagePath: "No Path of Image" }];

        // Validate fields
        const errors = validateFields(req.body);
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        if (userData.password !== userData.confirmPassword) {
            return res.status(400).json({ error: "Password and confirm password not match!" });
        }

        try {
            const existingUser = await User.findOne({ email: userData.email });
            if (existingUser) {
                return res.status(400).json({ error: "User already exists!" });
            };

            const hashedPassword = await bcrypt.hash(userData.password, 10);

            const profileImage = req.file
                ? [{ imageName: req.file.originalname, imagePath: `/uploads/user_images/${req.file.filename}` }]
                : [{ imageName: "No Image", imagePath: "No Path of Image" }];


            // const role = await Role.findOne({name: userData.userRole});
            // if(!role){
            //     return res.status(400).json({error: "Invalid Role!"});
            // }

            const sanitizedUser = {
                firstName: sanitizeField(userData.firstName),
                lastName: sanitizeField(userData.lastName),
                email: sanitizeField(userData.email),
                contactNo: sanitizeField(userData.contactNo),
                address: sanitizeField(userData.address),
                city: sanitizeField(userData.city),
                country: sanitizeField(userData.country),
                postalCode: sanitizeField(postalCode),
                password: sanitizeField(userData.password),
                confirmPassword: sanitizeField(userData.confirmPassword),
                hashedPassword: sanitizeField(hashedPassword),
                fullName: sanitizeField(fullName),
                userName: sanitizeField(userName),
                profileImage: profileImage,
                // role: sanitizeField(userRole),
                // role: role.name
            };

            const newUser = new User(sanitizedUser);
            await newUser.save();

            res.status(200).json({ message: "Registration succesful!" });
        } catch (error) {
            console.error('Error during registration: ', error);
            res.status(500).json({ error: "Internal server error" })
        }
    });
});

export default router;
