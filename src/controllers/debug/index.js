const sample = require("../util/organization")
const contactPerson = require("../util/contactPerson")
const department = require("../util/Department")
const designation = require("../util/designation");
const employee =  require("../util/employee");
const visit = require("../util/visits")


const debug = async (req, res) => {
    // const employeeObject =await   employee.create({employeeId : "141"  , userId : "6643605da46cb76a5003a612" , designation : "664c857c3f1b93cf8d73b618"})

    // const employeeObject = await employee.get("664cc55b63b1a23e57bde8e2")

    // console.log(await employeeObject.enable())

    const visitObject =  await visit.create({dateAndTime : Date() , visitType : "simple" , purpose : "sales" , contactPerson :  "664c5bcb297b380c77030c73" , additionalNotes : "good" , employeeId : "664cc55b63b1a23e57bde8e2"})
    res.send("hello")
}


module.exports = { debug }