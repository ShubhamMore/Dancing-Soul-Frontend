import { Component, OnInit } from '@angular/core';
import { AboutModel } from '../../models/about.model';
import { AboutService } from '../../services/about.service';
import { FormGroup, FormControlName, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-about',
  templateUrl: './admin-about.component.html',
  styleUrls: ['./admin-about.component.css']
})
export class AdminAboutComponent implements OnInit {
  loading: boolean;
  error: string;
  about: AboutModel;
  editing: boolean;

  form: FormGroup;

  constructor(private aboutService: AboutService) {}

  ngOnInit() {
    this.loading = true;
    this.editing = false;
    this.form = new FormGroup({
      content: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.aboutService.getAbout().subscribe(
      (responce: AboutModel) => {
        this.about = responce;
        this.form.patchValue({ content: this.about.content });
        this.loading = false;
      },
      (error: any) => {
        this.setError(error);
      }
    );
  }

  saveContent() {
    if (this.form.valid) {
      this.loading = true;
      const about: AboutModel = {
        _id: this.about._id,
        aim: this.about.aim,
        history: this.about.history,
        philosophy: this.about.philosophy,
        content: this.form.value.content
      };

      this.aboutService.saveAbout(about).subscribe(
        (responce: any) => {
          this.form.reset();
          this.about = about;
          this.cancel();
        },
        (error: any) => {
          this.setError(error);
        }
      );
    }
  }

  edit() {
    this.editing = true;
  }

  cancel() {
    this.editing = false;
    this.loading = false;
  }

  setError(err: string) {
    this.error = err;
    this.loading = false;
  }

  clearError() {
    this.error = null;
  }
}
