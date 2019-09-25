import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { HttpService } from '../../services/httpPost.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;

  loginAuth: boolean = true;

  loading : boolean = true;

  linkSend: boolean = false;

  constructor(private httpPostService: HttpService,
              private authService: AuthService) { }

  ngOnInit() {

    this.form = new FormGroup({
      forgotPassword : new FormControl(null, {
        validators:[Validators.required]
      })
    }); 

    this.loading = false;
  }

  forgotPassword() {
    if(this.form.invalid) {
      return  this.loginAuth = false;
    }

    if(this.form.valid) {
      this.loginAuth = true;
      this.loading = true;
      const data = { api : "forgotPassword", data : { email : this.form.value.forgotPassword }}
      this.httpPostService.httpPost(data).subscribe((val) => {
       this.linkSend = true;
       this.loading = false;
      },
      (error) => {
       this.loading = false;
      });
    }
  }

  alertDismiss() {
    this.loginAuth = true;
    this.linkSend = false;
  }
}