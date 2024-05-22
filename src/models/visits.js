const mongoose = require("mongoose");
const Schema  = mongoose.Schema ;


//schema for collections
const visitSchema =  new Schema({
    visitDateTime : {
        type  :Date ,
        require  : true  
    } ,
    visitType : { 
        type   : Number 
    } ,
    purpose  :  {
        type : String 
    }  ,
    contactPersonId : { 
        type : Schema.Types.ObjectId ,
         ref  : "Contact Person"
    },
    additionalNotes : {
        type : String 
    },
    employeeId : {
        type  : Schema.Types.ObjectId ,
        ref : "Employee"
    },
    status : { 
        type : Number ,
        default : 0

        //0-> enabled
        //1-> disabled
    }
})

const Model =  mongoose.model("visit",visitSchema)

module.exports = Model