import { Injectable } from '@angular/core';
import { HttpService } from './httpPost.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ContentModel } from '../models/content.model';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor(private httpService: HttpService) {}

  getContent() {
    const data = { api: 'getContent', data: {} };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  saveContent(content: any) {
    const data = { api: 'saveContent', data: content };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
