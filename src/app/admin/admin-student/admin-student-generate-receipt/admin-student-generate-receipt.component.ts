import { Component, OnInit } from '@angular/core';
import { StudentModel } from '../../../models/student.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormValidator } from '../../../validators/form.validator';
import { ReceiptService } from '../../../services/receipt.service';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-admin-student-generate-receipt',
  templateUrl: './admin-student-generate-receipt.component.html',
  styleUrls: ['./admin-student-generate-receipt.component.css']
})
export class AdminStudentGenerateReceiptComponent implements OnInit {

  form: FormGroup;
  monthsForm: FormGroup;
  formError: string = null;

  loading: boolean = true;
  error : string = null;

  feeType: string = '0';
  feeDescription: string = null;
  feeDescriptionError: boolean = false;
  amountError: boolean = false;

  student: StudentModel;
  studentMetaData: any;

  amount : number = 0;

  month : string [] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  months: number[] = [];
  monthsTouched: boolean = false;

  constructor(private receiptService: ReceiptService,
              private studentService: StudentService,
              private formValidator: FormValidator,

              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.form = new FormGroup({ 
      payment_mode: new FormControl("", {
        validators: [Validators.required]
      })
    })
    
    this.monthsForm = new FormGroup({
      months: new FormArray(
        this.month.map(() => new FormControl(null)), {
          validators: [this.formValidator.monthsValidator.bind(this)]
        }
      )
    });
    
    this.route.params.
    subscribe(
      (params: Params) => {
        const _id = params['id'];
        
        this.studentService.getStudentForReceipt(_id)
        .subscribe((responce: any) => {
          this.student = responce.student;
          this.studentMetaData = responce.studentMetaData;
          this.loading = false;
        },
        (error: any) => {
          this.setError(error);
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
    if (this.form.invalid) {
      return this.formError = "*Please Fill All Fields of Receipt";
    } else if (!this.feeDescription && (this.feeType == '1')) {
      return this.feeDescriptionError = true;
    } else if ((!this.amount || (this.amount < 1)) && (this.feeType == '1')) {
      return this.amountError = true;
    } else if(this.monthsForm.invalid && this.feeType == '0') {
      return this.formError = "*Please Fill All Fields of Receipt";
    } else {
      this.feeDescriptionError = this.amountError = this.monthsTouched = false;
      this.formError = null;
      this.loading = true;
      let feeDescription: string;
      if(this.feeType == '0') {
        let months: string[] = [];
        const month: number[] = this.months.sort();
        for(let i = 0; i < month.length; i++) {
          months.push(this.month[month[i]]);
        }
        feeDescription = months.join(', ') + ' Month/s';
      } else {
        feeDescription = this.feeDescription;
      }
      const receipt = {
        student: this.student._id,
        amount: this.amount.toString(),
        feeDescription: feeDescription,
        receiptDate: this.date(),
        paymentMode: this.form.value.payment_mode,
        feeType: this.feeType
      }

      this.receiptService.addReceipt(receipt)
      .subscribe((responce: any) => {
        this.amount = 0;
        this.form.reset({payment_mode: ""});
        this.cancel();
      },
      (error: any) => {
        this.setError(error);
      });
    }
  }

  cancel() {
    this.loading = true;
    this.router.navigate(['/admin', 'student'], {relativeTo: this.route, skipLocationChange: true});
  }

  addMonth(event: any, index: number) {
    this.monthsTouched = true;

    if(event.target.checked) {
      this.amount += parseInt(this.studentMetaData.batch.fees);
      return this.months.push(index);
    }
    this.amount -= parseInt(this.studentMetaData.batch.fees);
    this.months.splice(this.months.findIndex((month) => month === index), 1);
  }

  changeFeeType(event: any) {
    this.feeType = event.target.value;
    this.amount = 0;
    this.months = [];
    this.feeDescriptionError = false;
    if(this.feeType == '0') {
      this.ngOnInit();
    }
  }

  addCustomAmount(event: any) {
    this.amount = parseInt(event.target.value);
    if(!this.amount) {
      this.amountError = true;
      return;
    }
    this.amountError = false;
  }

  addfeeDescription(event: any) {
    this.feeDescription = event.target.value;
    if(!this.feeDescription) {
      this.feeDescriptionError = true;
      return;
    }
    this.feeDescriptionError = false;
  }

  setError(err: string) {
		this.error = err;
		this.loading = false;
	}

	clearError() {
		this.error = null;
	}
}
