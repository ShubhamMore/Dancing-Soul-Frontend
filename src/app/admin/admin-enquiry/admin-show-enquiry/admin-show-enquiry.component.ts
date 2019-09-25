import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Enquiry } from '../../../models/enquiry.model';
import { HttpService } from '../../../services/httpPost.service';

@Component({
  selector: 'app-admin-show-enquiry',
  templateUrl: './admin-show-enquiry.component.html',
  styleUrls: ['./admin-show-enquiry.component.css']
})
export class AdminShowEnquiryComponent implements OnInit {

  enquiry: Enquiry;

  loading : boolean = true;

  constructor(private httpPostService: HttpService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        const _id = params['id'];
        
        const data = { api : "getEnquiry", data : { _id }}
        this.httpPostService.httpPost(data).subscribe((val) => {
         this.enquiry = val;
         this.loading = false;
        },
        (error) => {
        });
      }
    );
  }

  cancel() {
    this.loading = true;
    this.router.navigate(['/admin', 'enquiry'], {relativeTo: this.route, skipLocationChange: true});
  }
}