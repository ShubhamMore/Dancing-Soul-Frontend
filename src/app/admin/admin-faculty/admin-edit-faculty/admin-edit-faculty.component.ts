import { Component, OnInit } from '@angular/core';
import { Faculty } from '../../../models/faculty.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { FormValidator } from '../../../validators/form.validator';
import { HttpService } from '../../../services/httpPost.service';

@Component({
  selector: 'app-admin-edit-faculty',
  templateUrl: './admin-edit-faculty.component.html',
  styleUrls: ['./admin-edit-faculty.component.css']
})
export class AdminEditFacultyComponent implements OnInit {

  faculty: Faculty = null;
  form: FormGroup;

  loading: boolean = true;

  error : string = null;

  imagePreview: string = null;
  uploadImage: File = null;

  invalidImage : boolean = false;

  formError: boolean = false;

  imgExt: string[] = ['jpg', 'png'];

  
  constructor(private httpPostService: HttpService,
              private formValidator: FormValidator,
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

    this.route.params
    .subscribe(
      (params: Params) => {
        const _id = params['id'];
        const data = { api : "getFaculty", data : { _id }}
        this.httpPostService.httpPostAuth(data).subscribe((val) => {
          this.faculty = val;

          this.form.setValue({
            name: this.faculty.name,
            birthDate: this.faculty.birthDate,
            email: this.faculty.email,
            phone: this.faculty.phone,
            description: this.faculty.description
          });

          this.loading = false;
        },
        (error) => {
          this.setError(error)
        });
      }
    ); 
  }

  onImagePicked(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    const imgExt : string[] = ["jpg", "png"];
    let ext : string = null;
    for(let i = 0; i < files.length; i++) {
      ext = files[i].name.substring(files[i].name.lastIndexOf('.') + 1);
      if(!(imgExt.indexOf(ext)!=-1)) {
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

  editFaculty() {
    if(this.form.invalid) {
      this.formError = true;
    }
  
    if(this.form.valid) {
      this.formError = false;
      this.loading = true;
      
      const faculty = new FormData();
      faculty.append("_id", this.faculty._id);
      faculty.append("name", this.form.value.name);
      faculty.append("birthDate", this.form.value.birthDate);
      faculty.append("description", this.form.value.description);
      faculty.append("email", this.form.value.email);
      faculty.append("phone", this.form.value.phone);
      faculty.append("status", this.faculty.status);

      if(this.uploadImage) {
        faculty.append("image", this.uploadImage, "faculty");
      }

      this.loading = true;
      
      const data = { api : "editFaculty", data : faculty }
      this.httpPostService.httpPostAuth(data).subscribe((val) => {
        this.form.reset();
        this.cancel();
      },
      (error) => {
        this.setError(error)
      });
    }
  }
  
  cancel() {
    this.loading = true;
    this.router.navigate(['/admin', 'faculty', this.faculty._id], {relativeTo:this.route, skipLocationChange:true});
  }

  setError(err : string) {
		this.error = err;
		this.loading = false;
	}

	clearErr() {
		this.error = null;
	}
}