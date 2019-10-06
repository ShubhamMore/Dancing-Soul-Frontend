import { Component, OnInit } from '@angular/core';
import { NewsModel } from '../../models/news.model';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-shelter-page',
  templateUrl: './news-shelter-page.component.html',
  styleUrls: ['./news-shelter-page.component.css']
})
export class NewsShelterPageComponent implements OnInit {

  newsList: NewsModel[] = [];
  loading: boolean = true;
  
  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getAllNews()
    .subscribe((responce: NewsModel[]) => {
      this.newsList = responce;
      this.loading = false;
    },
    (error: any) => {
    });
 
  }

}
