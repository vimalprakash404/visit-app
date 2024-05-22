const { isValidObjectId } = require("mongoose");
const employeeModel = require("../../models/Employee");


function validation({ userId, designation, employeeId }) {
    console.log("userId" +userId)
    if (!isValidObjectId(userId)) throw new Error("invalid userId")
    if (!isValidObjectId(designation)) throw new Error("invalid designation id")
    if (typeof (employeeId) !== "string") throw new Error("invalid employee id ")
}

class Employee {
    constructor({ id, userId, designation, employeeId }) {

        this.id = id
        this.userId = userId;
        this.designation = designation;
        this.employeeId = employeeId;
    }


    static async create({userId, designation, employeeId}) {
        validation({ userId, designation, employeeId })
        const employeeObject = new employeeModel({ userId, designation, employeeId });
        employeeObject.save()
        return new Employee({
            id: employeeObject._id,
            employeeId: employeeId,
            userId: userId,
            designation: designation
        });
    }

    static async get(id) {
        if (!isValidObjectId(id)) throw new Error("not  valid employee id ")
        const employeeObject = await employeeModel.findOne({ _id: id });
        if (employeeObject) {
            return new Employee({
                id: employeeObject._id,
                employeeId: employeeObject.employeeId,
                userId: employeeObject.userId,
                designation: employeeObject.designation
            });
        }
        else {
            return null;
        }
    }


    async disable() {
        await employeeModel.updateOne({ _id: this.id }, { status: 0 })
    }


    async enable() {
        await employeeModel.updateOne({ _id: this.id }, { status: 1 })
    }
}

module.exports = Employee