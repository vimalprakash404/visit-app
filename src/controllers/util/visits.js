const { isValidObjectId } = require("mongoose")
const visitModel = require("../../models/visits")

function validation({ dateAndTime, visitType, purpose, contactPerson, additionalNotes, employeeId }){
    if (typeof (dateAndTime) !== "string") throw new Error("not valid date ");
    if (typeof (visitType) !== "string") throw new Error("not visit type");
    if (typeof (purpose) !== "string") throw new Error("not valid purpose ");
    if (!isValidObjectId(contactPerson)) throw new Error("invalid contact person id ");
    if (typeof (additionalNotes) !== "string") throw new Error("invalid  additional note");
    if (!isValidObjectId(employeeId)) throw new Error("invalid employee id ");
}


class Visit {
    constructor({ dateAndTime, visitType, purpose, contactPerson, additionalNotes, employeeId }) {
        validation({ dateAndTime, visitType, purpose, contactPerson, additionalNotes, employeeId });
        this.dateAndTime = dateAndTime;
        this.visitType = visitType;
        this.purpose = purpose;
        this.contactPerson = contactPerson;
        this.additionalNotes = additionalNotes;
        this.employeeId = employeeId;
    }

    static async create({ dateAndTime, visitType, purpose, contactPerson, additionalNotes, employeeId }) {
        const visitObject = await visitModel({ visitDateTime: dateAndTime, purpose, contactPersonId: contactPerson, additionalNotes, employeeId })
        visitObject.save();
        return new Visit({
            id: visitObject._id, dateAndTime, visitType, purpose, contactPerson, additionalNotes, employeeId
        })

    }

    static async  get(id) {
        const visitObject = await visitModel.findOne({ "_id": id })
        if (visitObject) {
            return new Visit({
                id: visitObject._id,
                dateAndTime: visitObject.visitDateTime,
                visitType: visitObject.visitType,
                purpose: visitObject.purpose,
                contactPerson: visitObject.contactPersonId, 
                additionalNotes : visitObject.additionalNotes ,
                employeeId : visitObject.employeeId ,
            })
        }
        else {
            return undefined
        }
    }

}

module.exports = Visit 