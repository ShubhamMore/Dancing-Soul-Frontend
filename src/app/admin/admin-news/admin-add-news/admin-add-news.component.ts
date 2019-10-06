import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NewsService } from '../../../services/news.service';

@Component({
  selector: 'app-admin-add-news',
  templateUrl: './admin-add-news.component.html',
  styleUrls: ['./admin-add-news.component.css']
})
export class AdminAddNewsComponent implements OnInit {
  
  form: FormGroup;
  formError: boolean = false;

  loading: boolean = true;
  error: string = null;

  imgExt: string[] = ['jpg', 'png'];

  constructor(private newsService: NewsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required]
      }),
      body: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.loading = false;
  }

  addNews() {
    if(this.form.invalid) {
      this.formError = true;
    }

    if(this.form.valid) {
      this.formError = false;
      this.loading = true;
      const news = {
        title: this.form.value.title,
        body: this.form.value.body
      }
      this.newsService.addNews(news)
      .subscribe((responce: any) => {
        this.form.reset();
        this.cancel();
      },
      (error: any) => {
        this.setError(error);
      });
    }
  }

  cancel() {
    this.loading = true;
    this.router.navigate(["/admin", "news"], {relativeTo: this.route, skipLocationChange: true});        
  }

  setError(err: string) {
		this.error = err;
		this.loading = false;
	}

	clearError() {
		this.error = null;
	}
}
