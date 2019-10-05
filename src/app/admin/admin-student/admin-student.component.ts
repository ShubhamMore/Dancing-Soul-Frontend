import { Component, OnInit } from '@angular/core';
import { StudentModel } from '../../models/student.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Branch, BatchModel } from '../../models/branch.model';
import { HttpService } from '../../services/httpPost.service';

@Component({
  selector: 'app-admin-student',
  templateUrl: './admin-student.component.html',
  styleUrls: ['./admin-student.component.css']
})
export class AdminStudentComponent implements OnInit {

  weekType = "0";

  loading: boolean = true;

  error : string = null;

  allStudents : StudentModel[] = [];
  students : StudentModel[] = [];

  noStudent = 'Please Select Branch';

  branches: Branch[] = [];
  branch : string = '';

  batches: BatchModel[] = [];
  batch: string = '';

  constructor(private httpPostService: HttpService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const branchData = { api : "getBranches", data : { }}
    this.httpPostService.httpPostAuth(branchData).subscribe((val) => {

     this.branches = val;
     if(this.branches.length > 0) {
       const studentData = { api : "getStudents", data : { }}
       this.httpPostService.httpPostAuth(studentData).subscribe((val) => {
         this.allStudents = val;
         this.loading = false;
        },
        (error) => {
          this.setError(error)
        });
      }
      else {
        this.loading = false;
     }
    },
    (error) => {
      this.setError(error)
    });
  }

  onNewStudent() {
    this.loading = true;
      this.router.navigate(['new'], {relativeTo:this.route, skipLocationChange: true});
  }

  onSelectBranch(id:string) {
    if(id !== '') {
      this.branch = id;
      this.batches = this.branches.find((branch) => (branch._id === id)).batch;
      this.onSelectBatchName('');
    }
  }

  onSelectBatchName(batch:string) {
    this.batch = batch;
    if(batch !== '') {
      this.searchStudent();
    }
    else {
      this.students = [];
      this.noStudent = 'Please Select ' + (this.weekType === "0" ? "Week Day" : "Week End") + ' Batch';
    }
  }

  onSelectBatchType(weekType:string) {
    if(this.batch !== '') {
      this.weekType = weekType;
      this.onSelectBatchName('');
    }
  }

  searchStudent() {
    this.loading = true;
    const students : StudentModel[] = [];
    this.allStudents.forEach((student) => {
      if((student.branch === this.branch) && (student.batchName === this.batch) && (student.batch === this.weekType)) {
        students.push(student);
      }
    });
    if(students.length > 0) {
      this.students = students;
    }
    else {
      this.noStudent = "No Students Found";
      this.students = [];
    }
    this.loading = false;
  }

  setError(err : string) {
		this.error = err;
		this.loading = false;
	}

	clearErr() {
		this.error = null;
	}
} 