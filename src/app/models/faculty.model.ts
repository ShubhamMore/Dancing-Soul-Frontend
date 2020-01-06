import { ImageModel } from './image.model';

export class FacultyModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public name: string,
    public birthDate: string,
    public description: string,
    public image: ImageModel,
    public email: string,
    public phone: string,
    public status: string
  ) {}
}
