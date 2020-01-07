import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleService } from '../../../services/article.service';

@Component({
  selector: 'app-admin-add-article',
  templateUrl: './admin-add-article.component.html',
  styleUrls: ['./admin-add-article.component.css']
})
export class AdminAddArticleComponent implements OnInit {
  form: FormGroup;

  loading: boolean;
  error: string;

  formError: boolean;

  imagePreview: string;
  uploadImage: File;

  invalidImage: boolean;
  ext: string;

  constructor(
    private articleService: ArticleService,
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

  addArticle() {
    if (this.form.invalid) {
      this.formError = true;
    }

    if (this.form.valid) {
      this.formError = false;
      this.loading = true;

      const article = new FormData();
      article.append('title', this.form.value.title);
      article.append('body', this.form.value.body);
      if (this.uploadImage) {
        article.append('image', this.uploadImage, 'article');
      }

      this.articleService.addArticle(article).subscribe(
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
    this.router.navigate(['/admin', 'article'], {
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
