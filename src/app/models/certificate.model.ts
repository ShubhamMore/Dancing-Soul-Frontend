import { ImageModel } from './image.model';

export class CertificateModel {
  // tslint:disable-next-line: variable-name
  constructor(public _id: string, public student: string, public certificateImages: ImageModel[]) {}
}
