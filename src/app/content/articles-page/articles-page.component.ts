import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/httpPost.service';
import { Article } from '../../models/articles.model';

@Component({
  selector: 'app-articles-page',
  templateUrl: './articles-page.component.html',
  styleUrls: ['./articles-page.component.css']
})
export class ArticlesPageComponent implements OnInit {

  articles: Article[] = [];

  loading: boolean = true;

  constructor(private httpPostService: HttpService) { }

  ngOnInit() {
    const data = { api: "getArticles", data: {}}
    this.httpPostService.httpPost(data).subscribe((val) => {
     this.articles = val;
     this.loading = false;
    },
    (error) => {
    });
  }
}
