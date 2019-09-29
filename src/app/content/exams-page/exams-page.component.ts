import { Component, OnInit } from '@angular/core';
import { ExamModule } from '../../models/exams.model';
import { HttpService } from '../../services/httpPost.service';

@Component({
  selector: 'app-exams-page',
  templateUrl: './exams-page.component.html',
  styleUrls: ['./exams-page.component.css']
})
export class ExamsPageComponent implements OnInit {

  exams : ExamModule[] = [];
  loading : boolean = true;

  constructor(private httpPostService: HttpService) { }

  ngOnInit() {
      const facultyData = { api : "getExams", data : {}}
      this.httpPostService.httpPost(facultyData).subscribe((val: any) => {
        this.exams = val;
        this.loading = false;
      },
      (error) => {
      });
   
  }

}
