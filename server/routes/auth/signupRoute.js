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
const upload = multer({ storage });

router.post('/api/signup', upload.single('profileImage'), async(req, res) => {
    const userData = { ...req.body };

    const fullName = userData.firstName + " " + userData.lastName;
    const userName = userData.email;
    const postalCode = userData.postalCode ? userData.postalCode : null;
    const userRole = userData.userRole ? userData.userRole : null;
    const profileImage = req.file
    ? [{ imageName: req.file.filename, imagePath: req.file.path }]
    : [{ imageName: "No Image", imagePath: "No Path of Image" }];
    if (userData.password !== userData.confirmPassword) {
        return res.status(400).json({error: "Password and confirm password not match!"});
    } 
    try {
        const existingUser = await User.findOne({email: userData.email});
        if(existingUser){
            return res.status(400).json({error: "User already exists!"});
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
        res.status(200).json({message: "Registration succesful!"});
    } catch (error) {
        console.error('Error during registration: ',error);
        res.status(500).json({error: "Internal server error"})
    }
});

export default router;
