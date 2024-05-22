const jwt = require('jsonwebtoken')


function verifyToken (req, res , next){
    const token =  req.header("Authorization") ;
    if(!token) {
        return res.status(401).json({success : false , message  :  "No token provided"})
    }
    try {
        const key = process.env.KEY; 
        const decode = jwt.verify(token , key) ;
        req.user  = decode;
        req.isGoogle=false;
        if(decode.access_token!== undefined) {
            req.isGoogle=true;
            req.access_token = decode.access_token ;
            req.refresh_token = decode.refresh_token ;
        }
        next(); 
    }catch(error){
        console.error("Error verifying token:" , error) ;
        return res.status(401).json({success: false , message :  "Invalid Message "})
    }
}




module.exports ={verifyToken}