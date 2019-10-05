import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { FormValidator } from '../../../validators/form.validator';
import { HttpService } from '../../../services/httpPost.service';


@Component({
  selector: 'app-admin-edit-news',
  templateUrl: './admin-edit-news.component.html',
  styleUrls: ['./admin-edit-news.component.css']
})
export class AdminEditNewsComponent implements OnInit {

  news: any;
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
        const data = { api : "getNews", data : { _id }}
        this.httpPostService.httpPost(data).subscribe((val) => {
          this.news = val;
          this.form.setValue({
           title: this.news.title,
           body: this.news.body
          });
          this.loading = false;
        },
        (error) => {
          this.setError(error)
        });
      }
    );
  }

  editNews() {
    if(this.form.invalid) {
      this.formError = true;
    }

    if(this.form.valid) {
      this.loading = true;
      this.formError = false;
      const editednews = {
        _id: this.news._id,
        title: this.form.value.title,
        body: this.form.value.body
      }
      const data = { api : "editNews", data : editednews }
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
    this.router.navigate(['/admin', 'news', this.news._id],{relativeTo: this.route, skipLocationChange:true});
  }

  setError(err : string) {
		this.error = err;
		this.loading = false;
	}

	clearErr() {
		this.error = null;
	}
}