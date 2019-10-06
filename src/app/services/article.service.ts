import { Injectable } from '@angular/core';
import { HttpService } from './httpPost.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ArticleModel } from '../models/articles.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpService: HttpService) { }

  addArticle(article: any) {
    const data = {api: 'addArticle', data: article};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getArticles() {
    const data = {api: 'getArticles', data: {}};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getArticle(_id: string) {
    const data = {api: 'getArticle', data: {_id}};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  editArticle(article: ArticleModel) {
    const data = {api: 'editArticle', data: article};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  deleteArticle(_id: string) {
    const data = {api: 'deleteArticle', data: {_id}};
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
