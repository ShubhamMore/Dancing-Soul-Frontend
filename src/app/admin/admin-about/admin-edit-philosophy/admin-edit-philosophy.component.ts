import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AboutService } from '../../../services/about.service';
import { AboutModel } from '../../../models/about.model';
import { CKEditorConfig } from '../../../shared/ckeditor.config';

@Component({
  selector: 'app-admin-edit-philosophy',
  templateUrl: './admin-edit-philosophy.component.html',
  styleUrls: ['./admin-edit-philosophy.component.css'],
})
export class AdminEditPhilosophyComponent implements OnInit {
  about: AboutModel;
  philosophy: string;
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
        this.philosophy = this.about.philosophy;
        this.loading = false;
      },
      (error: any) => {
        this.setError(error);
      }
    );
  }

  savePhilosophy() {
    if (this.philosophy) {
      this.loading = true;
      const about: AboutModel = {
        _id: this.about._id,
        aim: this.about.aim,
        history: this.about.history,
        philosophy: this.philosophy,
      };

      this.aboutService.saveAbout(about).subscribe(
        (responce: any) => {
          this.philosophy = null;
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
    this.router.navigate(['/admin', 'about', 'philosophy'], {
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
