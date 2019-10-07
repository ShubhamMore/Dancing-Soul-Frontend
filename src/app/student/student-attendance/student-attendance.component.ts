import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AttendanceService } from '../../services/attendance.service';

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.css']
})
export class StudentAttendanceComponent implements OnInit {

  attendance: any[] = [];

  loading: boolean = true;
  error: string = null;
  
  constructor(private attendanceService: AttendanceService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.queryParams.
    subscribe(
      (params: Params) => {
        const _id = params['id'];
        this.attendanceService.getAttendance(_id)
        .subscribe((responce: any) => {
          this.attendance = responce;
          this.loading = false;
        },
        (error: any) => {
          this.setError(error);
        });
      }
    );
  }

	setError(err: string) {
		this.error = err;
		this.loading = false;
	}

	clearError() {
		this.error = null;
	}
}
