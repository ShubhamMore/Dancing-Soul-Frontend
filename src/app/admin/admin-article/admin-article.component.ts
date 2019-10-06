import { Component, OnInit } from '@angular/core';
import { ArticleModel } from '../../models/articles.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-admin-article',
  templateUrl: './admin-article.component.html',
  styleUrls: ['./admin-article.component.css']
})
export class AdminArticleComponent implements OnInit {

  articles: ArticleModel[] = [];

  loading: boolean = true;

  error: string = null;
  constructor(private articelService: ArticleService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.articelService.getArticles()
    .subscribe((responce: ArticleModel[]) => {
     this.articles = responce;
     this.loading = false;
    },
    (error: any) => {
      this.setError(error);
    });
  }

  deleteArticle(_id: string) {
    const deleteConfirm = confirm("do you really want to Delete this Article??");  
    if(deleteConfirm) {
      this.loading = true;
      
      this.articelService.deleteArticle(_id)
      .subscribe((responce: any) => {
        this.ngOnInit();
      },
      (error: any) => {
        this.setError(error);
      });
    }    
  }

  onNewArticle() {
    this.loading = true;
    this.router.navigate(['new'], {relativeTo: this.route, skipLocationChange: true});
  }

	setError(err: string) {
		this.error = err;
		this.loading = false;
	}

	clearError() {
		this.error = null;
	}
}