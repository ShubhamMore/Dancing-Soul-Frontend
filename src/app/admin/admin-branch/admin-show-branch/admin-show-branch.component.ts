import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Branch, BatchModel } from '../../../models/branch.model';
import { HttpService } from '../../../services/httpPost.service';
import { ImageModel } from '../../../models/image.model';

@Component({
  selector: 'app-admin-show-branch',
  templateUrl: './admin-show-branch.component.html',
  styleUrls: ['./admin-show-branch.component.css']
})
export class AdminShowBranchComponent implements OnInit {
  
  branch: Branch;

  images : ImageModel[] = [];

  batches : BatchModel[] = [];

  loading : boolean = true;

  _id : string;

  error : string = null;

  week: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  days: boolean[] = [true, false, false, false, false, false, false];

  constructor(private httpPostService: HttpService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.clear();
    this.route.params
    .subscribe(
      (params:Params) => {
        this._id = params['id'];
        const data = { api : "getBranch", data : { _id: this._id }}
        this.httpPostService.httpPostAuth(data).subscribe((val) => {
          this.branch = val;
          this.batches = this.branch.batch;
          this.images = this.branch.images;
          this.loading = false;
        },
        (error) => {
          this.setError(error)    
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
        this.setError(error)            
      });
    }
  }
  
  editBranch() {
    this.loading = true;
    this.router.navigate(['edit'], {relativeTo: this.route, skipLocationChange:true});
  }

  deleteImage(public_id: string) {
    this.loading = true;
    this.loading = true;
    const data = { api : "deleteBranchImage", data : {_id: this._id, public_id}}
    this.httpPostService.httpPostAuth(data)
    .subscribe(res => {
      this.ngOnInit();
    },
    (error) => {
      this.setError(error)          
    });
  }

  clear() {
    this.branch = null;
    this.error = null;
    this.images = [];
    this.batches = [];
    this._id = null;
  }
  
  cancel() {
    this.loading = true;
    this.clear();
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

  deleteBranch(_id : string) {
    const password = prompt("Please enter your Password");
    if(password) {
      this.loading = true;
      const data = { api : "deleteBranch", data : { _id, password }}
      this.httpPostService.httpPostAuth(data).subscribe((val) => {
        this.cancel();
      },
      (error) => {
        this.setError(error)    
      });
    }
  }

  alertDismiss() {
    this.error = null;
  }

	setError(err : string) {
		this.error = err;
		this.loading = false;
	}

	clearErr() {
		this.error = null;
	}
}