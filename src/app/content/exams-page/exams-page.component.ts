import { Component, OnInit } from '@angular/core';
import { ExamModel } from '../../models/exams.model';
import { ExamService } from '../../services/exam.service';

@Component({
  selector: 'app-exams-page',
  templateUrl: './exams-page.component.html',
  styleUrls: ['./exams-page.component.css']
})
export class ExamsPageComponent implements OnInit {

  exams: ExamModel[] = [];
  loading: boolean = true;

  constructor(private examService: ExamService) { }

  ngOnInit() {
      this.examService.getExams()
      .subscribe((responce: ExamModel[]) => {
        this.exams = responce;
        this.loading = false;
      },
      (error: any) => {
      });
  }

}
