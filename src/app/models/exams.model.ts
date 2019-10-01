export class ExamModule {
    public _id: string;
    public title: string;
    public body: string;
    
    constructor(_id: string, title: string, body: string) {
        this._id = _id;
        this.title = title;
        this.body = body;
    }
}
