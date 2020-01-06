import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ReceiptService } from '../../services/receipt.service';
import { ReceiptModel } from '../../models/receipt.model';

@Component({
  selector: 'app-student-receipts',
  templateUrl: './student-receipts.component.html',
  styleUrls: ['./student-receipts.component.css']
})
export class StudentReceiptsComponent implements OnInit {
  receipts: ReceiptModel[];

  loading: boolean;
  error: string;
  id: string;

  constructor(
    private receiptService: ReceiptService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.receipts = [];
    this.route.queryParams.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      this.id = params['id'];
      this.receiptService.getReceipts(this.id).subscribe(
        (responce: ReceiptModel[]) => {
          this.receipts = responce;
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
}
