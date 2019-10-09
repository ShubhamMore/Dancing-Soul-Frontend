export class IdentityModel {

    public _id: string;
    public student: string;
    public identityImages: IdentityImageModel[];

    constructor(_id: string, student: string, identityImages: IdentityImageModel[]) {
        this._id = _id;
        this.student = student;
        this.identityImages = identityImages;
    }
}

export class IdentityImageModel {
    public _id: string;
    public image_name: string;
    public identity_type: string;
    public secure_url: string;
    public public_id: string;
    public created_at: string;
    public width: string;
    public height: string;
    
    constructor(_id: string, image_name: string, identity_type: string, secure_url: string, public_id: string, created_at: string, width: string, height: string) {
        this._id = _id;
        this.image_name = image_name;
        this.identity_type = identity_type;
        this.secure_url = secure_url;
        this.public_id = public_id;
        this.created_at = created_at;
        this.width = width;
        this.height = height;
    }
}
