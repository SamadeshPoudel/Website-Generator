require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const app = express();
const authRoutes = require('./auth');
const authenticateJWT = require('./authMiddleware');
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors({
  origin:process.env.FRONTEND_URL, // Specifies the frontend origin that can access the backend
  credentials: true, // Allows cookies to be sent with requests
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to handle URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies
app.use(cookieParser());

app.use('/auth', authRoutes);

app.get("/home", authenticateJWT, (req, res)=>{
    res.send("Welcome to a protected home page")
})


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
