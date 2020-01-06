export class EnquiryModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public name: string,
    public email: string,
    public phone: string,
    public message: string
  ) {}
}
