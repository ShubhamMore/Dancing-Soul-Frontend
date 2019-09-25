import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/httpPost.service';
import { AboutModel } from '../../../models/about.model';
@Component({
  selector: 'app-admin-history',
  templateUrl: './admin-history.component.html',
  styleUrls: ['./admin-history.component.css']
})
export class AdminHistoryComponent implements OnInit {

  about: AboutModel;

  loading: boolean = true;

  constructor(private httpPostService: HttpService) { }

  ngOnInit() {
    const data = { api : "getAbout", data : {}}
    this.httpPostService.httpPost(data).subscribe((val) => {
      this.about = val[0];
      this.loading = false;
    },
    (error) => {
    });  
  }
}