import { Injectable } from '@angular/core';
import { HttpService } from './httpPost.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  constructor(private httpService: HttpService) {}

  saveCertificate(certificate: FormData) {
    const data = { api: 'saveCertificate', data: certificate };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getCertificates(student: string) {
    const data = { api: 'getCertificates', data: { student } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  removeCertificate(id: string, publicId: string) {
    const data = { api: 'removeCertificate', data: { _id: id, public_id: publicId } };
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
