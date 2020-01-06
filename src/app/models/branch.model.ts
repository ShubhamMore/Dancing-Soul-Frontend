import { ImageModel } from './image.model';

export class BranchModel {

    public _id: string; 
    public branch: string;
    public city: string;
    public address: string;
    public email: string;
    public phone: string;
    public description: string;
    public images: ImageModel[];
    public batch: BatchModel[];
    public status: string;
    public weekDayBatch : string[];
    public weekEndBatch : string[];

    constructor(id: string, branch: string, city: string ,address: string , email: string , phone: string, description: string, images: ImageModel[], batch: BatchModel[], status: string,weekDayBatch:string[],weekEndBatch:string[]) {
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
        this.weekDayBatch = weekDayBatch;
        this.weekEndBatch = weekEndBatch;
    }
}

export class BatchModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public batchType: string,
    public days: string,
    public batchName: string,
    public time: string,
    public fees: string
  ) {}
}
