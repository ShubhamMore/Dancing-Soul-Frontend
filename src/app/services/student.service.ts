import { Injectable } from '@angular/core';
import { HttpService } from './httpPost.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { StudentModel } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpService: HttpService) { }

  addStudent(student: any) {
    const data = {api: 'addStudent', data: student};
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
    const data = {api: 'getStudents', data: {branch, batch, weekType}};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getStudent(_id: string) {
    const data = {api: 'getStudent', data: {_id}};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getStudentForReceipt(_id: string) {
    const data = { api : "getStudentForReceipt", data : { _id }}
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getStudentForEditing(_id: string) {
    const data = {api: 'getStudentForEditing', data: {_id}};
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
    const data = {api: 'editStudent', data: student};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  changeStudentStatus(_id: string, status: string) {
    const data = {api: 'changeStudentStatus', data: {_id, status}};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  deleteStudent(_id: string, password: string) {
    const data = {api: 'deleteStudent', data: {_id, password}};
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
