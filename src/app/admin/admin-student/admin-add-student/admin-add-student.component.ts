import { Component, OnInit } from '@angular/core';
import { Branch, BatchModel } from '../../../models/branch.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormValidator } from '../../../validators/form.validator';
import { HttpService } from '../../../services/httpPost.service';

@Component({
  selector: 'app-admin-add-student',
  templateUrl: './admin-add-student.component.html',
  styleUrls: ['./admin-add-student.component.css']
})
export class AdminAddStudentComponent implements OnInit {

  form: FormGroup;

  formError: boolean = false;

  loading : boolean = true;

  image: string;

  imgExt: string[] = ['jpg', 'png'];

  branches: Branch[] = [];

  batches: BatchModel[] = [];

  weekType: string = "0";

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
      firstGuardianName: new FormControl(null, {
        validators: [Validators.required]
      }),
      firstGuardianRelation: new FormControl(null, {
        validators: [Validators.required]
      }),
      secondGuardianName: new FormControl("", {}),
      secondGuardianRelation: new FormControl("", {}),
      workPlace: new FormControl("", {}),
      bloodGroup: new FormControl("", {}),
      medicalHistory: new FormControl(null, {
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      phone: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
      }),
      address: new FormControl(null, {
        validators: [Validators.required]
      }),
      branch: new FormControl("", {
        validators: [Validators.required]
      }),
      batch: new FormControl(this.weekType, {
        validators: [Validators.required]
      }),
      batchName: new FormControl("", {
        validators: [Validators.required]
      }),
      image: new FormControl(null, {
        validators:[this.formValidator.imageValidate.bind(this)]
      })
    });

    const data = { api : "getBranches", data : { }}
    this.httpPostService.httpPost(data).subscribe((val) => {
      this.branches = val;
      this.loading = false;
    },
    (error) => {
    });

  }

  branchChanged() {
    this.batches = [];
    const branch = this.branches.find((branch) => branch._id === this.form.value.branch);
    if(branch !== undefined) {
      const len = branch.batch.length;
      for(let i = 0; i < len; i++) {
        if(branch.batch[i].batchType === this.weekType) {
          this.batches.push(branch.batch[i])
        }
      }
    }
  }

  changeWeekType() {
    this.weekType = this.form.value.batch;
    this.branchChanged();
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

  addStudent() {
    if(this.form.invalid) {
      this.formError = true;
    }
  
    if(this.form.valid) {
      this.formError = false;
      this.loading = true;

      const student = {
        name: this.form.value.name, 
        birthDate: this.form.value.birthDate, 
        bloodGroup: this.form.value.bloodGroup, 
        workPlace: this.form.value.workPlace, 
        image: this.image, 
        firstGuardianName: this.form.value.firstGuardianName, 
        firstGuardianRelation: this.form.value.firstGuardianRelation, 
        secondGuardianName: this.form.value.secondGuardianName, 
        secondGuardianRelation: this.form.value.secondGuardianRelation, 
        medicalHistory: this.form.value.medicalHistory, 
        phone: this.form.value.phone, 
        email: this.form.value.email, 
        address: this.form.value.address, 
        branch: this.form.value.branch, 
        batch: this.form.value.batch, 
        batchName: this.form.value.batchName, 
        status: "1"
      }

      const user = {
        email : student.email,
        password : student.phone,
        userType : "student"
      }

      const data = { api : "addStudent", data : {student, user} }
      this.httpPostService.httpPostAuth(data).subscribe((val) => {
       this.cancel();
      },
      (error) => {
       this.loading = false;
      });
    }
  }

  cancel() {
    this.loading = true;
    this.router.navigate(['/admin', 'student'],{relativeTo:this.route, skipLocationChange:true})
  }
}