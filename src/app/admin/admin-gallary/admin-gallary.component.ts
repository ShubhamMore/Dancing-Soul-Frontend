import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/httpPost.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-gallary',
  templateUrl: './admin-gallary.component.html',
  styleUrls: ['./admin-gallary.component.css']
})
export class AdminGallaryComponent implements OnInit {

  images : string[] = [];
  loading = true;

  constructor(private httpPostService: HttpService) {}

  ngOnInit() {
    const data = { api : "getImages", data : {}}    
    this.httpPostService.httpPost(data)
    .subscribe(response => {
      console.log(response)
      this.images = response;
      this.loading = false;
    },
    (error) => {
      this.loading = false;
      console.log(error);
    });
    
    this.loading = false;
  }

  deleteImage(public_id : string) {
    const changeImgs  = this.images;
    

    this.loading = true;
    const data = { api : "removeImage", data : {public_id}}
    this.httpPostService.httpPost(data)
    .subscribe(res => {
      console.log(res)
      this.ngOnInit();
    },
    (error) => {
      this.loading = false;
      console.log(error);
    });
  }
}
