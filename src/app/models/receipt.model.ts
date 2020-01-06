export class ReceiptModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public student: string,
    public amount: string,
    public feeDescription: string,
    public receiptDate: string,
    public paymentMode: string,
    public feeType: string
  ) {}
}
