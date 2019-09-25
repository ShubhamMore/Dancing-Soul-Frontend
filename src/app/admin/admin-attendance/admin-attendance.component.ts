import { Component, OnInit } from '@angular/core';
import { StudentModel } from '../../models/student.model';
import { BatchModel } from '../../models/branch.model';
import { Branch } from '../../models/branch.model';
import { HttpService } from '../../services/httpPost.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-attendance',
  templateUrl: './admin-attendance.component.html',
  styleUrls: ['./admin-attendance.component.css']
})
export class AdminAttendanceComponent implements OnInit {

  weekType = "WeekDays";

  form : FormGroup;

  loading: boolean = true;  

  allStudents : StudentModel[] = [];
  students : StudentModel[] = [];

  attendance : string[] = [] ;

  present : string[] = [];
  absent : string[] = [];

  noStudent = 'Please Select Branch';

  branches: Branch[] = [];
  branch : string = '';

  batches: BatchModel[] = [];
  batch: string = '';

  date : string;

  constructor(private httpPostService: HttpService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    const date = new Date();
    this.date = date.getFullYear()+"-"+this.zeroAppend(date.getMonth() + 1)+"-"+this.zeroAppend(date.getDate());

    this.form = new FormGroup({
      branch : new FormControl("", {
        validators: [Validators.required]
      }),
      batch : new FormControl("", {
        validators: [Validators.required]
      }),
      weekType : new FormControl(this.weekType, {
        validators: [Validators.required]
      }),
      date : new FormControl(this.date, {
        validators: [Validators.required]
      })
    });

    const branchData = { api : "getBranches", data : { }}
    this.httpPostService.httpPost(branchData).subscribe((val) => {
     this.branches = val;
     if(this.branches.length > 0) {
       const studentData = { api : "getStudents", data : { }}
       this.httpPostService.httpPost(studentData).subscribe((val) => {
         this.allStudents = val;
         this.loading = false;
       },
       (error) => {
        this.loading = false;
       });
     }
    },
    (error) => {
    });
  }

  zeroAppend(n : number) : string {
    if(n < 10) {
      return ("0" + n).toString();
    }
    return n.toString();
  }


  onSelectBranch() {
    const id = this.form.value.branch;
    if(id !== '') {
      this.branch = id;
      this.batches = this.branches.find((branch) => (branch._id === id)).batch;
      console.log(this.batches)
      this.noStudent = 'Please Select ' + this.weekType + ' Batch';
    }
  }

  onSelectBatchName() {
    const batch = this.form.value.batch;
    if(batch !== '') {
      this.batch = batch;
      this.searchStudent();
    }
  }

  onSelectBatchType() {
    const weekType = this.form.value.weekType;
    if(this.batch !== '') {
      this.weekType = weekType;
      this.searchStudent();
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
      students.forEach((student) => {
        this.absent.push(student._id);
        this.attendance.push("A");
      })
    }

    else {
      this.noStudent = "No Students Found";
      this.students = [];
    }
    this.loading = false;
  }

  addAttendance() {
    if(this.form.valid) {
      this.loading = true;
      const attendance = {
        date : this.form.value.date,
        branch : this.form.value.branch,
        batch : this.form.value.batch,
        batchType : this.form.value.weekType,
        present : this.present,
        absent : this.absent
      }
      console.log(attendance);
      const data = { api : "saveAttendance", data : attendance}
      this.httpPostService.httpPostAuth(data).subscribe((val) => {
        this.loading = false;
        this.form.reset({
          branch : "",
          batch : "",
          weekType : this.weekType,
          date : this.date
        });
        this.students = [];
        this.absent = [];
        this.present = [];
      },(error) => {
        this.loading = false;
      });
    }
  }

  markAttendance(event: any, student : string, index: number) {
    if(event.target.checked) {
      const i : number = this.absent.findIndex((absentStudent) => absentStudent === student);
      if(i !== undefined) {
        this.absent.splice(i, 1);
        this.present.push(student);
        this.attendance[index] = "P";
      }
    }
    else {
      const i : number = this.present.findIndex((presentStudent) => presentStudent === student);
      if(i !== undefined) {
        this.present.splice(i, 1);
        this.absent.push(student);
        this.attendance[index] = "A";
      }
    }
  }
}