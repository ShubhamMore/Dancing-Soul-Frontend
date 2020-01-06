import { Injectable } from '@angular/core';
import { HttpService } from './httpPost.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private httpService: HttpService) {}

  getDashboardData() {
    const data = { api: 'getDashboardData', data: {} };
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
