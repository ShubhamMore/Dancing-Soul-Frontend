import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormValidator } from '../../../validators/form.validator';
import { HttpService } from '../../../services/httpPost.service';

@Component({
  selector: 'app-admin-add-faculty',
  templateUrl: './admin-add-faculty.component.html',
  styleUrls: ['./admin-add-faculty.component.css']
})
export class AdminAddFacultyComponent implements OnInit {

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

    this.image = "https://img.icons8.com/color/1600/circled-user-male-skin-type-1-2.png";

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

    this.loading = false;

  }

  addFaculty() {
    if(this.form.invalid) {
      this.formError = true;
    }

    if(this.form.valid) {
      this.formError = false;
      this.loading = true;
      
      const faculty = {
        name : this.form.value.name, 
        birthDate : this.form.value.birthDate, 
        description : this.form.value.description, 
        image : this.image,
        email: this.form.value.email, 
        phone : this.form.value.phone, 
        status : "activated"
      }

      const user = {
        email : faculty.email,
        password : faculty.phone,
        userType : "faculty"
      }
      
      const data = { api : "addFaculty", data : {faculty, user} }
      this.httpPostService.httpPostAuth(data).subscribe((val) => {
        this.form.reset();
        this.cancel();
      },(error) => {
        this.loading = false;
      });
    }
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
  
  cancel() {
    this.loading = true;
    this.router.navigate(['/admin', 'faculty'], {relativeTo:this.route, skipLocationChange:true});
  }

}