import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Enquiry } from '../../models/enquiry.model';
import { HttpService } from '../../services/httpPost.service';

@Component({
  selector: 'app-admin-enquiry',
  templateUrl: './admin-enquiry.component.html',
  styleUrls: ['./admin-enquiry.component.css']
})
export class AdminEnquiryComponent implements OnInit {

  enquiries: Enquiry[];

  loading : boolean = true;

  error : string = null;  

  constructor(private httpPostService: HttpService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const data = { api : "getEnquiries", data : { }}
    this.httpPostService.httpPostAuth(data).subscribe((val) => {
     this.enquiries = val;
     this.loading = false;
    },
    (error) => {
      this.setError(error)      
    });
  }

  limitData(data:string, limit:number = 25) {
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
  
	setError(err : string) {
		this.error = err;
		this.loading = false;
	}

	clearErr() {
		this.error = null;
	}
}