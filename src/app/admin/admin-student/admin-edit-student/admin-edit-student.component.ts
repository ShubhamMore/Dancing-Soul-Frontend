import { Component, OnInit } from '@angular/core';
import { Branch, BatchModel } from '../../../models/branch.model';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { StudentModel } from '../../../models/student.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormValidator } from '../../../validators/form.validator';
import { HttpService } from '../../../services/httpPost.service';

@Component({
  selector: 'app-admin-edit-student',
  templateUrl: './admin-edit-student.component.html',
  styleUrls: ['./admin-edit-student.component.css']
})

export class AdminEditStudentComponent implements OnInit {

  form: FormGroup;

  loading : boolean = true;

  formError: boolean = false;

  imagePreview: string = null;
  uploadImage: File = null;

  invalidImage : boolean = false;

  branches: Branch[] = [];

  student: StudentModel;

  imgExt: string[] = ['jpg', 'png'];

  branch: Branch;

  batches: BatchModel[] = [];

  weekType: string = "0";

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
      firstGuardianName: new FormControl(null, {
        validators: [Validators.required]
      }),
      firstGuardianRelation: new FormControl(null, {
        validators: [Validators.required]
      }),
      secondGuardianName: new FormControl(null, {}),
      secondGuardianRelation: new FormControl(null, {}),
      workPlace: new FormControl(null, {}),
      bloodGroup: new FormControl(null, {}),
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
      branch: new FormControl(null, {
        validators: [Validators.required]
      }),
      batch: new FormControl(null, {
        validators: [Validators.required]
      }),
      batchName: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null, {
        validators:[this.formValidator.imageValidate.bind(this)]
      })
    });
    
    this.route.params
    .subscribe(
      (params:Params) => {
        const _id = params['id'];

        const data = { api : "getBranches", data : { }}
        this.httpPostService.httpPostAuth(data).subscribe((val) => {
          this.branches = val;
          const data = { api : "getStudent", data : { _id }}
          this.httpPostService.httpPostAuth(data).subscribe((val) => {
            this.student = val;
            this.branch = this.branches.find((branch) => branch._id === this.student.branch);
            // this.image = this.student.image;
            this.form.patchValue({
              name : this.student.name,
              birthDate : this.student.birthDate,
              firstGuardianName : this.student.firstGuardianName,
              firstGuardianRelation : this.student.firstGuardianRelation,
              secondGuardianName : this.student.secondGuardianName,
              secondGuardianRelation : this.student.secondGuardianRelation,
              workplace : this.student.workPlace,
              bloodGroup : this.student.bloodGroup,
              medicalHistory : this.student.medicalHistory,
              email : this.student.email,
              phone : this.student.phone,
              address : this.student.address,
              branch : this.student.branch,
              batch : this.student.batch,
              batchName : this.student.batchName,
              image : null
            });
            this.branchChanged();
            this.loading = false;
          },
          (error) => {          
          });
        },
        (error) => {
        });
      }
    );
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

  editStudent() {
    if(this.form.invalid) {
      this.formError = true;
    }
  
    if(this.form.valid) {
      this.formError = false;
      this.loading = true;
      
      const student = new FormData();
      student.append("_id", this.student._id);
      student.append("name", this.form.value.name);
      student.append("birthDate", this.form.value.birthDate);
      student.append("bloodGroup", this.form.value.bloodGroup);
      student.append("workPlace", this.form.value.workPlace);
      student.append("firstGuardianName", this.form.value.firstGuardianName);
      student.append("firstGuardianRelation", this.form.value.firstGuardianRelation);
      student.append("secondGuardianName", this.form.value.secondGuardianName);
      student.append("secondGuardianRelation", this.form.value.secondGuardianRelation);
      student.append("medicalHistory", this.form.value.medicalHistory);
      student.append("phone", this.form.value.phone);
      student.append("email", this.form.value.email);
      student.append("address", this.form.value.address);
      student.append("branch", this.form.value.branch);
      student.append("batch", this.form.value.batch);
      student.append("batchName", this.form.value.batchName);
      student.append("status", "1");

      if(this.uploadImage) {
        student.append("image", this.uploadImage, "student");
      }
      
      const data = { api : "editStudent", data : student }
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
    this.router.navigate(['/admin', 'student', this.student._id],{relativeTo:this.route, skipLocationChange:true});
  }
}