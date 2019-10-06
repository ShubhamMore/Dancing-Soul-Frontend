import { Injectable } from '@angular/core';
import { HttpService } from './httpPost.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private httpService: HttpService) { }

  addBranch(branch: any) {
    const data = {api: 'addBranch', data: branch};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getBranches() {
    const data = {api: 'getBranches', data: {}};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getBranch(_id: string) {
    const data = {api: 'getBranch', data: {_id}};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  editBrnach(branch: FormData) {
    const data = {api: 'editBranch', data: branch};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  changeBranchStatus(_id: string, status: string) {
    const data = {api: 'changeBranchStatus', data: {_id, status}};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  deleteBranch(_id: string, password: string) {
    const data = {api: 'deleteBranch', data: {_id, password}};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  deleteImage(_id: string, public_id: string) {
    const data = { api : "deleteBranchImage", data : {_id, public_id}}    
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
