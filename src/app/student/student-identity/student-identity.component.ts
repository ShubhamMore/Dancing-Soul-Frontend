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

  imgExt: string[] = ['jpg', 'png'];

  constructor(private identityService: IdentityService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.loading = true;
    this.error = null;
  
    this.aadharCardPreview = null;
    this.uploadAadharCard = null;
    
    this.invalidAadharCard = false;
    
    this.birthCirtificatePreview = null;
    this.uploadBirthCirtificate = null;
    
    this.invalidBirthCirtificate = false;
  
    this.identityError = false;

    this.route.queryParams.
    subscribe(
      (params: Params) => {
        this.student = params["id"];
        this.identityService.getIdentity(this.student)
        .subscribe((responce: any) => {
          this.identity = responce;
          if (this.identity) {
            this.prepareIdentityImages(this.identity.identityImages);
          }
          this.loading = false;
        },
        (error: any) => {
          this.setError(error);
        });
      }
    );
  }

  prepareIdentityImages(images: ImageModel[]) {
    images.forEach((image) => {
      if(image.image_name.includes('aadharcard')) {
        this.aadharCard = image.secure_url;
      }
      else if(image.image_name.includes('birthcirtificate')) {
        this.birthCirtificate = image.secure_url;
      }
    });
  }
  
  onImagePicked(event: Event, identityType: string) {
    const files = (event.target as HTMLInputElement).files;
    let ext: string = null;
    for(let i = 0; i < files.length; i++) {
      ext = files[i].name.substring(files[i].name.lastIndexOf('.') + 1);
      if(!(this.imgExt.indexOf(ext) != -1)) {
        if(identityType == '0') {

          return this.invalidAadharCard = true;
        } else {
          return this.invalidBirthCirtificate = true;
        }
      }
    }

    this.cancelImage(identityType);
    if(identityType == '0') {
      this.invalidAadharCard = false;
      for(let i = 0; i < files.length; i++) {
        this.uploadAadharCard = files[i];
        const reader = new FileReader();
        reader.onload = () => {
          this.aadharCardPreview = <string>reader.result;
        };
        reader.readAsDataURL(files[i]);
      }
    } else {
      this.invalidBirthCirtificate = false;
      for(let i = 0; i < files.length; i++) {
        this.uploadBirthCirtificate = files[i];
        const reader = new FileReader();
        reader.onload = () => {
          this.birthCirtificatePreview = <string>reader.result;
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  cancelImage(identityType: string) {
    if(identityType == '0') {
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
    console.log("add")
    if(this.uploadAadharCard || this.uploadBirthCirtificate) {
      this.identityError = false;
      const identity = new FormData();
      identity.append("student", this.student)
      if(this.uploadAadharCard) {
        identity.append("image", this.uploadAadharCard, "AadharCard");
      }

      if(this.uploadBirthCirtificate) {
        identity.append("image", this.uploadBirthCirtificate, "BirthCirtificate");
      }
      
      this.loading = true;
      this.identityService.addIdentity(identity)
      .subscribe((responce: any) => {
        console.log(responce)
        this.ngOnInit();
      },
      (error: any) => {
        this.setError(error);
      });
    } else {
      this.identityError = true;      
    }
  }

  editIdentity() {
    console.log("edit")

    if(this.uploadAadharCard || this.uploadBirthCirtificate) {
      this.identityError = false;
      const identity = new FormData();
      identity.append("_id", this.identity._id);
      identity.append("student", this.student)
      if(this.uploadAadharCard) {
        identity.append("image", this.uploadAadharCard, "AadharCard");
      }

      if(this.uploadBirthCirtificate) {
        identity.append("image", this.uploadBirthCirtificate, "BirthCirtificate");
      }

      this.loading = true;
      this.identityService.editIdentity(identity)
      .subscribe((responce: any) => {
        console.log(responce)
        this.ngOnInit();        
      },
      (error: any) => {
        this.setError(error);
      });
    } else {
      this.identityError = true;
    }
  }

	setError(err: string) {
		this.error = err;
		this.loading = false;
	}

	clearError() {
		this.error = null;
	}
}
