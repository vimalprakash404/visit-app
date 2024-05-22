const UserModel = require("../models/users")
const { body, validationResult } = require("express-validator")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require("../database/connection")
// login validator  

const axios = require("axios")

require('dotenv').config({})
// roles of users
const roles = ["Admin", "Manager", "Employee"]

const loginValidator = [
    body('username').notEmpty().isString(),
    body('password').notEmpty().isString()
]





async function login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success: false })
    }
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid user Credentials " })
        }
        if(!user.password) {
            return res.status(401).json({success : false , message : "This account is associated with other social media account"})
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: " Invalid user Credentials" });
        }
        const key = process.env.KEY;
        user.password = undefined;
        const token = jwt.sign({ user }, key, { expiresIn: "24h" });
        return res.json({ success: true, message: "you Logged In", token })
    }
    catch (error) {
        console.error('Error during login :', error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
    return res.send(username + " " + password);
}


// signValidator  
const signValidator = [
    body('username').notEmpty().isString(),
    body('password').notEmpty().isString(),
    body("fullName").notEmpty().isString(),
    body("email").notEmpty().isEmail(),
    body("role").notEmpty().custom((value) => {
        if (!roles.includes(value)) {
            throw new Error('Invalid role');
        }
        return true;
    })

]

// common user creation function 
async function signUp(req, model) {
    try {
        const { username, password } = req.body;
        const user = await model.findOne({ username })
        console.log(user)
        if (user) {
            return { success: false, code: 401, message: "user already exists " }
        }
        console.log(req.body)
        const newUser = new model(req.body);
        await newUser.save();
        return { success: true, message: "User register successfully " };
    }
    catch (error) {
        console.error('Error during signup : ', error);
        return { success: false, message: "Internal server  error " }
    }
}




//login user with  google 

async function loginWithGoogle(req ,res) {
    const userType = req.params.userType;
    const  redirect_url = "http://localhost:3000/api/authenticate/google/login/callback";
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${redirect_url + `/${userType}`}&response_type=code&scope=email`;
    res.redirect(url);
}


// user  sign up function 
async function signUpUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ success: false, errors: errors.array() })
    }
    const response = await signUp(req, UserModel)
    if (response.success == true) {

        return res.status(401).json(response);
    }
    else {
        if (response.code === 401) {
            response.code = undefined;
            return res.status(401).json(response)
        }
        return res.status(500).json(response);
    }
}


// import  super user model
const superUserModel = require("../models/superUser")


async function createSuperUser(username, password) {
    const response = await signUp(username, password, superUserModel);
    return response;
}



// google sign  in 


const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI_LOGIN;
const REDIRECT_URI_SIGN_UP = process.env.REDIRECT_URI_SIGN_UP;

const userTypes = ["Admin", "Manager", "Employee"]

async function googleSignUp(req, res) {
    const userType = req.params.userType;
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI + `/${userType}`}&response_type=code&scope=profile email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/userinfo.profile&access_type=offline`;
    res.redirect(url);
}


async function googleDbSaver(email, name, googleId, userType, refreshToken, res) {
    try {
        const newUser = await UserModel({ username: email, fullName: name, email, role: userType, googleId, refreshToken })
        newUser.save();
        return res.status(200).json({ success: true, message: "signUp successfully" })
    }
    catch (error) {
        return res.status(500).json({ message: "server while  signup using  google " + error })
    }


}

async function googleLoginCallBack(req, res) {
    try {
        const { code } = req.query;
        const {userType} = req.params;
        const  redirect_url = "http://localhost:3000/api/authenticate/google/login/callback";
        const { data } = await axios.post('https://oauth2.googleapis.com/token', {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
            redirect_uri: redirect_url + `/${userType}`,
            grant_type: 'authorization_code',
            scope: 'https://www.googleapis.com/auth/calendar.readonly', // Specify the correct scope
        });
        
        const { access_token, id_token } = data;
        const profileResponse = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        const {id} = profileResponse.data ;
        const user = await UserModel.findOne({googleId:id});
        if (user) {
            return  res.status(200).json({sample : profileResponse.data}); 
        }
        else {
            return res.status(401).json({success : false , message : "users not found signup first "}) ;
            //return res.redirect("http://localhost:3000/api/authenticate/google/signup/"+userType)
        }
    }
    catch (error) {
        return res.status(500).json({success : false , message:"server while getting google in login" , error })
    }
}


async function googleSignUpCallBack(req, res) {
    const { code } = req.query;
    const userType = req.params.userType;
    try {
        const { data } = await axios.post('https://oauth2.googleapis.com/token', {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
            redirect_uri: REDIRECT_URI + `/${userType}`,
            grant_type: 'authorization_code',
            scope: 'https://www.googleapis.com/auth/calendar.readonly', // Specify the correct scope
        });

        const { access_token, id_token } = data;
        const profileResponse = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        const profile = profileResponse.data;

        const googleId = profile.id;
        const email = profile.email;

        const user = await UserModel.findOne({ email });

        if (user) {
            if (user.googleId === undefined) {
                return res.status(401).json({ message: "account not linked with google" })
            }

            if (googleId === user.googleId) {
                const key = process.env.KEY;
                const { refresh_token, access_token } = data;
                const token = jwt.sign({ user, access_token, refresh_token }, key, { expiresIn: "24h" });
                return res.status(200).json({ token, access_token })
            }
            else {
                return res.status(400).json({ message: "something went wrong " })
            }
        }
        else {
            return googleDbSaver(email, profile.name, googleId, userType, data.refresh_token, res);
        }
    } catch (error) {
        console.error('Error:', error, JSON.stringify(error));
        res.redirect('/login');
    }
};


module.exports = { login, loginValidator, signValidator, signUpUser, createSuperUser, googleSignUp, googleSignUpCallBack  , loginWithGoogle , googleLoginCallBack}