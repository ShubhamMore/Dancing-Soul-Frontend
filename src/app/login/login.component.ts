import { Component, OnInit } from '@angular/core';
import { AuthService, AuthResponseData } from '../auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loginAuth: boolean = true;
  loading : boolean = true;
  error: string = null;

  constructor(private authService: AuthService,
              private roure: ActivatedRoute,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.roure.queryParams
    .subscribe((params: Params) => {
      if(params.status == 'false') {
        this.loginAuth = false;
      }
    });

    this.form = new FormGroup({
      username : new FormControl(null, {
        validators:[Validators.required]
      }),
      password : new FormControl(null, {
        validators:[Validators.required]
      })
    });

    this.loading = false;
  }

  login() {
    if(this.form.invalid) {
      return  this.loginAuth = false;
    }

    if(this.form.valid) {

      let authObs: Observable<AuthResponseData>;
      this.loginAuth = true;

      authObs = this.authService.login(this.form.value.username, this.form.value.password);
      
      
      authObs.subscribe(
        resData => {
          console.log(resData);

            // if(email === "admin" && password === "admin") {
            if(resData.userType === "admin") {
              this.router.navigate(['/admin'], {relativeTo: this.route});
            }
            // else if(email === "student" && password === "student") {
            else if(resData.userType === "student") {

              this.router.navigate(['/student'], {relativeTo: this.route, queryParams: {id : resData._id}});
            }
            // else if(email === "faculty" && password === "faculty") {
            else if(resData.userType === "faculty") {
              this.router.navigate(['/faculty'], {relativeTo: this.route});
              // this.router.navigate(['/faculty'], {relativeTo: this.route, queryParams: {id : user._id}});
            }
          else {
            this.router.navigate(['/login'], {relativeTo: this.route, queryParams: { status: 'false'}, skipLocationChange: true});  
          }
        },
        errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
          // this.isLoading = false;
        }
      );
    
      // this.form.reset();

    }
  }

  alertDismiss() {
    this.loginAuth = true;
  }
}