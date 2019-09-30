import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/httpPost.service';

@Component({
  selector: 'app-admin-gallary',
  templateUrl: './admin-gallary.component.html',
  styleUrls: ['./admin-gallary.component.css']
})
export class AdminGallaryComponent implements OnInit {

  images : string[] = [];
  loading : boolean = true;
  error : string = null;

  constructor(private httpPostService: HttpService) {}

  ngOnInit() {
    const data = { api : "getImages", data : {}}    
    this.httpPostService.httpPost(data)
    .subscribe(response => {
      this.images = response;
      this.loading = false;
    },
    (error) => {
      this.setError(error)
    });
  }

  deleteImage(public_id : string) {

    this.loading = true;
    const data = { api : "removeImage", data : {public_id}}
    this.httpPostService.httpPostAuth(data)
    .subscribe(res => {
      this.ngOnInit();
    },
    (error) => {
      this.setError(error)
    });
  }

  setError(err : string) {
		this.error = err;
		this.loading = false;
	}

	clearErr() {
		this.error = null;
	}
}
