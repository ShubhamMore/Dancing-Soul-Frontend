import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  loading: boolean;

  error: string;

  enquiries: number;
  dashboardData: any;

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.dashboardService.getDashboardData().subscribe(
      (responce: any) => {
        this.enquiries = responce.unseenEnquiries;
        this.dashboardData = responce.dashboardData;
        this.loading = false;
      },
      (error: any) => {
        this.setError(error);
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
