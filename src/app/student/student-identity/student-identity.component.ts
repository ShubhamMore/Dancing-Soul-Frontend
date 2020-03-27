import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IdentityService } from '../../services/identity.service';
import { IdentityModel } from '../../models/identity.model';
import { ImageModel } from '../../models/image.model';

@Component({
  selector: 'app-student-identity',
  templateUrl: './student-identity.component.html',
  styleUrls: ['./student-identity.component.css']
})
export class StudentIdentityComponent implements OnInit {
  student: string;

  identity: IdentityModel;

  aadharCard: any;
  birthCirtificate: any;

  loading: boolean;
  error: string;

  aadharCardPreview: string;
  uploadAadharCard: File;

  invalidAadharCard: boolean;

  birthCirtificatePreview: string;
  uploadBirthCirtificate: File;

  invalidBirthCirtificate: boolean;

  identityError: boolean;

  imgExt: string[];

  constructor(
    private identityService: IdentityService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;

    this.aadharCardPreview = null;
    this.uploadAadharCard = null;
    this.invalidAadharCard = false;

    this.birthCirtificatePreview = null;
    this.uploadBirthCirtificate = null;
    this.invalidBirthCirtificate = false;

    this.identityError = false;
    this.imgExt = ['jpg', 'png'];

    this.route.queryParams.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      this.student = params['id'];
      this.identityService.getIdentity(this.student).subscribe(
        (responce: any) => {
          this.identity = responce;
          if (this.identity) {
            this.prepareIdentityImages(this.identity.identityImages);
          }
          this.loading = false;
        },
        (error: any) => {
          this.setError(error);
        }
      );
    });
  }

  prepareIdentityImages(images: ImageModel[]) {
    images.forEach(image => {
      if (image.image_name.includes('aadharcard')) {
        this.aadharCard = image;
      } else if (image.image_name.includes('birthcirtificate')) {
        this.birthCirtificate = image;
      }
    });
  }

  onImagePicked(event: Event, identityType: string) {
    const files = (event.target as HTMLInputElement).files;
    let ext: string = null;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
      ext = files[i].name.substring(files[i].name.lastIndexOf('.') + 1).toLowerCase();
      if (!(this.imgExt.indexOf(ext) !== -1)) {
        if (identityType === '0') {
          return (this.invalidAadharCard = true);
        } else {
          return (this.invalidBirthCirtificate = true);
        }
      }
    }

    this.cancelImage(identityType);
    if (identityType === '0') {
      this.invalidAadharCard = false;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < files.length; i++) {
        this.uploadAadharCard = files[i];
        const reader = new FileReader();
        reader.onload = () => {
          this.aadharCardPreview = reader.result as string;
        };
        reader.readAsDataURL(files[i]);
      }
    } else {
      this.invalidBirthCirtificate = false;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < files.length; i++) {
        this.uploadBirthCirtificate = files[i];
        const reader = new FileReader();
        reader.onload = () => {
          this.birthCirtificatePreview = reader.result as string;
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  cancelImage(identityType: string) {
    if (identityType === '0') {
      this.aadharCardPreview = null;
      this.uploadAadharCard = null;
      this.invalidAadharCard = false;
    } else {
      this.birthCirtificatePreview = null;
      this.uploadBirthCirtificate = null;
      this.invalidBirthCirtificate = false;
    }
  }

  addIdentity() {
    if (this.uploadAadharCard || this.uploadBirthCirtificate) {
      this.identityError = false;
      const identity = new FormData();
      identity.append('student', this.student);
      if (this.uploadAadharCard) {
        identity.append('image', this.uploadAadharCard, 'AadharCard');
      }

      if (this.uploadBirthCirtificate) {
        identity.append('image', this.uploadBirthCirtificate, 'BirthCirtificate');
      }

      this.loading = true;
      this.identityService.addIdentity(identity).subscribe(
        (responce: any) => {
          this.ngOnInit();
        },
        (error: any) => {
          this.setError(error);
        }
      );
    } else {
      this.identityError = true;
    }
  }

  editIdentity() {
    if (this.uploadAadharCard || this.uploadBirthCirtificate) {
      this.identityError = false;
      const identity = new FormData();
      identity.append('_id', this.identity._id);
      identity.append('student', this.student);
      if (this.uploadAadharCard) {
        identity.append('image', this.uploadAadharCard, 'AadharCard');
      }

      if (this.uploadBirthCirtificate) {
        identity.append('image', this.uploadBirthCirtificate, 'BirthCirtificate');
      }

      this.loading = true;
      this.identityService.editIdentity(identity).subscribe(
        (responce: any) => {
          this.ngOnInit();
        },
        (error: any) => {
          this.setError(error);
        }
      );
    } else {
      this.identityError = true;
    }
  }

  deleteIdentity(publicId: string) {
    this.loading = true;
    this.identityService.removeIdentity(this.identity._id, publicId).subscribe(
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
