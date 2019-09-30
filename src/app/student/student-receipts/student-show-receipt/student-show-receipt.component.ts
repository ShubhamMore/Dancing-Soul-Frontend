import { Component, OnInit } from '@angular/core';
import { ReceiptModule } from '../../../models/receipt.model';
import { HttpService } from '../../../services/httpPost.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Branch, BatchModel } from '../../../models/branch.model';
import { StudentModel } from '../../../models/student.model';

@Component({
  selector: 'app-student-show-receipt',
  templateUrl: './student-show-receipt.component.html',
  styleUrls: ['./student-show-receipt.component.css']
})
export class StudentShowReceiptComponent implements OnInit {

  receipt : ReceiptModule;
  branch : Branch;
  student: StudentModel;
  batch : BatchModel;

  loading : boolean = true;
  error : string = null;

  constructor(private httpPostService: HttpService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.
    subscribe(
      (params: Params) => {
        const _id = params['id'];
        const data = { api : "getReceipt", data : { _id }}
        this.httpPostService.httpPostAuth(data).subscribe((val) => {
          this.receipt = val;
          const data = { api : "getStudent", data : { _id : this.receipt.student }}
          this.httpPostService.httpPostAuth(data).subscribe((val) => {
            this.student = val;
            const data = { api : "getBranch", data : { _id : this.student.branch }}
            this.httpPostService.httpPostAuth(data).subscribe((val) => {
              this.branch = val;
              this.batch = this.branch.batch.find(batch => (batch._id === this.student.batchName && batch.batchType === this.student.batch));
              this.loading = false;
            },
            (error) => {
              this.setError(error);
            });
          },
          (error) => {
            this.setError(error);            
          });
        },
        (error) => {
          this.setError(error);          
        });
      }
    );
  }

  setError(err : string) {
		this.error = err;
		this.loading = false;
	}

	clearErr() {
		this.error = null;
	}

  print() {
    window.print();
  }

}
