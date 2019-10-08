import { Component, OnInit } from '@angular/core';
import { StudentModel } from '../../models/student.model';
import { BatchModel } from '../../models/branch.model';
import { BranchModel } from '../../models/branch.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AttendanceService } from '../../services/attendance.service';
import { BranchService } from '../../services/branch.service';

@Component({
  selector: 'app-admin-attendance',
  templateUrl: './admin-attendance.component.html',
  styleUrls: ['./admin-attendance.component.css']
})
export class AdminAttendanceComponent implements OnInit {

  weekType = "0";

  form: FormGroup;

  loading: boolean = true;

  error: string = null;

  students: StudentModel[] = [];

  attendance: any[] = [] ;

  noStudent = 'Please Select Branch';

  branches: BranchModel[] = [];
  branch : string = '';

  batches: BatchModel[] = [];
  batch: string = '';

  date : string;

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

      }
      this.loading = false;
    },
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

  onSelectBranch() {
    this.branch = this.form.value.branch;
      if(this.branch !== '') {
      this.batches = this.branches.find((branch) => (branch._id === this.branch)).batch;
      this.onSelectBatch();
    }
  }

  onSelectBatch() {
    this.batch = this.form.value.batch;
    if(this.batch !== '') {
      this.searchStudent(this.branch, this.batch, this.weekType);
    }
    else {
      this.students = [];
      this.noStudent = 'Please Select ' + (this.weekType === "0" ? "Week Day" : "Week End") + ' Batch';
    }
  }

  onSelectBatchType() {
    this.weekType = this.form.value.weekType;
    if(this.batch !== '') {
      this.form.patchValue({batch: ''});
      this.onSelectBatch();
    }
  }

  searchStudent(branch: string, batch: string, batchType: string) {
    this.loading = true;
    this.attendanceService.getStudentsForAttendance(branch, batch, batchType)
    .subscribe((responce: StudentModel[]) => {
      this.students = responce;
      if (this.students.length < 1) {
        this.noStudent = 'No Students Found';
      }

      this.students.forEach((student) => {
        const attendance = {
          student: student._id,
          attendanceStatus: "0"
        }
        this.attendance.push(attendance);
      });

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
        attendance: this.attendance
      }

      console.log(attendance)
      
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
        this.attendance = [];
      },(error: any) => {
        this.setError(error)    
      });
    }
  }

  markAttendance(event: any, student: string, index: number) {
    if(event.target.checked) {
      this.attendance[index].attendanceStatus = "1";
    }
    else {
      this.attendance[index].attendanceStatus = "0";

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
