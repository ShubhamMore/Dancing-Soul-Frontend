import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AboutService } from '../../../services/about.service';
import { AboutModel } from '../../../models/about.model';

@Component({
  selector: 'app-admin-edit-aim',
  templateUrl: './admin-edit-aim.component.html',
  styleUrls: ['./admin-edit-aim.component.css']
})
export class AdminEditAimComponent implements OnInit {
  form: FormGroup;
  about: AboutModel;
  loading: boolean;
  error: string;

  constructor(
    private aboutService: AboutService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.form = new FormGroup({
      aim: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.aboutService.getAbout().subscribe(
      (responce: AboutModel) => {
        this.about = responce;
        this.form.patchValue({ aim: this.about.aim });
        this.loading = false;
      },
      (error: any) => {
        this.setError(error);
      }
    );
  }

  saveAim() {
    if (this.form.valid) {
      this.loading = true;
      const about: AboutModel = {
        _id: this.about._id,
        aim: this.form.value.aim,
        history: this.about.history,
        philosophy: this.about.philosophy
      };

      this.aboutService.saveAbout(about).subscribe(
        (responce: any) => {
          this.form.reset();
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
      skipLocationChange: true
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
