import { ImageModel } from './image.model';

export class ArticleModel {
    public _id: string;
    public title: string;
    public body: string;
    public image: ImageModel;

    constructor(_id: string, title: string, body: string, image: ImageModel) {
        this._id = _id;
        this.title = title;
        this.body = body;
        this.image = image;
    }
}
