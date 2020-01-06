export class AttendanceModel {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public date: string,
    public branch: string,
    public batch: string,
    public batchName: string,
    public attendance: StudentAttendanceModel[]
  ) {}
}

export class StudentAttendanceModel {
  // tslint:disable-next-line: variable-name
  constructor(public _id: string, public student: string, public attendanceStatus: string) {}
}
