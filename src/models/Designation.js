const mongoose  =  require("mongoose")
const Schema = mongoose.Schema ;


const designationSchema = mongoose.Schema({
    department : { 
        type  : Schema.Types.ObjectId ,
        require : true 
    },
    name : { 
        type  : String ,
        require : true 
    }
})


const model =  mongoose.model("Designation", designationSchema);
module.exports = model ;