import { Component, OnInit } from '@angular/core';
import { ArticleModel } from '../../../models/articles.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ArticleService } from '../../../services/article.service';


@Component({
  selector: 'app-admin-edit-article',
  templateUrl: './admin-edit-article.component.html',
  styleUrls: ['./admin-edit-article.component.css']
})
export class AdminEditArticleComponent implements OnInit {

  article: ArticleModel;

  loading: boolean = true;
  
  error: string = null;
  
  form: FormGroup;

  formError: boolean = false;

  constructor(private articleService: ArticleService,
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

    this.route.params
    .subscribe(
      (params: Params) => {
        const _id = params['id'];
        
        this.articleService.getArticle(_id)
        .subscribe((responce: ArticleModel) => {
          this.article = responce;
          this.form.setValue({
           title: this.article.title,
           body: this.article.body
          });
          this.loading = false;
        },
        (error: any) => {
          this.setError(error);
        });
      }
    );
  }

  editArticle() {
    if(this.form.invalid) {
      this.formError = true;
    }

    if(this.form.valid) {
      this.loading = true;
      this.formError = false;
      const editedArticle: ArticleModel = {
        _id: this.article._id,
        title: this.form.value.title,
        body: this.form.value.body
      }

      this.articleService.editArticle(editedArticle)
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
    this.router.navigate(['/admin', 'article', this.article._id], {relativeTo: this.route, skipLocationChange: true});
  }

	setError(err: string) {
		this.error = err;
		this.loading = false;
	}

	clearError() {
		this.error = null;
	}
}
