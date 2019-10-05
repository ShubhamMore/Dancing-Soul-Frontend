import { Component, OnInit } from '@angular/core';
import { Article } from '../../../models/articles.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { FormValidator } from '../../../validators/form.validator';
import { HttpService } from '../../../services/httpPost.service';


@Component({
  selector: 'app-admin-edit-article',
  templateUrl: './admin-edit-article.component.html',
  styleUrls: ['./admin-edit-article.component.css']
})
export class AdminEditArticleComponent implements OnInit {

  article: Article;
  id:string;

  loading : boolean = true;
  
  error : string = null;

  imgExt: string[] = ['jpg', 'png'];
  
  form: FormGroup;

  formError: boolean = false;

  constructor(private httpPostService: HttpService,
              private formValidator: FormValidator,
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
      (params:Params) => {
        const _id = params['id'];
        const data = { api : "getArticle", data : { _id }}
        this.httpPostService.httpPost(data).subscribe((val) => {
          this.article = val;
          this.form.setValue({
           title: this.article.title,
           body: this.article.body
          });
          this.loading = false;
        },
        (error) => {
          this.setError(error)
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
      const editedArticle : Article = {
        _id: this.article._id,
        title: this.form.value.title,
        body: this.form.value.body
      }
      const data = { api : "editArticle", data : editedArticle }
      this.httpPostService.httpPostAuth(data).subscribe((val) => {
       this.cancel();
      },
      (error) => {
        this.setError(error)          
      });
    }
  }
  
  cancel() {
    this.loading = true;
    this.router.navigate(['/admin', 'article', this.article._id],{relativeTo: this.route, skipLocationChange:true});
  }

	setError(err : string) {
		this.error = err;
		this.loading = false;
	}

	clearErr() {
		this.error = null;
	}
}