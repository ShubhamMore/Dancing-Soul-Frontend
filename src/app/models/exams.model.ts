import { FileModel } from './file.model';

export class ExamModel {
  // tslint:disable-next-line: variable-name
  constructor(
    public _id: string,
    public title: string,
    public body: string,
    public file: FileModel
  ) {}
}
