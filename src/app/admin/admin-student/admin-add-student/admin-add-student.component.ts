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

  imagePreview: string = null;
  uploadImage: File = null;

  invalidImage : boolean = false;

  imgExt: string[] = ['jpg', 'png'];

  branches: Branch[] = [];

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
      })
    });

    const data = { api : "getBranches", data : { }}
    this.httpPostService.httpPostAuth(data).subscribe((val) => {
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

  addStudent() {
    if(this.form.invalid) {
      this.formError = true;
    }
  
    if(this.form.valid) {
      this.formError = false;
      this.loading = true;

      const student = new FormData();
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

      const data = { api : "addStudent", data : student }
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