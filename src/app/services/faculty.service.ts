import { Injectable } from '@angular/core';
import { HttpService } from './httpPost.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  constructor(private httpService: HttpService) { }

  addFaculty(faculty: any) {
    const data = {api: 'addFaculty', data: faculty};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getFaculties() {
    const data = {api: 'getFaculties', data: {}};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getFaculty(_id: string) {
    const data = {api: 'getFaculty', data: {_id}};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  editFaculty(faculty: FormData) {
    const data = {api: 'editFaculty', data: faculty};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  changeFacultyStatus(_id: string, status: string) {
    const data = {api: 'changeFacultyStatus', data: {_id, status}};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  deleteFaculty(_id: string, password: string) {
    const data = {api: 'deleteFaculty', data: {_id, password}};
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
