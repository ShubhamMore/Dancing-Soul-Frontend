import { Component, OnInit } from '@angular/core';
import { AboutModel } from '../../models/about.model';
import { HttpService } from '../../services/httpPost.service';

@Component({
  selector: 'app-admin-about',
  templateUrl: './admin-about.component.html',
  styleUrls: ['./admin-about.component.css']
})
export class AdminAboutComponent implements OnInit { 
  about: AboutModel;

  loading: boolean = true;

  constructor(private httpPostService: HttpService) { }

  ngOnInit() {
    const data = { api : "getAbout", data : {}}
    this.httpPostService.httpPost(data).subscribe((res) => {
      this.about = res[0];
      this.loading = false;
    },
    (error) => {
    });
  }
}