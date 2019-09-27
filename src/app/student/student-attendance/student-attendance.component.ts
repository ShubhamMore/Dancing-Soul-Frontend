import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../../services/httpPost.service';
import { BatchModel } from '../../models/branch.model';
import { Branch } from '../../models/branch.model';
import { StudentModel } from '../../models/student.model';
import { Attendance } from '../../models/attendance.module';

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.css']
})
export class StudentAttendanceComponent implements OnInit {
  student: StudentModel;

  attendance: Attendance[] = [];

  loading : boolean = true;

  branch : Branch;

  batch: BatchModel;
  
  constructor(private httpPostService: HttpService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.queryParams.
    subscribe(
      (params: Params) => {
        const _id = params['id'];
        const studentData = { api : "getStudent", data : { _id }}
        this.httpPostService.httpPostAuth(studentData).subscribe((val) => {
          this.student = val;

          const studentData = {
            branch : this.student.branch,
            batch : this.student.batchName,
            batchType : this.student.batch
          }
          
          const data = { api : "getAttendance", data : studentData}
          this.httpPostService.httpPostAuth(data).subscribe((val) => {
            this.attendance = val;
            this.loading = false;
          },(error) => {
            this.loading = false;
          });
        },
        (error) => {
          this.loading = false;
        });
      }
    );
  }

  checkAttendance(index : number) : string {
    const attendance = this.attendance[index];
    if(attendance.present.indexOf(this.student._id)!=-1) {
      return "Present";
    }
    else if(attendance.absent.indexOf(this.student._id)!=-1) { 
      return "Absent";      
    }
    else {
      return "Absent";
    }
  }
}
