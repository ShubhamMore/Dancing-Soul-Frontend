import { Injectable } from '@angular/core';
import { HttpService } from './httpPost.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EnquiryModel } from '../models/enquiry.model';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  constructor(private httpService: HttpService) { }

  getEnquiries() {
    const data = { api: "getEnquiries", data: { }}
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  sendEnquiry(sendEmailData: any) {
    const data = { api: "sendEnquiry", data: sendEmailData}
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getEnquiry(_id: string) {
    const data = { api: "getEnquiry", data: { _id }}
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getEnquiryForReply(_id: string) {
    const data = { api: "getEnquiryForReply", data: { _id }}
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getUnseenEnquiries() {
    const data = { api: "getUnseenEnquiries", data: { }}
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  replyEnquiry(reply: any) {
    const data = { api : "replyEnquiry", data : reply }
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
