import { Component, OnInit } from '@angular/core';
import { BranchService } from '../../services/branch.service';
import { BranchModel } from '../../models/branch.model';

@Component({
  selector: 'app-branches-page',
  templateUrl: './branches-page.component.html',
  styleUrls: ['./branches-page.component.css']
})
export class BranchesPageComponent implements OnInit {

  branches: BranchModel[] = [];
  loading: boolean = true;

  constructor(private branchService: BranchService) { }
  
  ngOnInit() {
    this.branchService.getBranches()
    .subscribe((responce: BranchModel[]) => {
     this.branches = responce;
     this.loading = false;
     console.log(this.branches)
    },
    (error: any) => {        
    });
  }
}
