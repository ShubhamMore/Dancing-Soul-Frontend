import { Component, OnInit } from '@angular/core';
import { ArticleModel } from '../../../models/articles.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArticleService } from '../../../services/article.service';

@Component({
  selector: 'app-admin-show-article',
  templateUrl: './admin-show-article.component.html',
  styleUrls: ['./admin-show-article.component.css']
})
export class AdminShowArticleComponent implements OnInit {
  
  article: ArticleModel;

  loading: boolean = true;

  error: string = null;

  constructor(private articleService: ArticleService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        const _id = params['id'];
        
        this.articleService.getArticle(_id)
        .subscribe((responce: ArticleModel) => {
          this.article = responce;
          this.loading = false;
        },
        (error: any) => {
          this.setError(error);
        });
      }
    );
  }

  edit() {
    this.loading = true;
    this.router.navigate(['edit'], {relativeTo: this.route, skipLocationChange: true});
  }

  delete() {
    
    const dltConfirm = confirm("do you really want to delete this Article??");
    if(dltConfirm) {
      this.loading = true;
      
      this.articleService.deleteArticle(this.article._id)
      .subscribe((responce: any) => {
        this.cancel();
      },
      (error: any) => {
        this.setError(error)
      });
    }
  }

  cancel() {
    this.loading = true;
    this.router.navigate(['/admin', 'article'], {relativeTo: this.route, skipLocationChange: true});
  }
  
	setError(err: string) {
		this.error = err;
		this.loading = false;
	}

	clearErr() {
		this.error = null;
	}
}