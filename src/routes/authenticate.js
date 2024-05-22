const express = require('express')
const router = express.Router(); 
  
// importing controllers
const {login , signUpUser,  googleSignUpCallBack , googleSignUp, loginWithGoogle, googleLoginCallBack} =  require('../controllers/authenticate');
// importing validators
const {loginValidator , signValidator}= require("../controllers/authenticate") ;

// importing middleware 
const {verifyToken} = require("../middleware/authenticate");




//login router users
router.post("/login",loginValidator,  login);


// signup router for users
router.post("/signup",signValidator, signUpUser);


// google signUp function 
router.get("/google/signup/:userType" , googleSignUp)

//google signUp callback
router.get("/google/details/:userType" ,googleSignUpCallBack );

//Login  with login Function 
router.get("/google/login/:userType", loginWithGoogle);


//google login function 
router.get("/google/login/callback/:userType" , googleLoginCallBack)


// verify user is authenticated 
router.get("/check", verifyToken , (req,res)=>{
    return res.status(200).json({access : req.access_token , refresh : req.refresh_token , isGoogle : req.isGoogle })
})

module.exports = router ; 