import { BuiltinTypeName } from '@angular/compiler';

export class Branch {

    public _id:string; 
    public branch:string;
    public city:string;
    public address:string;
    public email:string;
    public phone:string;
    public description:string;
    public images: string;
    public batch: BatchModel[];
    public status: string;

    constructor(id: string, branch:string, city: string ,address:string , email:string , phone:string, description: string, images: string, batch: BatchModel[], status: string) {
        this._id = id;
        this.city = city;
        this.branch = branch;
        this.address = address;
        this.email = email;
        this.phone = phone;
        this.description = description;
        this.images = images;
        this.batch = batch;
        this.status = status;
    }
}

export class BatchModel {
    public _id : string;
    public batchType: string;
    public days: string;
    public batchName: string;
    public time: string;
    public fees: string;
    
    constructor(_id : string, batchType : string, days: string, batchname: string, time: string, fees: string) {
        this._id = _id;
        this.batchType = batchType;
        this.days = days;
        this.batchName = batchname;
        this.time = time;
        this.fees = fees;
    }
}