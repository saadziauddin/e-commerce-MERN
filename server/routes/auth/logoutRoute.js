import express from 'express';
const router = express.Router();

router.get('/api/logout', (req, res) => {
    res.clearCookie('token');
    // res.clearCookie('token', {
    //     path: '/',
    //     httpOnly: true, 
    //     secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    //     sameSite: 'Strict'
    // });
    return res.json({ Status: "Success" });
});

export default router;
