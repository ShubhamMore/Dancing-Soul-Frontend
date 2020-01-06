import { ImageModel } from './image.model';

export class BranchModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public branch: string,
    public city: string,
    public address: string,
    public email: string,
    public phone: string,
    public description: string,
    public images: ImageModel[],
    public batch: BatchModel[],
    public status: string
  ) {}
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
