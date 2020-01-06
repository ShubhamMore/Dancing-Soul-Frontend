import { Component, OnInit } from '@angular/core';
import { BranchModel } from '../../models/branch.model';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchService } from '../../services/branch.service';

@Component({
  selector: 'app-admin-branch',
  templateUrl: './admin-branch.component.html',
  styleUrls: ['./admin-branch.component.css']
})
export class AdminBranchComponent implements OnInit {
  branches: BranchModel[];

  loading: boolean;
  error: string;

  constructor(
    private branchService: BranchService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.branches = [];
    this.branchService.getBranches().subscribe(
      (responce: BranchModel[]) => {
        this.branches = responce;
        this.loading = false;
      },
      (error: any) => {
        this.setError(error);
      }
    );
  }

  onNewBranch() {
    this.loading = true;
    this.router.navigate(['new'], { relativeTo: this.route, skipLocationChange: true });
  }

  setError(err: string) {
    this.error = err;
    this.loading = false;
  }

  clearError() {
    this.error = null;
  }
}
