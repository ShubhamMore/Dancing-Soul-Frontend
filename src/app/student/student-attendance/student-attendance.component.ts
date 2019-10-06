import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../../services/httpPost.service';
import { BatchModel } from '../../models/branch.model';
import { BranchModel } from '../../models/branch.model';
import { StudentModel } from '../../models/student.model';
import { AttendanceModel } from '../../models/attendance.module';

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.css']
})
export class StudentAttendanceComponent implements OnInit {
  student: StudentModel;

  attendance: AttendanceModel[] = [];

  loading: boolean = true;
  error: string = null;

  branch: BranchModel;

  batch: BatchModel;
  
  constructor(private httpPostService: HttpService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.queryParams.
    subscribe(
      (params: Params) => {
        const _id = params['id'];
        const studentData = { api: "getStudent", data: { _id }}
        this.httpPostService.httpPostAuth(studentData).subscribe((val) => {
          this.student = val;

          const studentData = {
            branch: this.student.branch,
            batch: this.student.batchName,
            batchType: this.student.batch
          }
          
          const data = { api: "getAttendance", data: studentData}
          this.httpPostService.httpPostAuth(data).subscribe((val) => {
            this.attendance = val;
            this.loading = false;
          },(error) => {
            this.setError(error)
          });
        },
        (error) => {
          this.setError(error)
        });
      }
    );
  }

  checkAttendance(index: number): string {
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

	setError(err: string) {
		this.error = err;
		this.loading = false;
	}

	clearError() {
		this.error = null;
	}
}
