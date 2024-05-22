const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const superUserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: false
    },
    status : { 
        type : Number ,
        default : 0

        //0-> enabled
        //1-> disabled
    }

})

superUserSchema.pre('save', async function (next) {
    try {
        if (!this.isDirectModified("password")) {
            return next();
        }
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    }
    catch {
        return next(error)
    }
})




const superUserModel = mongoose.model("superUser", superUserSchema)


module.exports = superUserModel ; 