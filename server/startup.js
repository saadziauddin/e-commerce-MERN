import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import verifyUser from './components/verifyUser.js';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const apiURL = isProduction ? process.env.PRODUCTION_API_URL : process.env.VITE_API_URL;
// const mongoURI = isProduction ? process.env.MONGODB_URI_ATLAS : process.env.MONGODB_URI_LOCAL;

// console.log('Environment:', process.env.NODE_ENV);
// console.log('MongoDB URI:', mongoURI);
// console.log('API URL:', apiURL);

const app = express();
app.use(express.json());
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
    // console.log("MIDDLEWARE!");
    next();
});

// Login Router
import loginRouter from './components/login.js';
app.post('/signin', loginRouter);

// Verifying user through JWT Token
app.get('/signin', verifyUser, (req, res) => {
    return res.json({ Status: "Success", name: req.name, role: req.role });
});

// Register Router
import registerRouter from './components/register.js';
app.post('/Register', registerRouter);

// Password Reset
import resetRouter from './components/reset.js';
app.post('/ResetPassword', resetRouter);

// Logout
import logoutRouter from './components/logout.js';
app.get('/Logout', logoutRouter);

// Fetching /Roles, /GetUserData, /GetRecordingsData, /GetUserData/:userId, /GetUserRole/:userId
import fetchdataRouter from './components/fetchdata.js';
app.get('/Roles', fetchdataRouter);
app.get('/GetUserData', fetchdataRouter);
app.get('/GetRecordingsData', fetchdataRouter);
app.get('/GetUserData/:userId', fetchdataRouter);
app.get('/GetUserRole/:userId', fetchdataRouter);

// Edit/Delete User
import editdeleteRouter from './components/editdelete.js';
app.delete('/Delete', editdeleteRouter);
app.put('/UpdateUserData/:userId', editdeleteRouter);

// Search Recordings
import searchDataRouter from './components/searchData.js';
app.use('/Reports', searchDataRouter);


// Defining PORT
const port = process.env.PORT || 8090;
app.listen(port, () => { console.log("Server is running at PORT: " + port); });
