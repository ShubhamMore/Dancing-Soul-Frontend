import { FileModel } from './file.model';

export class NewsModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public title: string,
    public body: string,
    public file: FileModel
  ) {}
}
