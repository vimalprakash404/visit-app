const mongoose = require("mongoose");
const Schema = mongoose.Schema ;

const visitDetailsSchema = new Schema ({
    visitId  : { 
        type  : Schema.Types.ObjectId ,
        ref : "Visits"
    } ,
    discussionTopic :  {
        type  : String
    } ,
    outCome :  {
        type :String 
    } ,
    actonItems  : { 
        type : String 
    },
    status : { 
        type : Number ,
        default : 0

        //0-> enabled
        //1-> disabled
    }
})


const Model =  mongoose.model("VisitDetails" , visitDetailsSchema) ;



module.exports =  Model ;
