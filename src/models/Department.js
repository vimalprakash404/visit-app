const mongoose   = require("mongoose") ;


const schema =  mongoose.Schema({
    name : {
        type  :  String
    },
    status : { 
        type  : Number  ,
        default  : 1
        //1 -> enable 
        //0 -> disable 
    }
})



const Model =  mongoose.model("Department" , schema);
module.exports = Model