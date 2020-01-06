import { Component, OnInit } from '@angular/core';
import { ReceiptModel } from '../../../models/receipt.model';
import { ReceiptService } from '../../../services/receipt.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-student-show-receipt',
  templateUrl: './student-show-receipt.component.html',
  styleUrls: ['./student-show-receipt.component.css']
})
export class StudentShowReceiptComponent implements OnInit {
  receipt: ReceiptModel;
  receiptMetaData: any;

  loading: boolean;
  error: string;

  constructor(
    private receiptService: ReceiptService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      const id = params['id'];
      this.receiptService.getReceipt(id).subscribe(
        (responce: any) => {
          this.receipt = responce.receipt;
          this.receiptMetaData = responce.receiptMetaData;
          this.loading = false;
        },
        (error: any) => {
          this.setError(error);
        }
      );
    });
  }

  setError(err: string) {
    this.error = err;
    this.loading = false;
  }

  clearError() {
    this.error = null;
  }

  print() {
    window.print();
  }
}
