import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from '../../services/exam.service';
import { ExamModel } from '../../models/exams.model';

@Component({
  selector: 'app-admin-exam',
  templateUrl: './admin-exam.component.html',
  styleUrls: ['./admin-exam.component.css']
})
export class AdminExamComponent implements OnInit {
  exams: ExamModel[];

  loading: boolean;

  error: string;

  constructor(
    private examService: ExamService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.exams = [];
    this.examService.getExams().subscribe(
      (responce: ExamModel[]) => {
        this.exams = responce;
        this.loading = false;
      },
      (error: any) => {
        this.setError(error);
      }
    );
  }

  deleteExam(id: string) {
    const deleteConfirm = confirm('do you really want to Delete this Exam??');
    if (deleteConfirm) {
      this.loading = true;
      this.examService.deleteExam(id).subscribe(
        (responce: any) => {
          this.ngOnInit();
        },
        (error: any) => {
          this.setError(error);
        }
      );
    }
  }

  onNewExam() {
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
