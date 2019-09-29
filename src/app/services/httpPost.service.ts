import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { EnvVar } from '../shared/config';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient,
              private router : Router,
              private route : ActivatedRoute) { }

  public httpPost(data: any) : any {
    return this.http.post(EnvVar.url+data.api, data.data)
    .pipe(
      map((response: any)=>{
          return response;
        }),
        catchError(err => {
          let msg = "SOMETHING BAD HAPPENED";
          if(err.error) {
            if(typeof(err.error) === "object") {
              msg = "Can't Reach Server.., Please Try Again";
            }
            else{
              msg = err.error;
            }
          }
          return throwError(msg);
      })
    );
  }

  public httpPostAuth(data: any) : any {
    let token = "";
    console.log(localStorage.getItem('userData'))
    if(localStorage.getItem('userData')) {
      token = 'Bearer '+JSON.parse(localStorage.getItem('userData'))._token;
    }
    console.log(token)
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.post(EnvVar.url+data.api, data.data, { headers })
    .pipe(
      map((response: any)=>{
          return response;
      }),
      catchError(err => {
          let msg = "SOMETHING BAD HAPPENED";
          console.log(err.error)
          if(err.error) {
            if(err.error.error === "Please authenticate.") {
              console.log(err.error)
              this.router.navigate(["/login"], {relativeTo: this.route, queryParams: { status: 'false'}});
            }
            else if(typeof(err.error) === "object") {
              msg = "Can't Reach Server.., Please Try Again";
            }
            else{
              msg = err.error;
            }
          }
          return throwError(msg);
      })
    );
  }
}