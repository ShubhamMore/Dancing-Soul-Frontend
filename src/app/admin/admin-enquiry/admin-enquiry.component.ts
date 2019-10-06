import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EnquiryModel } from '../../models/enquiry.model';
import { EnquiryService } from '../../services/enquiry.service';

@Component({
  selector: 'app-admin-enquiry',
  templateUrl: './admin-enquiry.component.html',
  styleUrls: ['./admin-enquiry.component.css']
})
export class AdminEnquiryComponent implements OnInit {

  enquiries: EnquiryModel[];

  loading: boolean = true;

  error: string = null;  

  constructor(private enquiryService: EnquiryService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.enquiryService.getEnquiries()
    .subscribe((responce: EnquiryModel[]) => {
      this.enquiries = responce;
      this.loading = false;
    },
    (error: any) => {
      this.setError(error)      
    });
  }

  limitData(data: string, limit: number = 25) {
    if(data.length >= limit) {
      const newdata = [];
      data.split(' ').reduce((acc, cur) => {
        if(acc + cur.length <= limit) {
          newdata.push(cur);
        }
        return acc + cur.length;
      }, 0);
      return `${newdata.join(' ')}...`;
    }
    return data;
  }
  
	setError(err: string) {
		this.error = err;
		this.loading = false;
	}

	clearError() {
		this.error = null;
	}
}
