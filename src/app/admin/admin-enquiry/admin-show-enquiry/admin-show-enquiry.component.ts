import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EnquiryModel } from '../../../models/enquiry.model';
import { EnquiryService } from '../../../services/enquiry.service';

@Component({
  selector: 'app-admin-show-enquiry',
  templateUrl: './admin-show-enquiry.component.html',
  styleUrls: ['./admin-show-enquiry.component.css']
})
export class AdminShowEnquiryComponent implements OnInit {

  enquiry: EnquiryModel;

  loading: boolean = true;

  error: string = null;

  constructor(private enquiryService: EnquiryService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        const _id = params['id'];

        this.enquiryService.getEnquiry(_id)
        .subscribe((responce: EnquiryModel) => {
          this.enquiry = responce;
          this.loading = false;
        },
        (error: any) => {
          this.setError(error);
        });
      }
    );
  }

  cancel() {
    this.loading = true;
    this.router.navigate(['/admin', 'enquiry'], {relativeTo: this.route, skipLocationChange: true});
  }

	setError(err: string) {
		this.error = err;
		this.loading = false;
	}

	clearError() {
		this.error = null;
	}
}
