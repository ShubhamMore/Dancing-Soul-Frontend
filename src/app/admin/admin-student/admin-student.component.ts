import { Component, OnInit } from '@angular/core';
import { StudentModel } from '../../models/student.model';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchModel, BatchModel } from '../../models/branch.model';
import { BranchService } from '../../services/branch.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-admin-student',
  templateUrl: './admin-student.component.html',
  styleUrls: ['./admin-student.component.css']
})
export class AdminStudentComponent implements OnInit {

  weekType = "0";

  loading: boolean = true;
  error: string = null;

  students: StudentModel[] = [];

  noStudent = 'Please Select Branch';

  branches: BranchModel[] = [];
  branch: string = '';

  batches: BatchModel[] = [];
  batch: string = '';

  constructor(private branchService: BranchService,
              private studentService: StudentService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.branchService.getBranches()
    .subscribe((responce: BranchModel[]) => {
      this.branches = responce;
      if (this.branches.length > 0) {
      } else {
      }
      this.loading = false;
    },
    (error: any) => {
      this.setError(error);
    });
  }

  onNewStudent() {
    this.loading = true;
      this.router.navigate(['new'], {relativeTo: this.route, skipLocationChange: true});
  }

  onSelectBranch(_id: string) {
    this.branch = _id;
    if (_id !== '') {
      this.batches = this.branches.find((branch) => (branch._id === _id)).batch;
      this.onSelectBatchName('');
    }
  }

  onSelectBatchName(batch: string) {
    this.batch = batch;
    if (batch !== '') {
      this.searchStudent(this.branch, this.batch, this.weekType);
    } else {
      this.students = [];
      this.noStudent = 'Please Select ' + (this.weekType === "0" ? "Week Day" : "Week End") + ' Batch';
    }
  }

  onSelectBatchType(weekType: string) {
    this.weekType = weekType;
    this.onSelectBatchName('');
  }

  searchStudent(branch: string, batch: string, weekType: string) {
    this.loading = true;
    this.studentService.getStudents(branch, batch, weekType)
    .subscribe((responce: StudentModel[]) => {
      this.students = responce;
      if(this.students.length > 0) {

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

  setError(err: string) {
		this.error = err;
		this.loading = false;
	}

	clearError() {
		this.error = null;
	}
}
