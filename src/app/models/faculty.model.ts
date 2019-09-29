import { ImageModel } from './image.model';

export class Faculty {
    
    public _id: string;
    public name:string;
    public birthDate: string;
    public description:string;
    public image: ImageModel;
    public email:string;
    public phone:string;
    public status: string;

    constructor(id: string, name:string, birthDate: string, description:string, image:ImageModel, email:string, phone:string, status: string) {
        this._id = id;
        this.name = name;
        this.birthDate = birthDate;
        this.description = description;
        this.image = image;
        this.email = email;
        this.phone = phone;
        this.status = status;
    }
}