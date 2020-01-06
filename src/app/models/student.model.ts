import { ImageModel } from './image.model';

export class StudentModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public name: string,
    public birthDate: string,
    public bloodGroup: string,
    public workPlace: string,
    public image: ImageModel,
    public firstGuardianName: string,
    public firstGuardianRelation: string,
    public secondGuardianName: string,
    public secondGuardianRelation: string,
    public medicalHistory: string,
    public phone: string,
    public email: string,
    public address: string,
    public branch: string,
    public batch: string,
    public batchType: string,
    public status: string
  ) {}
}
