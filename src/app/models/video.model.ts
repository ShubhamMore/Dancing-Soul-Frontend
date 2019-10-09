export class VideoModel {
    public _id: string;
    public title: string;
    public url: string;
    public created_at: string;
    
    constructor(_id: string, title: string, url: string, created_at: string) {
        this._id = _id;
        this.title = title;
        this.url = url;
        this.created_at = created_at;
    }
}
