import { Component, OnInit } from '@angular/core';
import { StudentModel } from '../../models/student.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Branch, BatchModel } from '../../models/branch.model';
import { HttpService } from '../../services/httpPost.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  student: StudentModel;

  loading : boolean = true;

  error : string = null;

  branch : Branch;

  batch: BatchModel;

  constructor(private httpPostService: HttpService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.queryParams.
    subscribe(
      (params: Params) => {
        const _id = params["id"];
        const studentData = { api : "getStudent", data : { _id }}
        this.httpPostService.httpPostAuth(studentData).subscribe((val) => {
         this.student = val;
         const branchData = { api : "getBranch", data : { _id : this.student.branch }}
         this.httpPostService.httpPostAuth(branchData).subscribe((val) => {
           this.branch = val;
           this.batch = this.branch.batch.find(batch => (batch._id === this.student.batchName && batch.batchType === this.student.batch));
           this.loading = false;
         },
         (error) => {
           this.setError(error)
          });
        },
        (error) => {
          this.setError(error)
        }); 
      }
    );
  }

	setError(err : string) {
		this.error = err;
		this.loading = false;
	}

	clearErr() {
		this.error = null;
	}
}