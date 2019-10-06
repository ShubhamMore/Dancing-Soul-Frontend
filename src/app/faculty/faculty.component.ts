import { Component, OnInit } from '@angular/core';
import { StudentModel } from '../models/student.model';
import { BatchModel } from '../models/branch.model';
import { BranchModel } from '../models/branch.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AttendanceService } from '../services/attendance.service';
import { BranchService } from '../services/branch.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {

  weekType = "0";

  form: FormGroup;

  loading: boolean = true;

  error: string = null;

  students: StudentModel[] = [];

  attendance: string[] = [] ;

  present: string[] = [];
  absent: string[] = [];

  noStudent = 'Please Select Branch';

  branches: BranchModel[] = [];
  branch: string = '';

  batches: BatchModel[] = [];
  batch: string = '';

  date: string;

  constructor(private attendanceService: AttendanceService,
              private branchService: BranchService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    const date = new Date();
    this.date = date.getFullYear() + "-" + this.zeroAppend(date.getMonth() + 1) + "-" + this.zeroAppend(date.getDate());

    this.form = new FormGroup({
      branch: new FormControl("", {
        validators: [Validators.required]
      }),
      batch: new FormControl("", {
        validators: [Validators.required]
      }),
      weekType: new FormControl(this.weekType, {
        validators: [Validators.required]
      }),
      date: new FormControl(this.date, {
        validators: [Validators.required]
      })
    });

    this.branchService.getBranches()
    .subscribe((responce: BranchModel[]) => {
     this.branches = responce;
     if(this.branches.length > 0) {

    }},
    (error: any) => {
      this.setError(error);
    });
  }

  zeroAppend(n : number) : string {
    if(n < 10) {
      return ("0" + n).toString();
    }
    return n.toString();
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
      this.searchStudent(this.branch, this.batch, this.weekType);
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

  searchStudent(branch: string, batch: string, batchType: string) {
    this.loading = true;
    this.attendanceService.getStudentsForAttendance(branch, batch, batchType)
    .subscribe((responce: StudentModel[]) => {
      this.students = responce;
      if(this.students.length > 0) {
        this.students.forEach((student) => {
          this.absent.push(student._id);
          this.attendance.push("A");
        })
      } else {
        this.noStudent = "No Students Found";
        this.students = [];
      }
      this.loading = false;
    },
    (error: any) => {
      this.setError(error);
    });
  }

  addAttendance() {
    if(this.form.valid) {
      this.loading = true;
      const attendance = {
        date: this.form.value.date,
        branch: this.form.value.branch,
        batch: this.form.value.batch,
        batchType: this.form.value.weekType,
        present: this.present,
        absent: this.absent
      }
      
      this.attendanceService.saveAttendance(attendance)
      .subscribe((responce: any) => {
        this.loading = false;
        this.form.reset({
          branch: "",
          batch: "",
          weekType: this.weekType,
          date: this.date
        });
        this.students = [];
        this.absent = [];
        this.present = [];
      },(error: any) => {
        this.setError(error)    
      });
    }
  }

  markAttendance(event: any, student: string, index: number) {
    if(event.target.checked) {
      const i: number = this.absent.findIndex((absentStudent) => absentStudent === student);
      if(i !== undefined) {
        this.absent.splice(i, 1);
        this.present.push(student);
        this.attendance[index] = "P";
      }
    }
    else {
      const i: number = this.present.findIndex((presentStudent) => presentStudent === student);
      if(i !== undefined) {
        this.present.splice(i, 1);
        this.absent.push(student);
        this.attendance[index] = "A";
      }
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
