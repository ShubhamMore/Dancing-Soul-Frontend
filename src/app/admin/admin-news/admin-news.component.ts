import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { NewsModel } from '../../models/news.model';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.css']
})
export class AdminNewsComponent implements OnInit {

  news: NewsModel[] = [];

  loading: boolean = true;
  error: string = null;

  constructor(private newsService: NewsService,
              private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit() {
    this.newsService.getAllNews()
    .subscribe((responce: NewsModel[]) => {
      this.news = responce;
      this.loading = false;
    },
    (error: any) => {
      this.setError(error);
    });
  }

  deleteNews(_id: string) {
    const deleteConfirm = confirm("do you really want to Delete News??");  
    if(deleteConfirm) {
      this.loading = true;
      this.newsService.deleteNews(_id)
      .subscribe((responce: any) => {
        this.loading = false;
      },
      (error: any) => {
        this.setError(error);
      });
    }
  }

  onNewNews() {
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
