import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ReceiptModule } from '../../../models/receipt.model';
import { HttpService } from '../../../services/httpPost.service';

@Component({
  selector: 'app-admin-student-receipts',
  templateUrl: './admin-student-receipts.component.html',
  styleUrls: ['./admin-student-receipts.component.css']
})
export class AdminStudentReceiptsComponent implements OnInit {

  receipts: ReceiptModule[] = [];

  loading: boolean = true;

  studentId : string;

  constructor(private httpPostService: HttpService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.
    subscribe(
      (params: Params) => {
        this.studentId = params['id'];
        const data = { api : "getReceipts", data : { student : this.studentId }}
        this.httpPostService.httpPost(data).subscribe((val) => {
         this.receipts = val;
         this.loading = false;
        },
        (error) => {
        });
      }
    );
  }

  delete(_id: string) {
    const dltConfirm = confirm("do you really want to delete??");
    if(dltConfirm) {
      this.loading = true;
      const data = { api : "deleteReceipt", data : { _id }}
      this.httpPostService.httpPostAuth(data).subscribe((val) => {
        this.ngOnInit();
        // const data = { api : "getReceipts", data : { student : this.studentId }}
        // this.httpPostService.httpPost(data).subscribe((val) => {
        //   this.receipts = val;
        //   this.loading = false;
      //   },
      //   (error) => {              
      //   });
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
}