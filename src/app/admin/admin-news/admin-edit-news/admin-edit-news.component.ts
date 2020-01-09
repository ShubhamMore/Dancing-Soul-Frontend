import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { NewsService } from '../../../services/news.service';
import { NewsModel } from '../../../models/news.model';

@Component({
  selector: 'app-admin-edit-news',
  templateUrl: './admin-edit-news.component.html',
  styleUrls: ['./admin-edit-news.component.css']
})
export class AdminEditNewsComponent implements OnInit {
  news: NewsModel;

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

    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      const id = params['id'];
      this.newsService.getNews(id).subscribe(
        (responce: NewsModel) => {
          this.news = responce;
          if (this.news.file) {
            this.ext = this.news.file.file_name
              .substring(this.news.file.file_name.lastIndexOf('.') + 1)
              .toLowerCase();
          }
          this.form.setValue({
            title: this.news.title,
            body: this.news.body
          });
          this.loading = false;
        },
        (error: any) => {
          this.setError(error);
        }
      );
    });
  }

  onImagePicked(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    const imgExt: string[] = ['jpg', 'png', 'pdf'];
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

  deleteNewsFile() {
    const dltConfirm = confirm('do you really want to delete this News File??');
    if (dltConfirm) {
      this.loading = true;
      this.newsService.deleteNewsFile(this.news._id, this.news.file.public_id).subscribe(
        (responce: any) => {
          this.ngOnInit();
        },
        (error: any) => {
          this.setError(error);
        }
      );
    }
  }

  editNews() {
    if (this.form.invalid) {
      this.formError = true;
    }

    if (this.form.valid) {
      this.loading = true;
      this.formError = false;

      const news = new FormData();
      news.append('_id', this.news._id);
      news.append('title', this.form.value.title);
      news.append('body', this.form.value.body);
      if (this.uploadImage) {
        news.append('image', this.uploadImage, 'article');
      }

      this.newsService.editNews(news).subscribe(
        (responce: any) => {
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
    this.router.navigate(['/admin', 'news', this.news._id], {
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
