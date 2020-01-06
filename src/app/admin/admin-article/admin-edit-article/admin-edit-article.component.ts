import { Component, OnInit } from '@angular/core';
import { ArticleModel } from '../../../models/articles.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ArticleService } from '../../../services/article.service';

@Component({
  selector: 'app-admin-edit-article',
  templateUrl: './admin-edit-article.component.html',
  styleUrls: ['./admin-edit-article.component.css']
})
export class AdminEditArticleComponent implements OnInit {
  article: ArticleModel;

  form: FormGroup;

  loading: boolean;
  error: string;

  formError: boolean;

  imagePreview: string;
  uploadImage: File;

  invalidImage: boolean;

  imgExt: string[];

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;

    this.formError = false;
    this.invalidImage = false;

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

      this.articleService.getArticle(id).subscribe(
        (responce: ArticleModel) => {
          this.article = responce;
          this.form.setValue({
            title: this.article.title,
            body: this.article.body
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
    const imgExt: string[] = ['jpg', 'png'];
    let ext: string = null;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
      ext = files[i].name.substring(files[i].name.lastIndexOf('.') + 1).toLowerCase();
      if (!(imgExt.indexOf(ext) !== -1)) {
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

  editArticle() {
    if (this.form.invalid) {
      this.formError = true;
    }

    if (this.form.valid) {
      this.loading = true;
      this.formError = false;

      const article = new FormData();
      article.append('_id', this.article._id);
      article.append('title', this.form.value.title);
      article.append('body', this.form.value.body);
      if (this.uploadImage) {
        article.append('image', this.uploadImage, 'article');
      }

      this.articleService.editArticle(article).subscribe(
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
    this.router.navigate(['/admin', 'article', this.article._id], {
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
