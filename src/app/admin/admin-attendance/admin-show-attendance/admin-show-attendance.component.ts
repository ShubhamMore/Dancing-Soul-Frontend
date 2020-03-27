import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AttendanceService } from '../../../services/attendance.service';

@Component({
  selector: 'app-admin-show-attendance',
  templateUrl: './admin-show-attendance.component.html',
  styleUrls: ['./admin-show-attendance.component.css']
})
export class AdminShowAttendanceComponent implements OnInit {
  attendance: any[];

  loading: boolean;
  error: string;

  constructor(
    private attendanceService: AttendanceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.attendance = [];
    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      const id = params.id;
      console.log(id);
      this.attendanceService.getAttendance(id).subscribe(
        (responce: any) => {
          this.attendance = responce;
          this.loading = false;
        },
        (error: any) => {
          this.setError(error);
        }
      );
    });
  }

  setError(err: string) {
    this.error = err;
    this.loading = false;
  }

  clearError() {
    this.error = null;
  }

  cancel() {
    this.loading = true;
    this.router.navigate(['/admin', 'attendance'], {
      relativeTo: this.route,
      skipLocationChange: true
    });
  }
}
