import { Component, OnInit } from '@angular/core';
import { ArticleModel } from '../../../models/articles.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArticleService } from '../../../services/article.service';
import { FileModel } from '../../../models/file.model';

@Component({
  selector: 'app-admin-show-article',
  templateUrl: './admin-show-article.component.html',
  styleUrls: ['./admin-show-article.component.css']
})
export class AdminShowArticleComponent implements OnInit {
  article: ArticleModel;

  loading: boolean;
  error: string;

  ext: string;

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
          if (this.article.file) {
            this.ext = this.article.file.file_name
              .substring(this.article.file.file_name.lastIndexOf('.') + 1)
              .toLowerCase();
          }
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

  deleteArticleFile() {
    const dltConfirm = confirm('do you really want to delete this Article File??');
    if (dltConfirm) {
      this.loading = true;
      this.articleService
        .deleteArticleFile(this.article._id, this.article.file.public_id)
        .subscribe(
          (responce: any) => {
            this.ngOnInit();
          },
          (error: any) => {
            this.setError(error);
          }
        );
    }
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
    this.router.navigate(['/admin', 'article'], {
      relativeTo: this.route,
      skipLocationChange: true
    });
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
