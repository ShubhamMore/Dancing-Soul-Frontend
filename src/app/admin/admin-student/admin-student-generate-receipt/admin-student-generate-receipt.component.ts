import { Component, OnInit } from '@angular/core';
import { StudentModel } from '../../../models/student.model';
import { Branch, BatchModel } from '../../../models/branch.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormValidator } from '../../../validators/form.validator';
import { HttpService } from '../../../services/httpPost.service';

@Component({
  selector: 'app-admin-student-generate-receipt',
  templateUrl: './admin-student-generate-receipt.component.html',
  styleUrls: ['./admin-student-generate-receipt.component.css']
})
export class AdminStudentGenerateReceiptComponent implements OnInit {

  form: FormGroup;

  loading: boolean = true;

  student: StudentModel;

  branch : Branch;

  batch: BatchModel;

  amount : number = 0;

  month : string [] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  months: number[] = [];

  monthsTouched: boolean = false;

  formError: string = null;

  constructor(private httpPostService: HttpService,
              private formValidator: FormValidator,

              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    
    this.form = new FormGroup({
      payment_mode: new FormControl("", {
        validators:[Validators.required]
      }),
      months: new FormArray(
        this.month.map( () => new FormControl(null)), {
          validators:[this.formValidator.monthsValidator.bind(this)]
        }
      )
    });
    
    this.route.params.
    subscribe(
      (params: Params) => {
        const _id = params['id'];
        const studentData = { api : "getStudent", data : { _id }}
        this.httpPostService.httpPostAuth(studentData).subscribe((val) => {
         this.student = val;
         const branchData = { api : "getBranch", data : { _id : this.student.branch }}
         this.httpPostService.httpPostAuth(branchData).subscribe((val) => {
           this.branch = val; 
           this.batch = this.branch.batch.find(batch => ((batch._id === this.student.batchName) && (batch.batchType === this.student.batch)));
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

  date(): string {
    const today = new Date();
    const date : string =  this.dateMonthCreator(today.getDate()) + '-' + this.dateMonthCreator(today.getMonth() + 1) + '-' + today.getFullYear().toString();
    return date;
  }

  dateMonthCreator(dm: number) : string {
    if(dm < 10) {
      return '0' + dm.toString();
    }
    return dm.toString();
  }

  payFees() {
    if(this.form.invalid) {
      return this.formError = "*Please Fill All Fields of Receipt";
    }

    else {
      this.formError = null;
      this.loading = true;

      let months : string[] = [];
      const month: number[] = this.months.sort();
      for(let i = 0; i < month.length; i++) {
        months.push(this.month[month[i]]);
      }

      const receipt = {
        student : this.student._id,
        amount : this.amount.toString(),
        months : months.join(', '),
        receiptDate : this.date(),
        paymentMode : this.form.value.payment_mode
      }

      const data = { api : "addReceipt", data : receipt }
      this.httpPostService.httpPostAuth(data).subscribe((val) => {
        this.monthsTouched = false;
        this.amount = 0;
        this.form.reset({payment_mode: ""});
        this.cancel();
      },
      (error) => {
       this.loading = false;
      });
    }
  }

  cancel() {
    this.loading = true;
    this.router.navigate(['/admin', 'student'], {relativeTo: this.route, skipLocationChange:true});
  }
  
  addMonth(event: any, index:number) {
    this.monthsTouched = true;
    
    if(event.target.checked) {
      this.amount += parseInt(this.batch.fees);
      return this.months.push(index);
    }
    this.amount -= parseInt(this.batch.fees);
    this.months.splice(this.months.findIndex((month) => month === index), 1);
  }
}