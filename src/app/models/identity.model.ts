import { ImageModel } from './image.model';

export class IdentityModel {

    public _id: string;
    public student: string;
    public identityImages: ImageModel[];

    constructor(_id: string, student: string, identityImages: ImageModel[]) {
        this._id = _id;
        this.student = student;
        this.identityImages = identityImages;
    }
}
