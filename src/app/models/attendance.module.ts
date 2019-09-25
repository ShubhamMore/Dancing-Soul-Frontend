export class Attendance {
    public _id : string;
    public date : string;
    public branch : string;
    public batch : string;
    public batchType : string;
    public present : [string];
    public absent : [string];
    
    constructor(_id:string, date: string, branch : string, batch: string, batchType: string, present: [string], absent: [string]) {
        this._id = _id;
        this.date = date;
        this.branch = branch;
        this.batch = batch;
        this.batchType = batchType;
        this.present = present;
        this.absent = absent;
    }
}