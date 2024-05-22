const organizationModel = require("../../models/organization");

class Organization {
    constructor({ orgName, place, state, district, longitude, latitude, id }) {
        if (typeof orgName !== 'string') throw new Error("name not specified or invalid while created in organization");
        if (typeof place !== 'string') throw new Error("place not specified or place must be string type");
        if (typeof district !== 'string') throw new Error("district not specified or invalid data");
        if (typeof longitude !== "string") throw new Error("invalid longitude");
        if (typeof latitude !== "string") throw new Error("invalid latitude");
        if (typeof state !== "string") throw new Error("invalid state");

        this.orgName = orgName;
        this.place = place;
        this.district = district;
        this.longitude = longitude;
        this.latitude = latitude;
        this.state = state;
        this.id = id;
    }

    static async get({ id }) {
        if (id !== undefined) {
            const organizationObject = await organizationModel.findOne({ _id: id });
            if (organizationObject) {
                return new Organization({
                    orgName: organizationObject.organizationName,
                    place: organizationObject.place,
                    state: organizationObject.state,
                    district: organizationObject.district,
                    longitude: organizationObject.longitude,
                    latitude: organizationObject.latitude,
                    id: organizationObject._id
                });
            } else {
                throw new Error("organization not found");
            }
        } else {
            throw new Error("id undefined");
        }
    }

    async update(params) {
        const { orgName, place, state, district, longitude, latitude } = params;
        try {
            await organizationModel.updateOne(
                { _id: this.id },
                {
                    organizationName: orgName || this.orgName,
                    place: place || this.place,
                    district: district || this.district,
                    state: state || this.state,
                    longitude: longitude || this.longitude,
                    latitude: latitude || this.latitude
                }
            );
            
            this.orgName = orgName !== undefined ? orgName : this.orgName;
            this.place = place !== undefined ? place : this.place;
            this.district = district !== undefined ? district : this.district;
            this.longitude = longitude !== undefined ? longitude : this.longitude;
            this.latitude = latitude !== undefined ? latitude : this.latitude;
            this.state = state !== undefined ? state : this.state;
            return this;
        } catch (error) {
            console.error(error);
            throw new Error("Error updating organization");
        }
    }

    async enable(){
        await organizationModel.updateOne({_id : this.id }, {status:1} );
    }

    async  disable() {
        await organizationModel.updateOne({_id : this.id }, {status:0} );
    }
}

module.exports = Organization;
