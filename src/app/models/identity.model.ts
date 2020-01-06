import { ImageModel } from './image.model';

export class IdentityModel {
  // tslint:disable-next-line: variable-name
  constructor(public _id: string, public student: string, public identityImages: ImageModel[]) {}
}
