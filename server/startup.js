import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import verifyToken from './verifyToken.js';
import dotenv from 'dotenv';

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';
const apiURL = isProduction ? process.env.PRODUCTION_API_URL : process.env.VITE_API_URL;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: apiURL,
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
    exposedHeaders: ['Authorization'],
};
app.use(cors(corsOptions));
app.use((req, res, next) => {
    // console.log('Request Origin:', req.headers.origin);
    console.log("MIDDLEWARE!");
    next();
});

// Sign in Router
import signinRouter from './routes/signinRouter.js';
app.post('/signin', signinRouter);

// Verifying user through JWT Token
app.get('/signin', verifyToken, (req, res) => {
    return res.json({ Status: "Success", name: req.name, role: req.role });
});

// Sign up Router
import signupRouter from './routes/signupRouter.js';
app.post('/Register', signupRouter);

// Password Reset
import resetRouter from './routes/resetRouter.js';
app.post('/verifyEmail', resetRouter);
app.post('/resetPassword', resetRouter);

// Logout
import logoutRouter from './routes/logoutRouter.js';
app.get('/Logout', logoutRouter);

// Add Category
import addCategoryRouter from './routes/categoryRouter.js';
// app.post('/categories', addCategoryRouter);
app.post('/categories/addCategory', (req, res, next) => {
    console.log('Request received at /categories/addCategory');
    next(); // pass to your router
}, addCategoryRouter);


// Fetching /Roles, /GetUserData, /GetRecordingsData, /GetUserData/:userId, /GetUserRole/:userId
import fetchdataRouter from './routes/fetchDataRouter.js';
app.get('/Roles', fetchdataRouter);
app.get('/GetUserData', fetchdataRouter);
app.get('/GetRecordingsData', fetchdataRouter);
app.get('/GetUserData/:userId', fetchdataRouter);
app.get('/GetUserRole/:userId', fetchdataRouter);

// Edit/Delete User
import editdeleteRouter from './routes/editDeleteRouter.js';
app.delete('/Delete', editdeleteRouter);
app.put('/UpdateUserData/:userId', editdeleteRouter);

// Search Recordings
import searchDataRouter from './routes/searchRouter.js';
app.use('/Reports', searchDataRouter);

// Defining PORT
const port = process.env.PORT || 8090;
app.listen(port, () => { console.log("Server is running at PORT: " + port); });
