import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Branch } from '../../../models/branch.model';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { FormValidator } from '../../../validators/form.validator';
import { HttpService } from '../../../services/httpPost.service';

@Component({
  selector: 'app-admin-edit-branch',
  templateUrl: './admin-edit-branch.component.html',
  styleUrls: ['./admin-edit-branch.component.css']
})
export class AdminEditBranchComponent implements OnInit {
  
  branchData: Branch;

  form: FormGroup;

  batchForm: FormGroup;

  imagePreview: string[] = [];
  uploadImages: File[] = [];

  invalidImage : boolean = false;

  loading : boolean = true;

  week : string [] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  weekDays: number[] = [];

  batches: any[] = [];

  weekdaysTouched: boolean = false;

  formError: string = null;

  weekType: string = "0";

  images: string;

  imgExt: string[] = ['jpg', 'png'];

  constructor(private httpPostService: HttpService,
              private formValidator: FormValidator,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.form = new FormGroup({
      city: new FormControl(null, {
        validators:[Validators.required]
      }),
      branch: new FormControl(null, {
        validators:[Validators.required]
      }),
      address: new FormControl(null, {
        validators:[Validators.required]
      }),
      email: new FormControl(null, {
        validators:[Validators.required, Validators.email]
      }),
      phone: new FormControl(null, {
        validators:[Validators.required]
      }),
      description: new FormControl(null, {
        validators:[Validators.required]
      }),
      image: new FormControl(null, {
        validators:[this.formValidator.imageValidate.bind(this)]
      })
    });
    
    this.batchForm = new FormGroup({
      week: new FormControl(this.weekType, {
        validators:[Validators.required]
      }),
      batchName: new FormControl(null, {
        validators:[Validators.required]
      }),
      fees: new FormControl(null, {
        validators:[Validators.required]
      }),
      start_timming: new FormControl(null, {
        validators:[Validators.required]
      }),
      end_timming: new FormControl(null, {
        validators:[Validators.required]
      }),
      weekDays: new FormArray(
        this.week.map( () => new FormControl(null)), {
          validators:[this.formValidator.daysValidator.bind(this)]
        }
      )
    });
      
    this.route.params
    .subscribe(
      (params:Params) => {
        const _id = params['id']; 
        const data = { api : "getBranch", data : { _id }}
        this.httpPostService.httpPostAuth(data).subscribe(
          (val) => {
            this.branchData = val;
            this.batches = this.branchData.batch;
            this.form.patchValue({
              city: this.branchData.city,
              branch : this.branchData.branch,
              address : this.branchData.address,
              email : this.branchData.email,
              phone : this.branchData.phone,
              description : this.branchData.description,
              image : null
            });
            this.loading = false;
          },
          (error) => {
          }
        );
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
      this.uploadImages.push(files[i]);
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview.push(<string>reader.result);
      };
      reader.readAsDataURL(files[i]);
    }
    this.form.patchValue({image: null});
  }

  cancelImage(index : number) {
    this.imagePreview.splice(index, 1);
    this.uploadImages.splice(index, 1);
  }

  addBatch() {
    if(this.batchForm.valid) {
      this.formError = null;

      let days : string[] = [];
      const week: number[] = this.weekDays.sort();
      for(let i = 0; i < week.length; i++) {
        days.push(this.week[week[i]]);
      }

      const batch = {
        batchType: this.weekType,
        days: days.join(', '),
        batchName: this.batchForm.value.batchName,
        time: this.batchForm.value.start_timming + ' - ' + this.batchForm.value.end_timming,
        fees: this.batchForm.value.fees
      }
      this.batches.push(batch);
      this.weekDays = [];
      this.batchForm.reset({week: this.weekType});
      this.weekdaysTouched = false;
    }
  }

  deleteBatch(i: number) {
    this.batches.splice(i, 1);
  }
  
  editAddress() {
    if(this.form.invalid) {
      return this.formError = "*Please Fill All Fields of Branch";
    }

    if (this.batches.length === 0) {
      return this.formError = "*Please Add Batches";
    }

    if(this.form.valid) {
      this.loading = true;
      this.formError = null;
  
      const  editedBranch = new FormData();
      editedBranch.append("_id", this.branchData._id);
      editedBranch.append("city", this.form.value.city);
      editedBranch.append("branch", this.form.value.branch);
      editedBranch.append("address", this.form.value.address);
      editedBranch.append("email", this.form.value.email);
      editedBranch.append("phone", this.form.value.phone);
      editedBranch.append("description", this.form.value.description);
      editedBranch.append("batch", JSON.stringify(this.batches));
      editedBranch.append("status", this.branchData.status);

      if(this.uploadImages.length > 0) {
        for(let i = 0; i < this.uploadImages.length; i++) {
          editedBranch.append("image", this.uploadImages[i], "branch"+i);
        }
      }
      
      const data = { api : "editBranch", data : editedBranch }
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
    this.imagePreview = [];
    this.uploadImages = [];
    this.invalidImage = false;
    this.router.navigate(["/admin", "branch", this.branchData._id], {relativeTo: this.route, skipLocationChange:true});
  }

  scheduleChange() {
    this.weekType = this.batchForm.value.week;
    console.log(this.weekType)
  }
  
  weekDay(event: any, index:number) {
    this.weekdaysTouched = true;
    
    if(event.target.checked) {
      return this.weekDays.push(index);
    }
    this.weekDays.splice(this.weekDays.findIndex((day) => day === index), 1);
  }

  isWeekType(weekType: string): boolean {
    const n = this.batches.length;
    for(let i = 0; i < n; i++) {
      if(this.batches[i].batchType === weekType) {
        return true;
      }
    }
    return false;
  }

}