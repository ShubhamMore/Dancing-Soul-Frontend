import { Component, OnInit } from '@angular/core';
import { NewsModule } from '../../models/news.model';
import { HttpService } from '../../services/httpPost.service';

@Component({
  selector: 'app-news-shelter-page',
  templateUrl: './news-shelter-page.component.html',
  styleUrls: ['./news-shelter-page.component.css']
})
export class NewsShelterPageComponent implements OnInit {

  newsList : NewsModule[] = [];
  loading : boolean = true;
  constructor(private httpPostService: HttpService) { }

  ngOnInit() {
    const newsData = { api : "getAllNews", data : {}}
    this.httpPostService.httpPost(newsData).subscribe((val: any) => {
      this.newsList = val;
      this.loading = false;
    },
    (error) => {
    });
 
  }

}
