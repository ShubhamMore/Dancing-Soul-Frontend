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

  loading: boolean;
  error: string;

  imgExt: string[];

  form: FormGroup;
  formError: boolean;

  constructor(
    private newsService: NewsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.formError = false;

    this.imgExt = ['jpg', 'png'];

    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required]
      }),
      body: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      const id = params['id'];
      this.newsService.getNews(id).subscribe(
        (responce: NewsModel) => {
          this.news = responce;
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

  editNews() {
    if (this.form.invalid) {
      this.formError = true;
    }

    if (this.form.valid) {
      this.loading = true;
      this.formError = false;
      const editednews = {
        _id: this.news._id,
        title: this.form.value.title,
        body: this.form.value.body
      };
      this.newsService.editNews(editednews).subscribe(
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
