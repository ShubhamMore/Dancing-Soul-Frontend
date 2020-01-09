export class ImageModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public category: string,
    // tslint:disable-next-line: variable-name
    public image_name: string,
    // tslint:disable-next-line: variable-name
    public secure_url: string,
    // tslint:disable-next-line: variable-name
    public public_id: string,
    // tslint:disable-next-line: variable-name
    public created_at: string,
    public width: string,
    public height: string
  ) {}
}
