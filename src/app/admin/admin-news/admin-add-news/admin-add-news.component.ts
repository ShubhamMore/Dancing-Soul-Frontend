import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NewsService } from '../../../services/news.service';

@Component({
  selector: 'app-admin-add-news',
  templateUrl: './admin-add-news.component.html',
  styleUrls: ['./admin-add-news.component.css']
})
export class AdminAddNewsComponent implements OnInit {
  form: FormGroup;

  loading: boolean;
  error: string;

  formError: boolean;

  imagePreview: string;
  uploadImage: File;

  invalidImage: boolean;
  ext: string;

  constructor(
    private newsService: NewsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.formError = false;
    this.invalidImage = false;

    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required]
      }),
      body: new FormControl(null, {
        validators: []
      })
    });

    this.loading = false;
  }

  onImagePicked(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    const imgExt: string[] = ['jpg', 'png', 'pdf'];
    this.ext = null;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
      this.ext = files[i].name.substring(files[i].name.lastIndexOf('.') + 1).toLowerCase();
      if (!(imgExt.indexOf(this.ext) !== -1)) {
        return (this.invalidImage = true);
      }
    }
    this.invalidImage = false;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
      this.uploadImage = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(files[i]);
    }
  }

  cancelImage() {
    this.imagePreview = null;
    this.uploadImage = null;
    this.invalidImage = false;
  }

  addNews() {
    if (this.form.invalid) {
      this.formError = true;
    }

    if (this.form.valid) {
      this.formError = false;
      this.loading = true;

      const news = new FormData();
      news.append('title', this.form.value.title);
      news.append('body', this.form.value.body);
      if (this.uploadImage) {
        news.append('image', this.uploadImage, 'article');
      }
      this.newsService.addNews(news).subscribe(
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
    this.cancelImage();
    this.router.navigate(['/admin', 'news'], { relativeTo: this.route, skipLocationChange: true });
  }

  setError(err: string) {
    this.error = err;
    this.loading = false;
  }

  clearError() {
    this.error = null;
  }
}
