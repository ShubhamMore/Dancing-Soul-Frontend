export class ReceiptModule {
    public _id: string;
    public student: string;
    public amount: string;
    public months: string;
    public receiptDate: string;
    public paymentMode: string;
    
    constructor(_id: string, student: string, amount: string, months: string, receiptDate: string, paymentMode: string) {
        this._id = _id;
        this.student = student;
        this.amount = amount;
        this.months = months;
        this.receiptDate = receiptDate;
        this.paymentMode = paymentMode;
    }

}