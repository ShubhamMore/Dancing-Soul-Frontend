import { Component, OnInit } from '@angular/core';
import { FacultyModel } from '../../../models/faculty.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FacultyService } from '../../../services/faculty.service';

@Component({
  selector: 'app-admin-show-faculty',
  templateUrl: './admin-show-faculty.component.html',
  styleUrls: ['./admin-show-faculty.component.css']
})
export class AdminShowFacultyComponent implements OnInit {
  faculty: FacultyModel;
  loading: boolean;
  error: string;

  constructor(
    private facultyServce: FacultyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      const id = params['id'];
      this.facultyServce.getFaculty(id).subscribe(
        (responce: FacultyModel) => {
          this.faculty = responce;
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
      statusConfirm = confirm('do you really want to Deactivate Faculty??');
    } else if (status === '1') {
      statusConfirm = confirm('do you want to Activate this Faculty again??');
    }

    if (statusConfirm) {
      this.loading = true;
      this.facultyServce.changeFacultyStatus(id, status).subscribe(
        (responce: any) => {
          this.cancel();
        },
        (error: any) => {
          this.setError(error);
        }
      );
    }
  }

  deleteFaculty() {
    const password = prompt('Please enter your Password');
    if (password) {
      this.loading = true;
      this.facultyServce.deleteFaculty(this.faculty._id, password).subscribe(
        (responce: any) => {
          this.cancel();
        },
        (error: any) => {
          this.setError(error);
        }
      );
    }
  }

  cancel() {
    this.loading = true;
    this.router.navigate(['/admin', 'faculty'], {
      relativeTo: this.route,
      skipLocationChange: true
    });
  }

  setError(err: string) {
    this.error = err;
    this.loading = false;
  }

  clearErr() {
    this.error = null;
  }
}
