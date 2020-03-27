import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ReceiptModel } from '../../../models/receipt.model';
import { ReceiptService } from '../../../services/receipt.service';

@Component({
  selector: 'app-admin-student-receipts',
  templateUrl: './admin-student-receipts.component.html',
  styleUrls: ['./admin-student-receipts.component.css']
})
export class AdminStudentReceiptsComponent implements OnInit {
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
    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      this.id = params['id'];
      this.receiptService.getReceipts(this.id).subscribe(
        (responce: ReceiptModel[]) => {
          this.receipts = responce;
          console.log(responce);
          this.loading = false;
        },
        (error: any) => {
          this.setError(error);
        }
      );
    });
  }

  delete(id: string) {
    const dltConfirm = confirm('do you really want to delete??');
    if (dltConfirm) {
      this.loading = true;
      this.receiptService.deleteReceipt(id).subscribe(
        (responce: any) => {
          this.ngOnInit();
        },
        (error: any) => {
          this.setError(error);
        }
      );
    }
  }

  cancel() {
    this.loading = true;
    this.router.navigate(['/admin', 'student'], {
      relativeTo: this.route,
      skipLocationChange: true
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
