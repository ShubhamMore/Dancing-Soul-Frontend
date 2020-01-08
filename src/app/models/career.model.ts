import { FileModel } from './file.model';

export class CareerModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public name: string,
    public email: string,
    public phone: string,
    public description: string,
    public coverLatter: FileModel,
    public resume: FileModel
  ) {}
}
