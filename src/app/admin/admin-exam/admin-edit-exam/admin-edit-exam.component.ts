import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { FormValidator } from '../../../validators/form.validator';
import { HttpService } from '../../../services/httpPost.service';


@Component({
  selector: 'app-admin-edit-exam',
  templateUrl: './admin-edit-exam.component.html',
  styleUrls: ['./admin-edit-exam.component.css']
})
export class AdminEditExamComponent implements OnInit {

  exam: any;
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
        const data = { api : "getExam", data : { _id }}
        this.httpPostService.httpPost(data).subscribe((val) => {
          this.exam = val;
          this.form.setValue({
           title: this.exam.title,
           body: this.exam.body
          });
          this.loading = false;
        },
        (error) => {
          this.setError(error)
        });
      }
    );
  }

  editExam() {
    if(this.form.invalid) {
      this.formError = true;
    }

    if(this.form.valid) {
      this.loading = true;
      this.formError = false;
      const editedexam = {
        _id: this.exam._id,
        title: this.form.value.title,
        body: this.form.value.body
      }
      const data = { api : "editExam", data : editedexam }
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

    this.router.navigate(['/admin', 'exams', this.exam._id], {relativeTo: this.route, skipLocationChange:true});
  }
  
	setError(err : string) {
		this.error = err;
		this.loading = false;
	}

	clearErr() {
		this.error = null;
	}
}