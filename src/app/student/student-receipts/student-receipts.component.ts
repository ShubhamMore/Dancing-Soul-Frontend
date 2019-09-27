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
        const _id = params["id"];
        console.log(_id)
        this.loading = false;
      }
    );
  }
}
