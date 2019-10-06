import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ArticleModel } from '../../models/articles.model';

@Component({
  selector: 'app-articles-page',
  templateUrl: './articles-page.component.html',
  styleUrls: ['./articles-page.component.css']
})
export class ArticlesPageComponent implements OnInit {

  articles: ArticleModel[] = [];

  loading: boolean = true;

  constructor(private articelService: ArticleService) { }

  ngOnInit() {
    this.articelService.getArticles()
    .subscribe((responce: ArticleModel[]) => {
      this.articles = responce;
      this.loading = false;
    },
    (error: any) => {
    });
  }
}
