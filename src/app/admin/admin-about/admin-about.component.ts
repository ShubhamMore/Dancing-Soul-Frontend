import { Component, OnInit } from '@angular/core';
import { AboutModel } from '../../models/about.model';
import { AboutService } from '../../services/about.service';

@Component({
  selector: 'app-admin-about',
  templateUrl: './admin-about.component.html',
  styleUrls: ['./admin-about.component.css']
})
export class AdminAboutComponent implements OnInit { 
  about: AboutModel;

  loading: boolean = true;
  error: string = null;
	
  constructor(private aboutService: AboutService) { }

  ngOnInit() {
    this.aboutService.getAbout()
    .subscribe((responce: AboutModel) => {
      this.about = responce;
      this.loading = false;
    },
    (error: any) => {
      this.setError(error)
    });
  }

	setError(err: string) {
		this.error = err;
		this.loading = false;
	}

	clearError() {
		this.error = null;
	}
}