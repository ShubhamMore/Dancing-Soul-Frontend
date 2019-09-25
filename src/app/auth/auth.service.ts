import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap, map } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';
import { EnvVar } from '../shared/config';

export interface AuthResponseData {
  _id: string;
  email: string;
  userType : string;
  token: string;
  expiresIn: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    const data = {
      email: email,
      password: password
    }
    return this.http
      .post<AuthResponseData>(EnvVar.url+'login', data)
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData._id,
            resData.userType,
            resData.token,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      userType : string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData.userType,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    console.log(loadedUser)

    if (loadedUser.token) {
      console.log(true)
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    
    let token = "";
    if(localStorage.getItem('userData')) {
      token = 'Bearer '+JSON.parse(localStorage.getItem('userData'))._token;
    }
    console.log(token)
    const headers = new HttpHeaders().set('Authorization', token);
    this.http.post(EnvVar.url+"logout", {}, { headers })
    .subscribe(
      resData => {
        console.log(resData)
        this.user.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
          clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
      },
      errorMessage => {
        console.log(errorMessage)
      }
    );
  }

  logoutAll() {
    
    let token = "";
    if(localStorage.getItem('userData')) {
      token = 'Bearer '+JSON.parse(localStorage.getItem('userData'))._token;
    }
    const headers = new HttpHeaders().set('Authorization', token);

    return this.http.post(EnvVar.url+"logoutAll", {}, { headers })
    .subscribe(
      resData => {
        this.user.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
          clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
      },
      errorMessage => {
      }
    );
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    userType : string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, userType, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if(errorRes.error) {
      if(typeof(errorRes.error) === "object") {
        errorMessage = "Can't Reach Server.., Please Try Again";
      }
      else{
        errorMessage = errorRes.error;
      }
    }
    return throwError(errorMessage);
  }
}