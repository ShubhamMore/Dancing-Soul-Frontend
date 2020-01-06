import { Injectable } from '@angular/core';
import { HttpService } from './httpPost.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ExamModel } from '../models/exams.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  constructor(private httpService: HttpService) {}

  addExam(exam: any) {
    const data = { api: 'addExam', data: exam };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getExams() {
    const data = { api: 'getExams', data: {} };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getExam(id: string) {
    const data = { api: 'getExam', data: { _id: id } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  editExam(exam: ExamModel) {
    const data = { api: 'editExam', data: exam };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  deleteExam(id: string) {
    const data = { api: 'deleteExam', data: { _id: id } };
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
