import express from 'express';
import User from '../models/user.js';
import Role from '../models/role.js';
import mongoose from 'mongoose';

const router = express.Router();

// Fetch Roles
router.get('/Roles', async (req, res) => {
    try{
        const roles = await Role.find(); 
        res.status(200).json(roles);
    }
    catch(error){
        console.error("Error fetching roles: "+error);
        res.status(500).json({error: "Internal server error while fetching roles"});
    }
});

// Fetch User Data
router.get('/GetUserData', async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }
    catch(error){
        console.error("Error fetching users data: "+error);
        res.status(500).json({error: "Internal server error while fetching users data"});
    }
});

// Fetch User Data by UserId
router.get('/GetUserData/:userId', async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.params.userId);
    try {
        const users = await User.find({_id: userId});
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching user data: " + error);
        res.status(500).json({ error: "Internal server error while fetching user data" });
    }
});

export default router;
