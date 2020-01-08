import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CareerService } from '../../services/career.service';

@Component({
  selector: 'app-career-page',
  templateUrl: './career-page.component.html',
  styleUrls: ['./career-page.component.css']
})
export class CareerPageComponent implements OnInit {
  loading: boolean;
  error: string;

  form: FormGroup;
  formError: boolean;

  content: string;

  coverLatter: File;
  resume: File;

  invalidCoverLatter: boolean;
  invalidResume: boolean;
  ext: string;

  constructor(
    private careerService: CareerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;

    this.formError = false;
    this.invalidCoverLatter = false;
    this.invalidResume = false;

    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      phone: new FormControl(null, {
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.careerService.getCareerContent().subscribe(
      (resData: any) => {
        this.content = resData.content;
        this.loading = false;
      },
      (error: any) => {
        this.setError(error);
      }
    );
  }

  onCoverLatterPicked(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    const imgExt: string[] = ['jpg', 'png', 'pdf'];
    this.ext = null;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
      this.ext = files[i].name.substring(files[i].name.lastIndexOf('.') + 1).toLowerCase();
      if (!(imgExt.indexOf(this.ext) !== -1)) {
        return (this.invalidCoverLatter = true);
      }
    }
    this.invalidCoverLatter = false;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
      this.coverLatter = files[i];
    }
  }

  onResumePicked(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    const imgExt: string[] = ['pdf'];
    let ext;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
      ext = files[i].name.substring(files[i].name.lastIndexOf('.') + 1).toLowerCase();
      if (!(imgExt.indexOf(ext) !== -1)) {
        return (this.invalidResume = true);
      }
    }
    this.invalidResume = false;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
      this.resume = files[i];
    }
  }

  cancelResume() {
    this.resume = null;
    this.invalidResume = false;
  }

  cancelCoverLatter() {
    this.coverLatter = null;
    this.invalidCoverLatter = false;
  }

  sendCareerEnquiry() {
    if (this.form.invalid) {
      this.formError = true;
    }

    if (this.form.valid) {
      this.formError = false;
      this.loading = true;

      const career = new FormData();
      career.append('name', this.form.value.name);
      career.append('email', this.form.value.email);
      career.append('phone', this.form.value.phone);
      career.append('description', this.form.value.description);
      if (this.resume) {
        career.append('file', this.resume, 'resume');
      }
      if (this.coverLatter) {
        career.append('file', this.coverLatter, 'coverLatter');
      }

      this.careerService.addCareer(career).subscribe(
        (responce: any) => {
          this.form.reset();
          this.cancelCoverLatter();
          this.cancelResume();
          this.loading = false;
        },
        (error: any) => {
          this.setError(error);
        }
      );
    }
  }

  setError(err: string) {
    this.error = err;
    this.loading = false;
  }

  clearError() {
    this.error = null;
  }
}
