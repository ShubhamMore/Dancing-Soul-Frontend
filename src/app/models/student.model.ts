export class StudentModel {
    public _id: string;
    public name: string;
    public birthDate : string;
    public bloodGroup : string;
    public workPlace : string;
    public image: string;
    public firstGuardianName : string;
    public firstGuardianRelation : string;
    public secondGuardianName : string;
    public secondGuardianRelation : string;
    public medicalHistory : string;
    public phone : string;
    public email : string;
    public address : string;
    public branch : string;
    public batch : string;
    public batchName : string;
    public status : string;
    constructor (id:string, name: string, birthDate : string, bloodGroup : string, workPlace : string, image: string, firstGuardianName : string, firstGuardianRelation : string, secondGuardianName : string, secondGuardianRelation : string, medicalHistory: string, phone : string, email : string, address : string, branch : string, batch : string, batchName : string, status : string) {
        this._id = id;
        this.name = name;
        this.birthDate = birthDate;
        this.bloodGroup = bloodGroup;
        this.workPlace = workPlace;
        this.image = image;
        this.firstGuardianName = firstGuardianName;
        this.firstGuardianRelation = firstGuardianRelation;
        this.secondGuardianName = secondGuardianName;
        this.secondGuardianRelation = secondGuardianRelation;
        this.medicalHistory = medicalHistory;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.branch = branch;
        this.batch = batch;
        this.batchName = batchName;
        this.status = status;
    }
}