import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ExamService } from '../../../services/exam.service';
import { ExamModel } from '../../../models/exams.model';

@Component({
  selector: 'app-admin-show-exam',
  templateUrl: './admin-show-exam.component.html',
  styleUrls: ['./admin-show-exam.component.css']
})
export class AdminShowExamComponent implements OnInit {
  exam: ExamModel;

  loading: boolean;
  error: string;

  ext: string;

  constructor(
    private examService: ExamService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      const id = params['id'];
      this.examService.getExam(id).subscribe(
        (responce: ExamModel) => {
          this.exam = responce;
          if (this.exam.file) {
            this.ext = this.exam.file.file_name
              .substring(this.exam.file.file_name.lastIndexOf('.') + 1)
              .toLowerCase();
          }
          this.loading = false;
        },
        (error: any) => {
          this.setError(error);
        }
      );
    });
  }

  edit() {
    this.loading = true;
    this.router.navigate(['edit'], { relativeTo: this.route, skipLocationChange: true });
  }

  deleteExamFile() {
    const dltConfirm = confirm('do you really want to delete this Exam File??');
    if (dltConfirm) {
      this.loading = true;
      this.examService.deleteExamFile(this.exam._id, this.exam.file.public_id).subscribe(
        (responce: any) => {
          this.ngOnInit();
        },
        (error: any) => {
          this.setError(error);
        }
      );
    }
  }

  delete() {
    const dltConfirm = confirm('do you really want to delete??');
    if (dltConfirm) {
      this.loading = true;
      this.examService.deleteExam(this.exam._id).subscribe(
        (responce: any) => {
          this.cancel();
        },
        (error: any) => {
          this.setError(error);
        }
      );
    }
  }

  cancel() {
    this.router.navigate(['/admin', 'exams'], { relativeTo: this.route, skipLocationChange: true });
    this.loading = false;
  }

  setError(err: string) {
    this.error = err;
    this.loading = false;
  }

  clearError() {
    this.error = null;
  }
}
