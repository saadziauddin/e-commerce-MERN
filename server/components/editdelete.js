import express from 'express';
import sql from 'mssql';
import 'cors';
// import config from '../config.js';
import bcrypt from 'bcrypt';
import multer from 'multer';

const router = express.Router();

// Delete Code
router.delete('/Delete', async (req, res) => {
    const { UserId } = req.query;

    if (!UserId) {
        return res.status(400).json({ message: "UserId is required" });
    }

    try {
        const pool = await sql.connect(config);

        // First delete from Users table
        const resultUsers = await pool.request()
            .input('userId', sql.Int, UserId)
            .query("DELETE FROM Users WHERE UserId = @userId");

        // Then delete from UserRoles table
        const resultUserRoles = await pool.request()
            .input('userId', sql.Int, UserId)
            .query("DELETE FROM UserRoles WHERE UserId = @userId");

        // Check if either query affected rows
        if (resultUsers.rowsAffected[0] > 0 || resultUserRoles.rowsAffected[0] > 0) {
            res.status(200).json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error deleting user: ", error);
        res.status(500).json({ message: "Deletion error in server", error });
    }
});

// Edit Code
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../pronet-application/public/images/users/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

router.put('/UpdateUserData/:userId', upload.single('profileImage'), async (req, res) => {
    const userId = parseInt(req.params.userId);
    const userData = req.body;
    const fullName = `${userData.firstName} ${userData.lastName}`;
    const username = userData.email;
    const profileImagePath = req.file ? req.file.path : null;
    const profileImageName = req.file ? req.file.filename : null;

    if (userData.password !== userData.confirmPassword) {
        return res.status(400).json({ error: 'Password and confirm password do not match' });
    }

    bcrypt.hash(userData.password, 10, async (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({ error: 'Internal server error while hashing password!' });
        }

        try {
            const pool = await sql.connect(config);
            const result = await pool.request()
                .input('UserId', sql.Int, userId)
                .input('FirstName', sql.NVarChar, userData.firstName)
                .input('LastName', sql.NVarChar, userData.lastName)
                .input('Email', sql.NVarChar, userData.email)
                .input('ContactNo', sql.NVarChar, userData.contactNo)
                .input('Password', sql.NVarChar, userData.password)
                .input('ConfirmPassword', sql.NVarChar, userData.confirmPassword)
                .input('FullName', sql.NVarChar, fullName)
                .input('Username', sql.NVarChar, username)
                .input('PasswordHash', sql.NVarChar, hashedPassword)
                .input('ProfileImageName', sql.NVarChar, profileImageName)
                .input('ProfileImagePath', sql.NVarChar, profileImagePath)
                .query(`UPDATE Users
                        SET ProfileImage = @ProfileImageName,
                            FirstName = @FirstName,
                            LastName = @LastName,
                            Email = @Email,
                            ContactNo = @ContactNo,
                            Password = @Password,
                            ConfirmPassword = @ConfirmPassword,
                            FullName = @FullName,
                            Username = @Username,
                            PasswordHash = @PasswordHash,
                            ProfileImagePath = @ProfileImagePath WHERE UserId = @UserId`);

            if (result.rowsAffected[0] === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            await pool.request()
                .input('UserId', sql.Int, userId)
                .input('UserRole', sql.NVarChar, userData.userRole)
                .query(`UPDATE UserRoles SET UserRole = @UserRole WHERE UserId = @UserId`);

            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            console.error("Error updating user data: ", error);
            res.status(500).json({ message: "Internal server error while updating user data", error });
        }
    });
});

export default router;
