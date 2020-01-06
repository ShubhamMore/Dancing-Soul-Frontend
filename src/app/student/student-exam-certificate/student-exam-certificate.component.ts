import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CertificateService } from '../../services/certificate.service';
import { CertificateModel } from '../../models/certificate.model';
import { ImageModel } from '../../models/image.model';

@Component({
  selector: 'app-student-exam-certificate',
  templateUrl: './student-exam-certificate.component.html',
  styleUrls: ['./student-exam-certificate.component.css']
})
export class StudentExamCertificateComponent implements OnInit {
  student: string;

  certificate: CertificateModel;

  certificates: ImageModel[];

  loading: boolean;
  error: string;

  certificatePreview: string;
  uploadCertificate: File;

  invalidCertificate: boolean;

  certificateError: boolean;

  certificateTitle: string;

  imgExt: string[];

  constructor(
    private certificateService: CertificateService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.certificates = [];
    this.invalidCertificate = false;
    this.certificateTitle = 'certificate';
    this.certificateError = false;
    this.imgExt = ['jpg', 'png'];
    this.route.queryParams.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      this.student = params['id'];
      this.certificateService.getCertificates(this.student).subscribe(
        (responce: any) => {
          this.certificate = responce;
          if (this.certificate) {
            this.certificates = this.certificate.certificateImages;
          }
          this.loading = false;
        },
        (error: any) => {
          this.setError(error);
        }
      );
    });
  }

  onImagePicked(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    let ext: string = null;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
      ext = files[i].name.substring(files[i].name.lastIndexOf('.') + 1).toLowerCase();
      if (!(this.imgExt.indexOf(ext) !== -1)) {
        return (this.invalidCertificate = true);
      }

      this.cancelCertificate();

      this.invalidCertificate = false;
      // tslint:disable-next-line: prefer-for-of
      for (let j = 0; j < files.length; j++) {
        this.uploadCertificate = files[j];
        const reader = new FileReader();
        reader.onload = () => {
          this.certificatePreview = reader.result as string;
        };
        reader.readAsDataURL(files[j]);
      }
    }
  }

  cancelCertificate() {
    this.certificatePreview = null;
    this.uploadCertificate = null;
    this.invalidCertificate = false;
  }

  saveCertificate() {
    if (this.uploadCertificate) {
      this.certificateError = false;
      const certificate = new FormData();

      if (this.certificate) {
        certificate.append('_id', this.certificate._id);
      }

      certificate.append('student', this.student);
      if (this.uploadCertificate) {
        certificate.append('image', this.uploadCertificate, this.certificateTitle);
      }

      this.loading = true;
      this.certificateService.saveCertificate(certificate).subscribe(
        (responce: any) => {
          this.ngOnInit();
        },
        (error: any) => {
          this.setError(error);
        }
      );
    } else {
      this.certificateError = true;
    }
  }

  deleteCertificate(publicId: string) {
    this.loading = true;
    this.certificateService.removeCertificate(this.certificate._id, publicId).subscribe(
      (responce: any) => {
        this.ngOnInit();
      },
      (error: any) => {
        this.setError(error);
      }
    );
  }

  setError(err: string) {
    this.error = err;
    this.loading = false;
  }

  clearError() {
    this.error = null;
  }
}
