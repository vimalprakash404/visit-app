const mongoose = require("mongoose");

const schema  = new mongoose.Schema({
    organizationName  : {
        type  :  String ,
        required  : true 
    } ,
    place  :  {
        type  : String  ,
        required  : true 
    } ,
    district  :  { 
        type  : String   ,
        require :  true  
    },
    state  : { 
        type  : String  ,
        require  : true 
    } , 
    longitude:  {
        type   : String ,
         require  : true 
    },
    latitude :  { 
        type  : String ,
        require : true
    } ,
    status : { 
        type : Number ,
        default : 1

        //0-> disabled
        //1-> enabled
    }
})


const Model  = mongoose.model("Organization" , schema);



module.exports =  Model;