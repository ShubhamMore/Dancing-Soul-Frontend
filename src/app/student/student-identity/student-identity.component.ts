import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { IdentityModel, IdentityImageModel } from '../../models/identity.model';

@Component({
  selector: 'app-student-identity',
  templateUrl: './student-identity.component.html',
  styleUrls: ['./student-identity.component.css']
})
export class StudentIdentityComponent implements OnInit {

  identity: IdentityModel;
  identityImages: IdentityImageModel[];

  loading: boolean = true;
  error: string = null;

  imagePreview: string[] = [];
  uploadImages: File[] = [];

  invalidImage: boolean = false;
  imgExt: string[] = ['jpg', 'png'];

  constructor(private studentService: StudentService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.identityImages = [];
    this.route.queryParams.
    subscribe(
      (params: Params) => {
        const _id = params["id"];
        this.studentService.getIdentity(_id)
        .subscribe((responce: any) => {
          this.identity = responce;
          if (this.identity) {
            this.identityImages = this.identity.identityImages;
          }
          this.loading = false;
        },
        (error: any) => {
          this.setError(error);
        });
      }
    );
  }
    
  onImagePicked(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    let ext: string = null;
    for(let i = 0; i < files.length; i++) {
      ext = files[i].name.substring(files[i].name.lastIndexOf('.') + 1);
      if(!(this.imgExt.indexOf(ext) != -1)) {
        return this.invalidImage = true;
      }
    }
    this.invalidImage = false;
    for(let i = 0; i < files.length; i++) {
      this.uploadImages.push(files[i]);
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview.push(<string>reader.result);
      };
      reader.readAsDataURL(files[i]);
    }
  }

  cancelImage(index: number) {
    this.imagePreview.splice(index, 1);
    this.uploadImages.splice(index, 1);
  }

  addIdentity() {
    const identity = new FormData();

    this.studentService.addIdentity(identity)
    .subscribe((responce: any) => {
      this.identity = responce;
      if (this.identity) {

      }
      this.loading = false;
    },
    (error: any) => {
      this.setError(error);
    });
  }

  editIdentity() {
    const identity = new FormData();
    identity.append("_id", this.identity._id);

    this.studentService.editIdentity(identity)
    .subscribe((responce: any) => {
      this.identity = responce;
      if (this.identity) {

      }
      this.loading = false;
    },
    (error: any) => {
      this.setError(error);
    });
  }

	setError(err: string) {
		this.error = err;
		this.loading = false;
	}

	clearError() {
		this.error = null;
	}

}
