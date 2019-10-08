import { Component, OnInit } from '@angular/core';
import { BranchModel, BatchModel } from '../../../models/branch.model';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { StudentModel } from '../../../models/student.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormValidator } from '../../../validators/form.validator';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-admin-edit-student',
  templateUrl: './admin-edit-student.component.html',
  styleUrls: ['./admin-edit-student.component.css']
})

export class AdminEditStudentComponent implements OnInit {

  form: FormGroup;
  formError: boolean = false;

  loading : boolean = true;
  error : string = null;

  imagePreview: string = null;
  uploadImage: File = null;

  invalidImage : boolean = false;

  branches: BranchModel[] = [];
  branch: BranchModel;
  batches: BatchModel[] = [];

  student: StudentModel;

  imgExt: string[] = ['jpg', 'png'];

  weekType: string = "0";

  constructor(private studentService: StudentService,
              private formValidator: FormValidator,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params
    .subscribe(
      (params: Params) => {
        const _id = params['id'];
        
        this.studentService.getStudentForEditing(_id)
        .subscribe((responce: any) => {
          this.student = responce.student;
          this.branches = responce.branch;
          this.branch = this.branches.find((branch) => branch._id === this.student.branch);

          this.form = new FormGroup({
            name: new FormControl(this.student.name, {
              validators: [Validators.required]
            }),
            birthDate: new FormControl(this.student.birthDate, {
              validators: [Validators.required]
            }),
            firstGuardianName: new FormControl(this.student.firstGuardianName, {
              validators: [Validators.required]
            }),
            firstGuardianRelation: new FormControl(this.student.firstGuardianRelation, {
              validators: [Validators.required]
            }),
            secondGuardianName: new FormControl(this.student.secondGuardianName, {}),
            secondGuardianRelation: new FormControl(this.student.secondGuardianRelation, {}),
            workPlace: new FormControl(this.student.workPlace, {}),
            bloodGroup: new FormControl(this.student.bloodGroup, {}),
            medicalHistory: new FormControl(this.student.medicalHistory, {
              validators: [Validators.required]
            }),
            email: new FormControl(this.student.email, {
              validators: [Validators.required, Validators.email]
            }),
            phone: new FormControl(this.student.phone, {
              validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
            }),
            address: new FormControl(this.student.address, {
              validators: [Validators.required]
            }),
            branch: new FormControl(this.student.branch, {
              validators: [Validators.required]
            }),
            batch: new FormControl('', {
              validators: [Validators.required]
            }),
            batchType: new FormControl(this.student.batchType, {
              validators: [Validators.required]
            }),
            image: new FormControl(null, {
              validators: [this.formValidator.imageValidate.bind(this)]
            })
          });
      
          this.branchChanged();
          this.changeWeekType();
          
          this.form.patchValue({batch: this.student.batch})

          this.loading = false;
        },
        (error: any) => { 
          this.setError(error);       
        });
        
      }
    );
  }

  branchChanged() {
    this.batches = [];
    const branch = this.branches.find((branch) => branch._id === this.form.value.branch);
    if(branch !== undefined) {
      const len: number = branch.batch.length;
      for(let i: number = 0; i < len; i++) {
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
    for (let i: number = 0; i < files.length; i++) {
      ext = files[i].name.substring(files[i].name.lastIndexOf('.') + 1);
      if (!(imgExt.indexOf(ext) != -1)) {
        return this.invalidImage = true;
      }
    }
    this.invalidImage = false;
    for (let i: number = 0; i < files.length; i++) {
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
    if (this.form.invalid) {
      this.formError = true;
      return;
    }
  
    else {
      this.formError = false;
      this.loading = true;
      
      const student: FormData = new FormData();
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
      student.append("batchType", this.form.value.batchType);
      student.append("status", this.student.status);

      if(this.uploadImage) {
        student.append("image", this.uploadImage, "student");
      }
      
      this.studentService.editStudent(student)
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
    this.router.navigate(['/admin', 'student', this.student._id], {relativeTo:this.route, skipLocationChange: true});
  }

  setError(err : string) {
		this.error = err;
		this.loading = false;
	}

	clearError() {
		this.error = null;
	}
}
