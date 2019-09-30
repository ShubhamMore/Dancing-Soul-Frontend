import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidator } from '../../../validators/form.validator';
import { HttpService } from '../../../services/httpPost.service';

@Component({
  selector: 'app-admin-add-article',
  templateUrl: './admin-add-article.component.html',
  styleUrls: ['./admin-add-article.component.css']
})
export class AdminAddArticleComponent implements OnInit {
  
  form: FormGroup;

  loading : boolean = true;

  formError: boolean = false;
  
  error : string = null;

  imgExt: string[] = ['jpg', 'png'];

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

    this.loading = false;
  }

  addArticle() {
    if(this.form.invalid) {
      this.formError = true;
    }

    if(this.form.valid) {
      this.formError = false;
      this.loading = true;
      const article = { title: this.form.value.title, body : this.form.value.body}
      const data = { api : "addArticle", data : article }
      this.httpPostService.httpPostAuth(data).subscribe((val) => {
       this.form.reset();
       this.cancel();
      },
      (error) => {
        this.setError(error)
      });
    }
  }

  cancel() {
    this.loading = true;
    this.router.navigate(["/admin", "article"], {relativeTo: this.route, skipLocationChange:true});        
  }

	setError(err : string) {
		this.error = err;
		this.loading = false;
	}

	clearErr() {
		this.error = null;
	}
}