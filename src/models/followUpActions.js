const mongoose  = require("mongoose");
const Schema =  mongoose.Schema ;

const followUpSchema = new Schema({
    visitId :  { 
        type : String
    } ,
    actionDescription  : { 
        type  : String
    },
    actionDueDate :  { 
        type : Date
    } ,
    actionStatus : { 
        type  : Number ,
        default : 0
    },
    // 0 -> pending 
    // 1 -> In progress 
    // 2 -> Completed 
    status : { 
        type : Number ,
        default : 0

        //0-> enabled
        //1-> disabled
    }
})


const Model =  mongoose.model("FollowUpActions" , followUpSchema);

module.exports = Model ;