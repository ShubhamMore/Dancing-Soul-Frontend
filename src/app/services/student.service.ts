import { Injectable } from '@angular/core';
import { HttpService } from './httpPost.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private httpService: HttpService) {}

  addStudent(student: any) {
    const data = { api: 'addStudent', data: student };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getStudents(branch: string, batch: string, weekType: string) {
    const data = { api: 'getStudents', data: { branch, batch, weekType } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getStudent(id: string) {
    const data = { api: 'getStudent', data: { _id: id } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getStudentForReceipt(id: string) {
    const data = { api: 'getStudentForReceipt', data: { _id: id } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getStudentForEditing(id: string) {
    const data = { api: 'getStudentForEditing', data: { _id: id } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  editStudent(student: FormData) {
    const data = { api: 'editStudent', data: student };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  changeStudentStatus(id: string, status: string) {
    const data = { api: 'changeStudentStatus', data: { _id: id, status } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  deleteStudent(id: string, password: string) {
    const data = { api: 'deleteStudent', data: { _id: id, password } };
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
