import { Injectable } from '@angular/core';
import { HttpService } from './httpPost.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AboutModel } from '../models/about.model';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  constructor(private httpService: HttpService) {}

  getAbout() {
    const data = { api: 'getAbout', data: {} };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  saveAbout(about: AboutModel) {
    console.log(about.aim);
    const data = { api: 'saveAbout', data: about };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }
}
