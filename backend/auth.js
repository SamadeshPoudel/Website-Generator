require("dotenv").config();
const express = require ("express");
const axios = require("axios");
const querystring = require("querystring");
const jwt = require("jsonwebtoken");
const User = require("./userModel");

const router = express.Router();

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectURI = process.env.GOOGLE_REDIRECT_URI;
const jwtSecret = process.env.JWT_SECRET; //secret key for signing JWT's
const expiresIn= "24 h"; //Access token expiry time

router.get('/google/login', (req, res) => {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=code&scope=email%20profile&access_type=offline&prompt=consent`;
    res.redirect(authUrl);
  });

router.get('/google/callback', async (req, res) => {
    const code = req.query.code;
  
    try {
      // Exchange the authorization code for an access token
      const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', querystring.stringify({
        client_id: clientID,
        client_secret: clientSecret,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: redirectURI
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
  
      const accessToken = tokenResponse.data.access_token;
      const idToken = tokenResponse.data.id_token;
  
      // Get user info from Google
      const userResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      // console.log(userResponse)
  
      const userData = userResponse.data;

      // Check if the user already exists
      let user = await User.findOne({ googleId: userData.id });

      if (!user) {
          // If the user doesn't exist, create a new user
          user = new User({
              googleId: userData.id,
              email: userData.email,
              verifiedEmail: userData.verified_email,
              name: userData.name,
              givenName: userData.given_name,
              familyName: userData.family_name,
              picture: userData.picture,
              prompts: [] // Initialize with an empty array
          });

          await user.save(); // Save the new user to the database
      } else {
          // Update user information if necessary
          user.email = userData.email;
          user.verifiedEmail = userData.verified_email;
          user.name = userData.name;
          user.givenName = userData.given_name;
          user.familyName = userData.family_name;
          user.picture = userData.picture;

          await user.save(); // Save updates
      }


      //CREATING JWT
      const jwtToken = jwt.sign({user:userData}, jwtSecret, {expiresIn: expiresIn});

      // Store the JWT in a cookie or return it in response
      res.cookie('auth_token', jwtToken, { 
      // httpOnly: true, // This secures the cookie and makes it accessible only by the web server
      secure: process.env.NODE_ENV === 'production', // Send only on HTTPS in production
      sameSite: 'Strict', // Prevents the cookie from being sent in cross-site requests
      path: '/', // Ensures the cookie is accessible across all routes
       }); 
    
    // Redirect to the home page of frontend
    res.redirect(`${process.env.FRONTEND_URL}/home`);

 //  res.send(userData); // Handle user data (e.g., create a session or JWT)
    } catch (error) {
      console.error('Error during Google OAuth process:', error);
      res.status(500).send('Authentication failed');
    }
    });
  
module.exports = router;