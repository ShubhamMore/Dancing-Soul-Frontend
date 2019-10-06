import { Component, OnInit } from '@angular/core';
import { EnquiryService } from '../../services/enquiry.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  loading: boolean = true;

  error: string = null;

  enquiries: number;

  constructor(private enquiryService: EnquiryService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.enquiryService.getUnseenEnquiries()
    .subscribe((responce: any) => {
      this.enquiries = responce.unseenEnquiries;
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
