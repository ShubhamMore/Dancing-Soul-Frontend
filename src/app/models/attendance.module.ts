export class AttendanceModel {

    public _id: string; 
    public date: string;
    public branch: string;
    public batch: string;
    public batchName: string;
    public attendance: StudentAttendanceModel[] = [];

    constructor(_id: string, date: string, branch: string, batch: string, batchName: string, attendance: StudentAttendanceModel[]) {
        this._id = _id;
        this.date = date;
        this.branch = branch;
        this.batch = batch;
        this.batchName = batchName;
        this.attendance = attendance;
    }
}

export class StudentAttendanceModel {
    public _id: string; 
    public student: string;
    public attendanceStatus: string;

    constructor(_id: string, student: string, attendanceStatus: string) {
        this._id = _id;
        this.student = student;
        this.attendanceStatus = attendanceStatus;
    }
}