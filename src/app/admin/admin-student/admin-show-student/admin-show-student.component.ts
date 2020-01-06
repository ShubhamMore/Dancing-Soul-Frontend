import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { StudentModel } from '../../../models/student.model';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-admin-show-student',
  templateUrl: './admin-show-student.component.html',
  styleUrls: ['./admin-show-student.component.css']
})
export class AdminShowStudentComponent implements OnInit {
  student: StudentModel;
  studentMetaData: any;

  loading: boolean;
  error: string;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      const id = params['id'];
      this.studentService.getStudent(id).subscribe(
        (responce: any) => {
          this.student = responce.student;
          this.studentMetaData = responce.studentMetaData;
          this.loading = false;
        },
        (error: any) => {
          this.setError(error);
        }
      );
    });
  }

  changeStatus(id: string, status: string) {
    let statusConfirm: any = true;
    if (status === '0') {
      statusConfirm = confirm('do you really want to Deactivate Student??');
    } else if (status === '1') {
      statusConfirm = confirm('do you want to Activate this Student again??');
    }
    if (statusConfirm) {
      this.loading = true;
      this.studentService.changeStudentStatus(id, status).subscribe(
        (responce: any) => {
          this.cancel();
        },
        (error: any) => {
          this.setError(error);
        }
      );
    }
  }

  deleteStudent() {
    const password = prompt('Please enter your Password');
    if (password) {
      this.loading = true;
      this.studentService.deleteStudent(this.student._id, password).subscribe(
        (responce: any) => {
          this.cancel();
        },
        (error: any) => {
          this.setError(error);
        }
      );
    }
  }

  studentIdentity() {
    this.router.navigate(['identity'], { relativeTo: this.route, skipLocationChange: true });
  }

  studentCertificates() {
    this.router.navigate(['certificates'], { relativeTo: this.route, skipLocationChange: true });
  }

  studentProgress() {
    this.router.navigate(['progress'], { relativeTo: this.route, skipLocationChange: true });
  }

  cancel() {
    this.loading = true;
    this.router.navigate(['/admin', 'student'], {
      relativeTo: this.route,
      skipLocationChange: true
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
