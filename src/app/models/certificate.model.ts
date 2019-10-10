import { ImageModel } from './image.model';

export class CertificateModel {

    public _id: string;
    public student: string;
    public certificateImages: ImageModel[];

    constructor(_id: string, student: string, certificateImages: ImageModel[]) {
        this._id = _id;
        this.student = student;
        this.certificateImages = certificateImages;
    }
}
