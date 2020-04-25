import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AboutService } from '../../../services/about.service';
import { AboutModel } from '../../../models/about.model';
import { CKEditorConfig } from '../../../shared/ckeditor.config';

@Component({
  selector: 'app-admin-edit-history',
  templateUrl: './admin-edit-history.component.html',
  styleUrls: ['./admin-edit-history.component.css'],
})
export class AdminEditHistoryComponent implements OnInit {
  about: AboutModel;
  history: string;
  loading: boolean;
  error: string;
  ckeConfig: any;
  @ViewChild('myckeditor') ckeditor: any;

  constructor(
    private aboutService: AboutService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.ckeConfig = CKEditorConfig;

    this.aboutService.getAbout().subscribe(
      (responce: AboutModel) => {
        this.about = responce;
        this.history = this.about.history;
        this.loading = false;
      },
      (error: any) => {
        this.setError(error);
      }
    );
  }

  saveHistory() {
    if (this.history) {
      this.loading = true;
      const about: AboutModel = {
        _id: this.about._id,
        aim: this.about.aim,
        history: this.history,
        philosophy: this.about.philosophy,
      };

      this.aboutService.saveAbout(about).subscribe(
        (responce: any) => {
          this.history = null;
          this.cancel();
        },
        (error: any) => {
          this.setError(error);
        }
      );
    }
  }

  cancel() {
    this.loading = true;
    this.router.navigate(['/admin', 'about', 'history'], {
      relativeTo: this.route,
      skipLocationChange: true,
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
