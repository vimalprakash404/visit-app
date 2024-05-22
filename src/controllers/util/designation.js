const { isValidObjectId } = require("mongoose");
const designationModel = require("../../models/Designation");



class Designation{
    constructor ({id , name , department }){
        if(!isValidObjectId(id)) throw new Error("not valid id ")
        if(typeof(name) !== "string") throw new Error("not valid name") ;
        if(!isValidObjectId(id)) throw new Error("not valid department ")
        this.id =  id ;
        this.name =  name  ;
        this.department  = department ;
    }


    static async get (id) { 
        const designationObject  = await designationModel.findOne({_id: id});
        if(!designationObject ) throw new Error("designation not found");
        return new Designation( {
            id : designationObject._id,
            name :  designationObject.name ,
            department : designationObject.department
        })
    }


    static async create({name  , department}) { 
        if(typeof(name) !== "string") throw new Error("not valid name") ;
        if(!isValidObjectId(id)) throw new Error("not valid department ")
        const designationObject =  designationModel({department : department , name : name });
        await designationObject.save();
        return new Designation({
            id : designationObject.id ,
            name  :  designationObject.name ,
            department : designationObject.department
        })
    }


    async disable(){
         await designationModel.updateOne({_id : this.id} , {status : 0});
    }


    async enable(){
        await designationModel.updateOne({_id : this.id} , {status : 1})
    }
}


module.exports =  Designation ;