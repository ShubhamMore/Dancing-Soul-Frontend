import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { HttpService } from '../../services/httpPost.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;

  loading : boolean = true;

  token: string;
  user: string;

  constructor(private httpPostService: HttpService,
              private authService: AuthService,
              private roure: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.form = new FormGroup({
      newPassword : new FormControl(null, {
        validators:[Validators.required]
      }),
      confirmPassword : new FormControl(null, {
        validators:[Validators.required]
      })
    }); 

    this.roure.queryParams
    .subscribe((params: Params) => {
      if(params.token === undefined) {
        this.router.navigate(['/page_not_found'], {relativeTo: this.roure});
      }
      else {
        this.token = params.token;
        localStorage.setItem("access_token", this.token);
        const data = { api : "validateToken", data : { token : this.token }}
        this.httpPostService.httpPost(data).subscribe((val) => {
          
          if(val.valid_token) {
            this.loading = false;
          }
          else {
            this.router.navigate(['/page_not_found'], {relativeTo: this.roure});
         }
        },
        (error) => {
        
        });
      }
    });

  }

  resetPassword() {
    if(this.form.valid) {

      this.loading = true;

      const resetPassword = {
        // user : this.user,
        password : this.form.value.newPassword,
        token : this.token
      }

      const data = { api : "resetPassword", data : resetPassword }
      this.httpPostService.httpPost(data).subscribe((val) => {
       this.form.reset();
       this.router.navigate(["/login"], {relativeTo: this.roure});
      },
      (error) => {
       this.loading = false;
      });
    }
  }
}
