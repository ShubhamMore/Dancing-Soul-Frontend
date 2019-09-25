import { Component, OnInit } from '@angular/core';
import { Branch } from '../../models/branch.model';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/httpPost.service';

@Component({
  selector: 'app-admin-branch',
  templateUrl: './admin-branch.component.html',
  styleUrls: ['./admin-branch.component.css']
})
export class AdminBranchComponent implements OnInit {

    branches : Branch[] = [];

    loading : boolean = true;

    constructor(private httpPostService: HttpService,
                private router: Router,
                private route: ActivatedRoute) { }


    ngOnInit() {
        const data = { api : "getBranches", data : { }}
        this.httpPostService.httpPost(data).subscribe((val) => {
         this.branches = val;
         this.loading = false;
        },
        (error) => {        
        });
    }

    onNewBranch() {
        this.loading = true;
        this.router.navigate(['new'], {relativeTo:this.route, skipLocationChange: true});
    }
}