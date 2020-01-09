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

  loading: boolean;
  error: string;

  ext: string;

  constructor(
    private newsService: NewsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      const id = params['id'];
      this.newsService.getNews(id).subscribe(
        (responce: NewsModel) => {
          this.news = responce;
          if (this.news.file) {
            this.ext = this.news.file.file_name
              .substring(this.news.file.file_name.lastIndexOf('.') + 1)
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

  deleteNewsFile() {
    const dltConfirm = confirm('do you really want to delete this News File??');
    if (dltConfirm) {
      this.loading = true;
      this.newsService.deleteNewsFile(this.news._id, this.news.file.public_id).subscribe(
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
    const dltConfirm = confirm('do you really want to delete??');
    if (dltConfirm) {
      this.loading = true;
      this.newsService.deleteNews(this.news._id).subscribe(
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
    this.loading = true;
    this.router.navigate(['/admin', 'news'], { relativeTo: this.route, skipLocationChange: true });
  }

  setError(err: string) {
    this.error = err;
    this.loading = false;
  }

  clearError() {
    this.error = null;
  }
}
