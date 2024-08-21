const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.auth_token; // Retrieve token from cookie
    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user; // Attach user data to request
        next();
    });
};

module.exports = authenticateJWT;
