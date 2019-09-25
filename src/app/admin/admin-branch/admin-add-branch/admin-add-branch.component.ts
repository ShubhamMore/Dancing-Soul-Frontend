import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { FormValidator } from '../../../validators/form.validator';
import { HttpService } from '../../../services/httpPost.service';

@Component({
  selector: 'app-admin-add-branch',
  templateUrl: './admin-add-branch.component.html',
  styleUrls: ['./admin-add-branch.component.css']
})
export class AdminAddBranchComponent implements OnInit {

  form: FormGroup;
  batchForm: FormGroup;

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

    this.images = "https://img.icons8.com/color/1600/circled-user-male-skin-type-1-2.png";

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
      descripton: new FormControl(null, {
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

    this.loading = false;

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

  onImagePicked(event: any) {
    const file: File = event.target.files[0];
    if (file) {

      const ext : string = file.name.substring(file.name.lastIndexOf('.') + 1);
      if(!(this.imgExt.indexOf(ext)!=-1)) {
        return;
      }
      
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let reader = new FileReader();

        reader.onload = (event:any) => {
          this.images = event.target.result; 
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
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

  addAddress() {
    
    if(this.form.invalid) {
      return this.formError = "*Please Fill All Fields of Branch";
    }

    if (this.batches.length === 0) {
      return this.formError = "*Please Add Batches";
    }

    if(this.form.valid) {
      this.loading = true;
      this.formError = null;
      
      const branch = {
        city: this.form.value.city, 
        branch: this.form.value.branch, 
        address: this.form.value.address, 
        email: this.form.value.email, 
        phone: this.form.value.phone, 
        description: this.form.value.descripton, 
        images: this.images,
        batch: this.batches,
        status: "activated"
      }

      const data = { api : "addBranch", data : branch}
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
    this.router.navigate(["/admin", "branch"], {relativeTo: this.route, skipLocationChange:true});    
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

}