import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/httpPost.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  loading : boolean = true;

  enquiries : string;

  constructor(private httpPostService: HttpService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const data = { api : "getUnseenEnquiries", data : { }}
    this.httpPostService.httpPostAuth(data).subscribe((val) => {
      this.enquiries = val.unseenEnquiries;
      this.loading = false;
    },
    (error) => {
      this.loading = false;
    });
  }

}