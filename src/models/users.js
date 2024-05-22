const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String , 
        required : true 
    },
    password: {
        type: String  
    } ,
    fullName : { 
        type  :  String ,
        require  : true 
    },
    email : { 
        type  :  String  ,
        require  : true  
    } , 
    role  :  {
        type : String ,
        enum :  ["Admin" , "Manager" , "Employee"],
        require : true 
    } ,
    status : { 
        type : Number ,
        default : 0

        //0-> enabled
        //1-> disabled
    },

    googleId : {
        type :  String  
    },
    refreshToken  : { 
        type : String 
    }
    // googleId  if user  account is linked with google account 
}  , {timestamps : true })

userSchema.pre('save', async function (next) {
    try {
        if (!this.isDirectModified('password')) {
            return next();
        }
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    }
    catch (error) {
        return next(error)
    }
})

const UserModel = mongoose.model("User", userSchema)
module.exports = UserModel; 