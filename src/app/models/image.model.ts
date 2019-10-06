export class ImageModel {
    public _id: string;
    public image_name: string;
    public secure_url: string;
    public public_id: string;
    public created_at: string;
    public width: string;
    public height: string;
    
    constructor(_id: string, image_name: string, secure_url: string, public_id: string, created_at: string, width: string, height: string) {
        this._id = _id;
        this.image_name = image_name;
        this.secure_url = secure_url;
        this.public_id = public_id;
        this.created_at = created_at;
        this.width = width;
        this.height = height;
    }
}
