export class AboutModel {
    public _id : string;
    public aim : string;
    public history: string;
    public philosophy: string;
    constructor(_id: string, aim: string, history: string, philosophy: string) {
        this._id = _id;
        this.aim = aim;
        this.history = history;
        this.philosophy = philosophy;
    }
}