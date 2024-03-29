import { Injectable } from '@angular/core';
import { HttpService } from './httpPost.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  constructor(private httpService: HttpService) {}

  getStudentsForAttendance(branch: string, batch: string, batchType: string) {
    const data = { api: 'getStudentsForAttendance', data: { branch, batch, batchType } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  saveAttendance(attendance: any) {
    const data = { api: 'saveAttendance', data: attendance };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getAttendance(id: string) {
    const data = { api: 'getAttendance', data: { _id: id } };
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
