import { Component, OnInit } from '@angular/core';
import { BranchService } from '../../services/branch.service';
import { BranchModel } from '../../models/branch.model';
import { Angular2ImageGalleryModule } from 'angular2-image-gallery';

@Component({
  selector: 'app-branches-page',
  templateUrl: './branches-page.component.html',
  styleUrls: ['./branches-page.component.css']
})
export class BranchesPageComponent implements OnInit {
  branches: any[] = [];
  loading: boolean;
  weekEndBatch: any[];
  weekDayBatch: any[];

  constructor(private branchService: BranchService) {}

  ngOnInit() {
    this.branchService.getActivateBranches().subscribe(
      (responce: BranchModel[]) => {
        this.loading = true;
        this.branches = responce;
        this.filterBatchType(this.branches);
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
      }
    );
  }

  filterBatchType(branches: any[]) {
    for (let i = 0; i < branches.length; i++) {
      const branch = branches[i];
      this.branches[i].weekDayBatch = [];
      this.branches[i].weekEndBatch = [];
      // tslint:disable-next-line: prefer-for-of
      for (let j = 0; j < branch.batch.length; j++) {
        const batch = branch.batch[j];
        if (batch.batchType === '0') {
          this.branches[i].weekDayBatch.push(batch);
        } else if (batch.batchType === '1') {
          this.branches[i].weekEndBatch.push(batch);
        }
      }
    }
  }
}
