const { isValidObjectId } = require("mongoose");
const contactPersonModel = require("../../models/contactPersons");


function isValidPhoneNumber(phoneNumber) {
    var phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    return phonePattern.test(phoneNumber)
}


function isValidEmail(email) {
    var emailPattern = /^[^\s@]+@[^\s@]+[^\s@]+$/;
    return emailPattern.test(email);
}
class ContactPerson {
    constructor({id , contactName ,  organizationId, designation , phone , email}) {
        this.id = id ;
        this.contactName =  contactName ;
        this.organizationId  =  organizationId ;
        this.designation = designation ;
        this.phone =  phone ;
        this.email  = email ;
    }

    static async get(id) {
        if (!isValidObjectId(id)) throw new Error("Not valid Object for getting  the async");
        const contactPersonObject = await contactPersonModel.findOne({ _id: id });
        
        
        if (contactPersonObject) {
            const val= new ContactPerson({
                id : id,
                contactName : contactPersonObject.name ,
                organizationId :contactPersonObject.organizationId ,
                designation : contactPersonObject.designation ,
                phone : contactPersonObject.phone ,
                email : contactPersonObject.email 
            }) ;
            console.log(val)
            return val ;
        }
        else {
            throw new Error("User not found ")
        }
    }


    static async create(organizationId, name, designation, phone, email) {
        console.log(isValidPhoneNumber("1234567890"))
        if (!isValidObjectId(organizationId)) throw new Error("not valid object id");
        if (!isValidPhoneNumber(phone)) throw new Error("not valid number");
        if (!isValidEmail(email)) throw new Error("not valid email");
        if (typeof (name) !== "string") throw new Error("not valid name ");
        if (typeof (designation) !== "string") throw new Error("not valid designation ");
        const contactPersonObject = await contactPersonModel({ organizationId: organizationId, name, designation, phone, email });
        contactPersonObject.save();
        return new ContactPerson({
            id  :  contactPersonObject._id ,
            contactName  : contactPersonObject.name ,
            designation : contactPersonObject.designation ,
            organizationId : contactPersonObject.organizationId ,
            email : contactPersonObject.email ,
            phone  : contactPersonObject.phone 
        })
    }


    async disable() {
        await contactPersonModel.updateOne({ _id: this.id }, { status: 0 })
    }


    async enable() {
        await contactPersonModel.updateOne({ _id: this.id }, { status: 1 })
    }



    async update({ organizationId, name, designation, phone, email }) {
        if (!isValidObjectId(organizationId)) throw new Error("not valid object id");
        if (!isValidPhoneNumber(phone)) throw new Error("not valid number");
        if (!isValidEmail(email)) throw new Error("not valid email");
        if (typeof (name) !== "string") throw new Error("not valid name ");
        if (typeof (designation) !== "string") throw new Error("not valid designation ");
        await contactPerson.updateOne(
            { _id: this.id },
            {
                organizationId: organizationId || this.organizationId,
                name: name || this.organizationId,
                designation: designation || this.designation,
                phone: phone || this.phone,
                email: email || this.email
            }
        );
        this.contactName = name !== undefined ? name : this.contactName;
        this.organizationId = organizationId !== undefined ? organizationId : this.organizationId;
        this.phone = phone !== undefined ? phone : this.phone;
        this.designation = designation !== undefined ? designation : this.designation;
        this.email = email !== undefined ? email : this.email;
    }
}


module.exports = ContactPerson;