import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { HttpService } from '../../services/httpPost.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;

  loading: boolean;
  error: string;
  user: string;

  constructor(
    private httpPostService: HttpService,
    private authService: AuthService,
    private roure: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.form = new FormGroup({
      currentPassword: new FormControl(null, {
        validators: [Validators.required]
      }),
      newPassword: new FormControl(null, {
        validators: [Validators.required]
      }),
      confirmPassword: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.user = '';

    this.loading = false;
  }

  changePassword() {
    if (this.form.valid) {
      this.loading = true;

      const data = {
        api: 'changePassword',
        data: {
          email: JSON.parse(localStorage.getItem('userData')).email,
          password: this.form.value.currentPassword,
          newPassword: this.form.value.newPassword
        }
      };

      this.httpPostService.httpPostAuth(data).subscribe(
        val => {
          this.loading = false;
          this.form.reset();
        },
        error => {
          this.setError(error);
        }
      );
    }
  }

  setError(err: string) {
    this.error = err;
    this.loading = false;
  }

  clearErr() {
    this.error = null;
  }
}
