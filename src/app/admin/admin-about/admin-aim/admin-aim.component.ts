import { Component, OnInit } from '@angular/core';
import { AboutModel } from '../../../models/about.model';
import { AboutService } from '../../../services/about.service';

@Component({
  selector: 'app-admin-aim',
  templateUrl: './admin-aim.component.html',
  styleUrls: ['./admin-aim.component.css'],
})
export class AdminAimComponent implements OnInit {
  about: AboutModel;

  loading: boolean;
  error: string;

  constructor(private aboutService: AboutService) {}

  ngOnInit() {
    this.loading = true;
    this.aboutService.getAbout().subscribe(
      (responce: AboutModel) => {
        this.about = responce;
        this.loading = false;
      },
      (error: any) => {
        this.setError(error);
      }
    );
  }

  setError(err: string) {
    this.error = err;
    this.loading = false;
  }

  clearError() {
    this.error = null;
  }
}
