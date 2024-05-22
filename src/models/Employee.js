const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const employeeSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  designation: {
    type: Schema.Types.ObjectId ,
    ref : "Designation"
  },
  employeeId : { 
    type : String 
  },
  status: {
    type: Number,
    default: 0

    //0-> enabled
    //1-> disabled
  }
})


const Model = mongoose.model("Employee", employeeSchema);


module.exports = Model;