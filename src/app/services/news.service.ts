import { Injectable } from '@angular/core';
import { HttpService } from './httpPost.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NewsModel } from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpService: HttpService) { }

  addNews(news: any) {
    const data = {api: 'addNews', data: news};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getAllNews() {
    const data = {api: 'getAllNews', data: {}};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getNews(_id: string) {
    const data = {api: 'getNews', data: {_id}};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  editNews(news: NewsModel) {
    const data = {api: 'editArticle', data: news};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  deleteNews(_id: string) {
    const data = {api: 'deleteNews', data: {_id}};
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
