import { Component, OnInit } from '@angular/core';
import { FacultyModel } from '../../models/faculty.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FacultyService } from '../../services/faculty.service';

@Component({
  selector: 'app-admin-faculty',
  templateUrl: './admin-faculty.component.html',
  styleUrls: ['./admin-faculty.component.css']
})
export class AdminFacultyComponent implements OnInit {
  faculties: FacultyModel[];
  loading: boolean;
  error: string;

  constructor(
    private facultyService: FacultyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.faculties = [];
    this.facultyService.getFaculties().subscribe(
      (responce: FacultyModel[]) => {
        this.faculties = responce;
        this.loading = false;
      },
      (error: any) => {
        this.setError(error);
      }
    );
  }

  onNewFaculty() {
    this.loading = true;
    this.router.navigate(['new'], { relativeTo: this.route, skipLocationChange: true });
  }

  setError(err: string) {
    this.error = err;
    this.loading = false;
  }

  clearError() {
    this.error = null;
  }
}
