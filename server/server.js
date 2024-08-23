import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import usermodel from './models/authschema.js';
import { router as userRouter } from './routes/authroute.js';
import { route as financialRouter } from './routes/financeRoutes.js';

const app = express();
const secret = 'asdfe45we45w345wegw345werjktjwertkj';

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Frontend origin
  credentials: true // Allow cookies to be sent with requests
}));
app.use(express.json());
app.use(cookieParser());
app.use("/user", userRouter);
app.use("/user/transaction",financialRouter) 

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userauth')
  .then(() => console.log('Connected to DB'))
  .catch(err => console.error('Failed to connect to DB', err));

// Profile Route - Retrieves user profile based on JWT token
app.get('/user/profile', (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: 'No token provided' });

  // Verify the JWT token
  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    
    // Send the decoded user information
    res.json(decoded);
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server runs on port 3000');
});
