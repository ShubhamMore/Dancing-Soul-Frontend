import { Component, OnInit } from '@angular/core';
import { BranchModel, BatchModel } from '../../../models/branch.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { BranchService } from '../../../services/branch.service';

@Component({
  selector: 'app-admin-add-student',
  templateUrl: './admin-add-student.component.html',
  styleUrls: ['./admin-add-student.component.css']
})
export class AdminAddStudentComponent implements OnInit {

  form: FormGroup;
  formError: boolean = false;

  loading: boolean = true;
  error : string = null;

  imagePreview: string = null;
  uploadImage: File = null;

  invalidImage: boolean = false;

  branches: BranchModel[] = [];

  batches: BatchModel[] = [];

  weekType: string = "0";

  constructor(private studentService: StudentService,
              private branchService: BranchService,
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
      batch: new FormControl("", {
        validators: [Validators.required]
      }),
      batchType: new FormControl(this.weekType, {
        validators: [Validators.required]
      })
    });

    this.branchService.getBranches()
    .subscribe((responce: BranchModel[]) => {
      this.branches = responce;
      this.loading = false;
    },
    (error: any) => {
      this.setError(error);
    });
  }

  branchChanged() {
    this.batches = [];
    const branch = this.branches.find((branch) => branch._id === this.form.value.branch);
    if(branch !== undefined) {
      const len = branch.batch.length;
      for(let i = 0; i < len; i++) {
        if(branch.batch[i].batchType === this.weekType) {
          this.batches.push(branch.batch[i]);
        }
      }  
    }
  }

  changeWeekType() {
    this.weekType = this.form.value.batchType;
    this.branchChanged();
  }

  onImagePicked(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    const imgExt: string[] = ["jpg", "png"];
    let ext: string = null;
    for(let i: number = 0; i < files.length; i++) {
      ext = files[i].name.substring(files[i].name.lastIndexOf('.') + 1);
      if(!(imgExt.indexOf(ext)!=-1)) {
        return this.invalidImage = true;
      }
    }
    this.invalidImage = false;
    for(let i: number = 0; i < files.length; i++) {
      this.uploadImage = files[i];
      const reader: any = new FileReader();
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
  
    if (this.form.valid) {
      this.formError = false;
      this.loading = true;

      const student: FormData = new FormData();
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
      student.append("batchType", this.form.value.batchType);
      student.append("status", "1");

      if(this.uploadImage) {
        student.append("image", this.uploadImage, "student");
      }

      this.studentService.addStudent(student)
      .subscribe((responce: any) => {
        this.cancel();
      },
      (error: any) => {
        this.setError(error);
      });
    }
  }

  cancel() {
    this.loading = true;
    this.router.navigate(['/admin', 'student'], {relativeTo: this.route, skipLocationChange: true})
  }

  setError(err: string) {
		this.error = err;
		this.loading = false;
	}

	clearError() {
		this.error = null;
	}
}
