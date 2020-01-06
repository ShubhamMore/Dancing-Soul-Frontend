import { Component, OnInit } from '@angular/core';
import { AboutService } from '../../../services/about.service';
import { AboutModel } from '../../../models/about.model';
@Component({
  selector: 'app-admin-history',
  templateUrl: './admin-history.component.html',
  styleUrls: ['./admin-history.component.css']
})
export class AdminHistoryComponent implements OnInit {
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
