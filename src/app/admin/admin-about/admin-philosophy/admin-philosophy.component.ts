import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/httpPost.service';
import { AboutModel } from '../../../models/about.model';

@Component({
  selector: 'app-admin-philosophy',
  templateUrl: './admin-philosophy.component.html',
  styleUrls: ['./admin-philosophy.component.css']
})
export class AdminPhilosophyComponent implements OnInit {

  about: AboutModel;

  loading: boolean = true;

  error : string = null;
	
  constructor(private httpPostService: HttpService) { }

  ngOnInit() {
    const data = { api : "getAbout", data : {}}
    this.httpPostService.httpPost(data).subscribe((res) => {
      this.about = res[0];
      this.loading = false;
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