import { Component, OnInit } from '@angular/core';
import { EnquiryModel } from '../../../models/enquiry.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EnquiryService } from '../../../services/enquiry.service';

@Component({
  selector: 'app-admin-reply-enquiry',
  templateUrl: './admin-reply-enquiry.component.html',
  styleUrls: ['./admin-reply-enquiry.component.css']
})
export class AdminReplyEnquiryComponent implements OnInit {

  form: FormGroup;

  loading: boolean = true;

  error: string = null;

  enquiry: EnquiryModel;

  _id: string;

  constructor(private enquiryService: EnquiryService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.form = new FormGroup({
      subject: new FormControl(null, {
        validators: [Validators.required]
      }),
      body: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.route.params
    .subscribe(
      (params: Params) => {
        this._id = params['id'];
        
        this.enquiryService.getEnquiryForReply(this._id)
        .subscribe((responce: EnquiryModel) => {
         this.enquiry = responce;
         this.loading = false;
        },
        (error: any) => {
          this.setError(error);
        });
      }
    );
  }

  sendReply() {
    if(this.form.valid) {
      this.loading = true;
      const reply = {
        email : this.enquiry.email,
        subject : this.form.value.subject,
        body : this.form.value.body
      }

      this.enquiryService.replyEnquiry(reply)
      .subscribe((responce: any) => {
        this.form.reset();
        this.loading = false;
      },
      (error: any) => {
        this.setError(error);
      });
    }
  }

  cancel() {
    this.loading = true;
    this.router.navigate(['/admin', 'enquiry', this._id], {relativeTo:this.route, skipLocationChange: true});
  }

	setError(err: string) {
		this.error = err;
		this.loading = false;
	}

	clearError() {
		this.error = null;
	}
}
