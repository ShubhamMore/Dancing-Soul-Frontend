export class ReceiptModel{
    public _id: string;
    public student: string;
    public amount: string;
    public feeDescription: string;
    public receiptDate: string;
    public paymentMode: string;
    public feeType: string;
    
    constructor(_id: string, student: string, amount: string, feeDescription: string, receiptDate: string, paymentMode: string, feeType: string) {
        this._id = _id;
        this.student = student;
        this.amount = amount;
        this.feeDescription = feeDescription;
        this.receiptDate = receiptDate;
        this.paymentMode = paymentMode;
        this.feeType = feeType;
    }
}
