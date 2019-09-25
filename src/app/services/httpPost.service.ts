import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { EnvVar } from '../shared/config';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

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

    let token = "Bearer "+JSON.parse(localStorage.getItem('userData'))._token;
    return this.http.post(EnvVar.url+data.api, data.data, {
      headers: new HttpHeaders({
        'Authorization': token
      })
    })
    .pipe(
      map((response: any)=>{
          return response;
      }),
      catchError(err => {
          let msg = "SOMETHING BAD HAPPENED";
          if(err.error) {
            console.log(err)
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
}