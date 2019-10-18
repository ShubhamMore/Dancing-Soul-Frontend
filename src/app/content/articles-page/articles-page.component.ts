import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ArticleModel } from '../../models/articles.model';

@Component({
  selector: 'app-articles-page',
  templateUrl: './articles-page.component.html',
  styleUrls: ['./articles-page.component.css']
})
export class ArticlesPageComponent implements OnInit {

  articles: any[] = [];

  loading: boolean = true;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getAllArticles()
    .subscribe((responce: ArticleModel[]) => {
      this.articles = responce;
      this.loading = false;
    },
    (error: any) => {
    });
  }
}
