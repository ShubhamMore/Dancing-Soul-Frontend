import { Component, OnInit, HostListener } from '@angular/core';
import { ExamModel } from '../../models/exams.model';
import { ExamService } from '../../services/exam.service';

@Component({
  selector: 'app-exams-page',
  templateUrl: './exams-page.component.html',
  styleUrls: ['./exams-page.component.css']
})
export class ExamsPageComponent implements OnInit {
  exams: ExamModel[];
  modelPdfSrc: string;
  loading: boolean;

  constructor(private examService: ExamService) {}

  ngOnInit() {
    this.loading = true;
    this.exams = [];
    this.examService.getExams().subscribe(
      (responce: ExamModel[]) => {
        this.exams = responce;
        this.loading = false;
      },
      (error: any) => {}
    );
  }

  openImageModal(url: any) {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
    this.modelPdfSrc = url;
  }
  closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
    this.modelPdfSrc = '';
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
    this.modelPdfSrc = '';
  }
}
