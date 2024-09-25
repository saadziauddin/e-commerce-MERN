import express from 'express';
import bcrypt from 'bcrypt';
import multer from 'multer';
import User from '../../models/user.js';
import Role from '../../models/role.js';

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

router.post('/api/signup', (req, res) => {
    upload.single('profileImage')(req, res, async (uploadError) => {
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
        const userData = { ...req.body };
        const fullName = userData.firstName + " " + userData.lastName;
        const userName = userData.email;
        const postalCode = userData.postalCode ? userData.postalCode : null;
        const userRole = userData.userRole ? userData.userRole : null;
        const profileImage = req.file
            ? [{ imageName: req.file.filename, imagePath: req.file.path }]
            : [{ imageName: "No Image", imagePath: "No Path of Image" }];
        if (userData.password !== userData.confirmPassword) {
            return res.status(400).json({ error: "Password and confirm password not match!" });
        }
        try {
            const existingUser = await User.findOne({ email: userData.email });
            if (existingUser) {
                return res.status(400).json({ error: "User already exists!" });
            }
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            // const role = await Role.findOne({name: userData.userRole});
            // if(!role){
            //     return res.status(400).json({error: "Invalid Role!"});
            // }
            const newUser = new User({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                contactNo: userData.contactNo,
                address: userData.address,
                city: userData.city,
                country: userData.country,
                postalCode: postalCode,
                password: userData.password,
                confirmPassword: userData.confirmPassword,
                hashedPassword: hashedPassword,
                fullName: fullName,
                userName: userName,
                profileImage: profileImage,
                role: userRole,
                // role: role.name
            });
            await newUser.save();
            res.status(200).json({ message: "Registration succesful!" });
        } catch (error) {
            console.error('Error during registration: ', error);
            res.status(500).json({ error: "Internal server error" })
        }
    });
});

export default router;
