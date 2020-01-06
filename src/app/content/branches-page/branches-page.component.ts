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

  branches: BranchModel[] = [];
  loading: boolean = true;
  weekEndBatch:any[];
  weekDayBatch:any[];

  constructor(private branchService: BranchService) { }
  
  ngOnInit() {
    this.branchService.getActivateBranches()
    .subscribe((responce: BranchModel[]) => {
     this.branches = responce;
     this.filterBatchType(this.branches);
     this.loading = false;
     console.log(this.branches)
    },
    (error: any) => {        
    });
  }

  filterBatchType(branches){
    for(var i=0;i<branches.length;i++){
      var branch = branches[i];
      this.branches[i].weekDayBatch = [];
      this.branches[i].weekEndBatch = [];
      for(var j=0;j<branch.batch.length;j++){
        var batch = branch.batch[j];
        if(batch.batchType=="0"){
          this.branches[i].weekDayBatch.push(batch);
        }else if(batch.batchType=="1"){
          this.branches[i].weekEndBatch.push(batch);
        }
      }
    }

      
    
  }
}
