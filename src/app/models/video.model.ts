export class VideoModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public title: string,
    public url: string,
    // tslint:disable-next-line: variable-name
    public created_at: string
  ) {}
}
