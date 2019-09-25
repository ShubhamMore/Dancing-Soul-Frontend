import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/httpPost.service';

@Component({
  selector: 'app-admin-exam',
  templateUrl: './admin-exam.component.html',
  styleUrls: ['./admin-exam.component.css']
})
export class AdminExamComponent implements OnInit {

  exams: any[] = [];

  loading: boolean = true;

  constructor(private httpPostService: HttpService,
              private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit() {
    const data = { api : "getExams", data : {}}
    this.httpPostService.httpPost(data).subscribe((val) => {
     this.exams = val;
     this.loading = false;
    },
    (error) => {
    });
  }

  deleteExam(_id:string) {
    const deleteConfirm = confirm("do you really want to Delete this Exam??");  
    if(deleteConfirm) {
      this.loading = true;
      const data = { api : "deleteExam", data : { _id }}
      this.httpPostService.httpPostAuth(data).subscribe((val) => {
       this.loading = false;
      },
      (error) => {
       this.loading = false;
      });
    }    
  }

  onNewExam() {
    this.loading = true;
    this.router.navigate(['new'], {relativeTo:this.route, skipLocationChange:true});
  }
}