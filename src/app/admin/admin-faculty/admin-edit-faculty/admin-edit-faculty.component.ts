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

  formError: boolean = false;

  imgExt: string[] = ['jpg', 'png'];

  image: string;
  
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
      }),
      image: new FormControl(null, {
        validators:[this.formValidator.imageValidate.bind(this)]
      })
    });

    this.route.params
    .subscribe(
      (params: Params) => {
        const _id = params['id'];
        const data = { api : "getFaculty", data : { _id }}
        this.httpPostService.httpPost(data).subscribe((val) => {
          this.faculty = val;
          this.image = this.faculty.image;

          this.form.setValue({
            name: this.faculty.name,
            birthDate: this.faculty.birthDate,
            email: this.faculty.email,
            phone: this.faculty.phone,
            description: this.faculty.description,
            image: null
          });

          this.loading = false;
        },
        (error) => {
        });
      }
    ); 
  }

  onImagePicked(event: any) {
    const file: File = event.target.files[0];
    if (file) {

      const ext : string = file.name.substring(file.name.lastIndexOf('.') + 1);
      if(!(this.imgExt.indexOf(ext)!=-1)) {
        return;
      }

      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.image = event.target.result; 
      }

      reader.readAsDataURL(file);
    }
  }
  
  editFaculty() {
    if(this.form.invalid) {
      this.formError = true;
    }
  
    if(this.form.valid) {
      this.formError = false;
      this.loading = true;
      const faculty: Faculty = {
        _id: this.faculty._id, 
        name: this.form.value.name, 
        birthDate: this.form.value.birthDate, 
        description: this.form.value.description, 
        image: this.image,
        email: this.form.value.email, 
        phone: this.form.value.phone, 
        status: this.faculty.status
      }

      this.loading = true;
      
      const data = { api : "editFaculty", data : faculty }
      this.httpPostService.httpPostAuth(data).subscribe((val) => {
        this.form.reset();
        this.cancel();
      },
      (error) => {
        this.loading = false;
      });
    }
  }
  
  cancel() {
    this.loading = true;
    this.router.navigate(['/admin', 'faculty', this.faculty._id], {relativeTo:this.route, skipLocationChange:true});
  }
}