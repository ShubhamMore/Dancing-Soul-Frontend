import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidator } from '../../../validators/form.validator';
import { HttpService } from '../../../services/httpPost.service';

@Component({
  selector: 'app-admin-add-news',
  templateUrl: './admin-add-news.component.html',
  styleUrls: ['./admin-add-news.component.css']
})
export class AdminAddNewsComponent implements OnInit {
  
  form: FormGroup;

  loading : boolean = true;

  formError: boolean = false;

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

  addNews() {
    if(this.form.invalid) {
      this.formError = true;
    }

    if(this.form.valid) {
      this.formError = false;
      this.loading = true;
      const news = { title: this.form.value.title, body : this.form.value.body}
      const data = { api : "addNews", data : news }
      this.httpPostService.httpPostAuth(data).subscribe((val) => {
       this.form.reset();
       this.cancel();
      },
      (error) => {
      this.loading = false;
      });
    }
  }

  cancel() {
    this.loading = true;
    this.router.navigate(["/admin", "news"], {relativeTo: this.route, skipLocationChange:true});        
  }
}