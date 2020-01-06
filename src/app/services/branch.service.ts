import { Injectable } from '@angular/core';
import { HttpService } from './httpPost.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  constructor(private httpService: HttpService) {}

  addBranch(branch: any) {
    const data = { api: 'addBranch', data: branch };
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
    const data = { api: 'getBranches', data: {} };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getActivateBranches() {
    const data = { api: 'getActivateBranches', data: {} };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getBranch(id: string) {
    const data = { api: 'getBranch', data: { _id: id } };
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
    const data = { api: 'editBranch', data: branch };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  changeBranchStatus(id: string, status: string) {
    const data = { api: 'changeBranchStatus', data: { _id: id, status } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  deleteBranch(id: string, password: string) {
    const data = { api: 'deleteBranch', data: { _id: id, password } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  deleteImage(id: string, publicId: string) {
    const data = { api: 'deleteBranchImage', data: { _id: id, public_id: publicId } };
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
