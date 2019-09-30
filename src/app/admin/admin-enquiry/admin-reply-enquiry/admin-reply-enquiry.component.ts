import { Component, OnInit } from '@angular/core';
import { Enquiry } from '../../../models/enquiry.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../../services/httpPost.service';

@Component({
  selector: 'app-admin-reply-enquiry',
  templateUrl: './admin-reply-enquiry.component.html',
  styleUrls: ['./admin-reply-enquiry.component.css']
})
export class AdminReplyEnquiryComponent implements OnInit {

  form: FormGroup;

  loading : boolean = true;

  error : string = null;

  enquiry: Enquiry;

  constructor(private httpPostService: HttpService,
              private router: Router,
              private route: ActivatedRoute) { }

  id : string;

  ngOnInit() {
    
    this.form = new FormGroup({
      subject: new FormControl(null, {
        validators: [Validators.required]
      }),
      body: new FormControl(null, {
        validators: [Validators.required]
      })
    })

    this.route.params
    .subscribe(
      (params:Params) => {
        this.id = params['id'];
        const data = { api : "getEnquiry", data : { _id : this.id }}
        this.httpPostService.httpPostAuth(data).subscribe((val) => {
         this.enquiry = val;
         this.loading = false;
        },
        (error) => {
          this.setError(error)
        });
      }
    );
  }
  
  sendReply() {
    if(this.form.valid) {
      this.loading = true;
      const reply = { email : this.enquiry.email, subject : this.form.value.subject, body : this.form.value.body }
      const data = { api : "replyEnquiry", data : reply }
      this.httpPostService.httpPostAuth(data).subscribe((val) => {
       this.form.reset();
       this.loading = false;
      },
      (error) => {
        this.setError(error)  
      });
    }
  }

  cancel() {
    this.loading = true;
    this.router.navigate(['/admin', 'enquiry', this.id], {relativeTo:this.route, skipLocationChange: true});
  }

	setError(err : string) {
		this.error = err;
		this.loading = false;
	}

	clearErr() {
		this.error = null;
	}
}