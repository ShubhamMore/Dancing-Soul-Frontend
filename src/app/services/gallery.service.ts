import { Injectable } from '@angular/core';
import { HttpService } from './httpPost.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private httpService: HttpService) { }

  addImages(images: FormData) {
    const data = { api : "addImages", data : images }       
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getImages() {
    const data = { api : "getImages", data : {}}        
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getAllImages() {
    const data = { api : "getAllImages", data : {}}        
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  removeImage(public_id: string) {
    const data = { api : "removeImage", data : {public_id}}         
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
