import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BranchModel, BatchModel } from '../../../models/branch.model';
import { BranchService } from '../../../services/branch.service';
import { ImageModel } from '../../../models/image.model';

@Component({
  selector: 'app-admin-show-branch',
  templateUrl: './admin-show-branch.component.html',
  styleUrls: ['./admin-show-branch.component.css']
})
export class AdminShowBranchComponent implements OnInit {
  branch: BranchModel;
  images: ImageModel[];
  batches: BatchModel[];
  loading: boolean;
  id: string;
  error: string;
  week: string[];
  days: boolean[];

  constructor(
    private branchService: BranchService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.images = [];
    this.batches = [];
    this.error = null;
    this.week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.days = [true, false, false, false, false, false, false];

    this.clear();
    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      this.id = params['id'];

      this.branchService.getBranch(this.id).subscribe(
        (responce: BranchModel) => {
          this.branch = responce;
          this.batches = this.branch.batch;
          this.images = this.branch.images;
          this.loading = false;
        },
        (error: any) => {
          this.setError(error);
        }
      );
    });
  }

  changeStatus(id: string, status: string) {
    let statusConfirm: any = true;
    if (status === '0') {
      statusConfirm = confirm('do you really want to Deactivate Branch??');
    } else if (status === '1') {
      statusConfirm = confirm('do you want to Activate this Branch again??');
    }
    if (statusConfirm) {
      this.loading = true;

      this.branchService.changeBranchStatus(id, status).subscribe(
        (responce: any) => {
          this.cancel();
        },
        (error: any) => {
          this.setError(error);
        }
      );
    }
  }

  editBranch() {
    this.loading = true;
    this.router.navigate(['edit'], { relativeTo: this.route, skipLocationChange: true });
  }

  deleteImage(publicId: string) {
    this.loading = true;
    this.loading = true;
    this.branchService.deleteImage(this.id, publicId).subscribe(
      (responce: any) => {
        this.ngOnInit();
      },
      (error: any) => {
        this.setError(error);
      }
    );
  }

  clear() {
    this.branch = null;
    this.error = null;
    this.images = [];
    this.batches = [];
    this.id = null;
  }

  cancel() {
    this.loading = true;
    this.clear();
    this.router.navigate(['/admin', 'branch'], {
      relativeTo: this.route,
      skipLocationChange: true
    });
  }

  isWeekDays(): boolean {
    const n = this.batches.length;
    for (let i = 0; i < n; i++) {
      if (this.batches[i].batchType === '0') {
        return true;
      }
    }
    return false;
  }

  isWeekEnds(): boolean {
    const n = this.batches.length;
    for (let i = 0; i < n; i++) {
      if (this.batches[i].batchType === '1') {
        return true;
      }
    }
    return false;
  }

  deleteBranch(id: string) {
    const password = prompt('Please enter your Password');
    if (password) {
      this.loading = true;

      this.branchService.deleteBranch(id, password).subscribe(
        (responce: any) => {
          this.cancel();
        },
        (error: any) => {
          this.setError(error);
        }
      );
    }
  }

  setError(err: string) {
    this.error = err;
    this.loading = false;
  }

  clearError() {
    this.error = null;
  }
}
