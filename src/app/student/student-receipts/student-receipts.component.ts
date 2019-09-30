import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpService } from '../../services/httpPost.service';
import { ReceiptModule } from '../../models/receipt.model';

@Component({
  selector: 'app-student-receipts',
  templateUrl: './student-receipts.component.html',
  styleUrls: ['./student-receipts.component.css']
})
export class StudentReceiptsComponent implements OnInit {

  receipts: ReceiptModule[] = [];

  loading: boolean = true;

  studentId : string;

  constructor(private httpPostService: HttpService,
              private route: ActivatedRoute,
              private router: Router) { }
                         
  ngOnInit() {
    this.route.queryParams.
    subscribe(
      (params: Params) => {
        this.studentId = params['id'];
        const data = { api : "getReceipts", data : { student : this.studentId }}
        this.httpPostService.httpPostAuth(data).subscribe((val) => {
         this.receipts = val;
         this.loading = false;
        },
        (error) => {
        });
      }
    );
  }
}