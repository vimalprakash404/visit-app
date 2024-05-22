const mongoose = require("mongoose")
const Schema = mongoose.Schema;



const documentSchema = new Schema(
    {
        documentName: {
            type: String ,
            require : true 
        } ,
        documentType  : { 
            type : String ,
            require : true 
        } ,
        // file path 
        documentFile : { 
            type  : String  ,
            require  : true 
        } ,

        UploadedDate:  {
            type : date ,
            default : Date()
        },
        status : { 
            type : Number ,
            default : 0

            //0-> enabled
            //1-> disabled
        }
    }
)



const Model = mongoose.Model("Documents" , documentSchema) ;


module.exports = Model ;