import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AboutService } from '../../../services/about.service';
import { AboutModel } from '../../../models/about.model';
import { CKEditorConfig } from '../../../shared/ckeditor.config';

@Component({
  selector: 'app-admin-edit-aim',
  templateUrl: './admin-edit-aim.component.html',
  styleUrls: ['./admin-edit-aim.component.css'],
})
export class AdminEditAimComponent implements OnInit {
  about: AboutModel;
  aim: string;
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
        this.aim = this.about.aim;
        this.loading = false;
      },
      (error: any) => {
        this.setError(error);
        this.loading = false;
      }
    );
  }

  saveAim() {
    if (this.aim) {
      this.loading = true;
      const about: AboutModel = {
        _id: this.about._id,
        aim: this.aim,
        history: this.about.history,
        philosophy: this.about.philosophy,
      };

      this.aboutService.saveAbout(about).subscribe(
        (responce: any) => {
          this.aim = null;
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
    this.router.navigate(['/admin', 'about', 'aim'], {
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
