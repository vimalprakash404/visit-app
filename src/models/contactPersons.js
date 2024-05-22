const mongoose  =  require("mongoose");
const Schema = mongoose.Schema; 


const contactPersonSchema  = { 
    organizationId :  { 
        type  :  Schema.Types.ObjectId  ,
        ref   :  "Organization"
    } ,
    name : { 
        type : String
    },
    designation :{
        type : String 
    },
    phone  : {
        type : Number ,
        require  : true 
    } ,
    email  :  { 
        type  :  "String"  , 
        require  : true  
    } , 
    status  :  { 
        type  : "Number" , 
        default : 1 
        // enable => 1 ;
        // disable => 2 ;  
    } 
}

const Model =  mongoose.model("Contact Person" , contactPersonSchema);

module.exports =  Model ;