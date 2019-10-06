import { Component, OnInit } from '@angular/core';
import { AboutService } from '../../../services/about.service';
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