const { isValidObjectId } = require("mongoose");
const DepartmentModel = require("../../models/Department");

class Department{
    constructor({id , name}){
        if(!isValidObjectId(id)) throw new Error("not Object in Department ");
        console.log(name)
        if(typeof(name)!== "string")throw new Error("not valid name in department")
        this.id = id,
        this.name = name
    }


    static async create({departmentName}){
        const departmentObject  =  await DepartmentModel({name :departmentName });
        departmentObject.save();
        console.log(departmentObject)
        return new Department({
            id : departmentObject._id , name : departmentObject.name 
        })
    }

    static async get(id) {
        try{
            const departmentObject = await DepartmentModel.findOne({_id :id});
            return new Department({
                id : departmentObject._id , name : departmentObject.name 
            })
        }
        catch(error){
            console.error(error)
        }
       
    }

    async disable(){
        await DepartmentModel.updateOne({_id:this.id},{status : 0})
    }
    
    
    async enable() {
        await DepartmentModel.updateOne({_id :this.id},{status  : 1 })
    }

    async update({name}) {
        if (typeof(name) !== "string") throw new Error("not valid name ") 
        this.name =  name ;
        await DepartmentModel.updateOne({_id:this.id} , {name : name })
    }
}


module.exports = Department ; 