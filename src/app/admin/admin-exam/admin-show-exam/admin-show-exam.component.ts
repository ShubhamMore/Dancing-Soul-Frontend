import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../../../services/httpPost.service';

@Component({
  selector: 'app-admin-show-exam',
  templateUrl: './admin-show-exam.component.html',
  styleUrls: ['./admin-show-exam.component.css']
})
export class AdminShowExamComponent implements OnInit {
  exam: any;

  loading : boolean = true;

  constructor(private httpPostService: HttpService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params:Params) => {
        const _id = params['id'];
        const data = { api : "getExam", data : { _id }}
        this.httpPostService.httpPost(data).subscribe((val) => {
          this.exam = val;
          this.loading = false;
        },
        (error) => {
        });
        
      }
    );
  }

  edit() {
    this.loading = true;
    this.router.navigate(['edit'], {relativeTo: this.route, skipLocationChange:true});
  }

  delete() {
    
    const dltConfirm = confirm("do you really want to delete??");
    if(dltConfirm) {
      this.loading = true;
      const data = { api : "deleteExam", data : { _id : this.exam._id }}
      this.httpPostService.httpPostAuth(data).subscribe((val) => {
        this.cancel();
      },
      (error) => {
      this.loading = false;
      });
    }
  }

  cancel() {
    this.loading = true;
    this.router.navigate(['/admin', 'exams'], {relativeTo: this.route, skipLocationChange:true});
  }
}