import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FacultyService } from '../../../services/faculty.service';

@Component({
  selector: 'app-admin-add-faculty',
  templateUrl: './admin-add-faculty.component.html',
  styleUrls: ['./admin-add-faculty.component.css']
})
export class AdminAddFacultyComponent implements OnInit {

  form: FormGroup;

  loading: boolean = true;

  error : string = null;

  formError: boolean = false;

  imagePreview: string = null;
  uploadImage: File = null;

  invalidImage : boolean = false;

  imgExt: string[] = ['jpg', 'png'];

  constructor(private facultyService: FacultyService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required]
      }),
      birthDate: new FormControl(null, {
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      phone: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
      }),
      description: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.loading = false;

  }

  addFaculty() {
    if (this.form.invalid) {
      this.formError = true;
    }

    if (this.form.valid) {
      this.formError = false;
      this.loading = true;

      const faculty = new FormData();
      faculty.append("name", this.form.value.name);
      faculty.append("birthDate", this.form.value.birthDate);
      faculty.append("description", this.form.value.description);
      faculty.append("email", this.form.value.email);
      faculty.append("phone", this.form.value.phone);
      faculty.append("status", "1");

      if (this.uploadImage) {
        faculty.append("image", this.uploadImage, "faculty");
      }

      this.facultyService.addFaculty(faculty)
      .subscribe((responce: any) => {
        this.form.reset();
        this.cancel();
      },(error: any) => {
        this.setError(error);
      });
    }
  }

  onImagePicked(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    const imgExt: string[] = ["jpg", "png"];
    let ext: string = null;
    for(let i = 0; i < files.length; i++) {
      ext = files[i].name.substring(files[i].name.lastIndexOf('.') + 1);
      if(!(imgExt.indexOf(ext) != -1)) {
        return this.invalidImage = true;
      }
    }
    this.invalidImage = false;
    for(let i = 0; i < files.length; i++) {
      this.uploadImage = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = <string>reader.result;
      };
      reader.readAsDataURL(files[i]);
    }
  }

  cancelImage() {
    this.imagePreview = null;
    this.uploadImage = null;
    this.invalidImage = false;
  }

  cancel() {
    this.loading = true;
    this.router.navigate(['/admin', 'faculty'], {relativeTo: this.route, skipLocationChange: true});
  }

  setError(err: string) {
		this.error = err;
		this.loading = false;
	}

	clearError() {
		this.error = null;
	}

}
