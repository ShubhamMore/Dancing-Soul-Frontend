export class Enquiry {
    public _id : string;
    public name : string;
    public email : string;
    public phone : string;
    public message : string;
    constructor(_id:string, name: string, email: string, phone: string, message: string) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.message = message;
    }
}