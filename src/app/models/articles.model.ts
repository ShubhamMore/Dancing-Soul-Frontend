import { ImageModel } from './image.model';

export class ArticleModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public title: string,
    public body: string,
    public image: ImageModel
  ) {}
}
