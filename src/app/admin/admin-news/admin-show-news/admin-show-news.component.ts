import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NewsService } from '../../../services/news.service';
import { NewsModel } from '../../../models/news.model';

@Component({
  selector: 'app-admin-show-news',
  templateUrl: './admin-show-news.component.html',
  styleUrls: ['./admin-show-news.component.css']
})
export class AdminShowNewsComponent implements OnInit {
  news: any;

  loading: boolean = true;
  error: string = null;

  constructor(private newsService: NewsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        const _id = params['id'];
        this.newsService.getNews(_id)
        .subscribe((responce: NewsModel) => {
          this.news = responce;
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
    const dltConfirm = confirm("do you really want to delete??");
    if (dltConfirm) {
      this.loading = true;
      this.newsService.deleteNews(this.news._id)
      .subscribe((responce: any) => {
        this.cancel();
      },
      (error: any) => {
        this.setError(error);
      });
    }
  }

  cancel() {
    this.loading = true;
    this.router.navigate(['/admin', 'news'], {relativeTo: this.route, skipLocationChange: true});
  }

  setError(err: string) {
		this.error = err;
		this.loading = false;
	}

	clearError() {
		this.error = null;
	}
}
