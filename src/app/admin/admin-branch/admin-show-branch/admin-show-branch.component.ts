import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Branch, BatchModel } from '../../../models/branch.model';
import { HttpService } from '../../../services/httpPost.service';

@Component({
  selector: 'app-admin-show-branch',
  templateUrl: './admin-show-branch.component.html',
  styleUrls: ['./admin-show-branch.component.css']
})
export class AdminShowBranchComponent implements OnInit {
  
  branch: Branch;

  batches : BatchModel[] = [];

  loading : boolean = true;

  week: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  days: boolean[] = [true, false, false, false, false, false, false];

  constructor(private httpPostService: HttpService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params:Params) => {
        const _id = params['id'];
        const data = { api : "getBranch", data : { _id }}
        this.httpPostService.httpPost(data).subscribe((val) => {
          this.branch = val;
          this.batches = this.branch.batch;
          this.loading = false;
        },
        (error) => {
        });
      }
    );
  }

  changeStatus(_id:string, status: string) {
    let statusConfirm: any = true;
    if(status === "0") {
      statusConfirm = confirm("do you really want to Deactivate Branch??");
    }  
    else if(status === "1") {
      statusConfirm = confirm("do you want to Activate this Branch again??");
    }  
    if(statusConfirm) {
      this.loading = true;
      const data = { api : "changeBranchStatus", data : { _id, status }}
      this.httpPostService.httpPostAuth(data).subscribe((val) => {
       this.cancel();
      },
      (error) => {
      this.loading = false;     
      });
    }
  }
  
  editAddress() {
    this.loading = true;
    this.router.navigate(['edit'], {relativeTo: this.route, skipLocationChange:true});
  }
  
  cancel() {
    this.loading = true;
    this.router.navigate(['/admin', 'branch'], {relativeTo: this.route, skipLocationChange:true});
  }

  isWeekDays(): boolean {
    const n = this.batches.length;
    for(let i = 0; i < n; i++) {
      if(this.batches[i].batchType === '0') {
        return true;
      }
    }
    return false;
  }

  isWeekEnds(): boolean {
    const n = this.batches.length;
    for(let i = 0; i < n; i++) {
      if(this.batches[i].batchType === '1') {
        return true;
      }
    }
    return false;
  }
}