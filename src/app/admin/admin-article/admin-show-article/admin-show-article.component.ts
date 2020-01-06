import { Component, OnInit } from '@angular/core';
import { ArticleModel } from '../../../models/articles.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArticleService } from '../../../services/article.service';
import { ImageModel } from '../../../models/image.model';

@Component({
  selector: 'app-admin-show-article',
  templateUrl: './admin-show-article.component.html',
  styleUrls: ['./admin-show-article.component.css']
})
export class AdminShowArticleComponent implements OnInit {
  article: ArticleModel;

  loading: boolean;
  error: string;

  image: ImageModel;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      const id = params['id'];

      this.articleService.getArticle(id).subscribe(
        (responce: ArticleModel) => {
          this.article = responce;
          this.image = this.article.image;
          this.loading = false;
        },
        (error: any) => {
          this.setError(error);
        }
      );
    });
  }

  edit() {
    this.loading = true;
    this.router.navigate(['edit'], { relativeTo: this.route, skipLocationChange: true });
  }

  deleteArticleImage() {
    this.loading = true;
    this.articleService
      .deleteArticleImage(this.article._id, this.article.image.public_id)
      .subscribe(
        (responce: any) => {
          this.ngOnInit();
        },
        (error: any) => {
          this.setError(error);
        }
      );
  }

  delete() {
    const dltConfirm = confirm('do you really want to delete this Article??');
    if (dltConfirm) {
      this.loading = true;

      this.articleService.deleteArticle(this.article._id).subscribe(
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
    this.router.navigate(['/admin', 'article'], {
      relativeTo: this.route,
      skipLocationChange: true
    });
  }

  setError(err: string) {
    this.error = err;
    this.loading = false;
  }

  clearErr() {
    this.error = null;
  }
}
