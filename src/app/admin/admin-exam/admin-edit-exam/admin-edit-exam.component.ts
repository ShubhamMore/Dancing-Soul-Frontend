import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { FormValidator } from '../../../validators/form.validator';
import { ExamService } from '../../../services/exam.service';
import { ExamModel } from '../../../models/exams.model';
import { FileModel } from '../../../models/file.model';

@Component({
  selector: 'app-admin-edit-exam',
  templateUrl: './admin-edit-exam.component.html',
  styleUrls: ['./admin-edit-exam.component.css']
})
export class AdminEditExamComponent implements OnInit {
  exam: ExamModel;

  form: FormGroup;

  loading: boolean;
  error: string;

  formError: boolean;

  imagePreview: string;
  uploadImage: File;

  invalidImage: boolean;

  ext: string;
  constructor(
    private examService: ExamService,
    private formValidator: FormValidator,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required]
      }),
      body: new FormControl(null, {
        validators: []
      })
    });

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
          this.form.setValue({
            title: this.exam.title,
            body: this.exam.body
          });
          this.loading = false;
        },
        (error: any) => {
          this.setError(error);
        }
      );
    });
  }

  onImagePicked(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    const imgExt: string[] = ['jpg', 'png', 'pdf'];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
      this.ext = files[i].name.substring(files[i].name.lastIndexOf('.') + 1).toLowerCase();
      if (!(imgExt.indexOf(this.ext) !== -1)) {
        return (this.invalidImage = true);
      }
    }
    this.invalidImage = false;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
      this.uploadImage = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(files[i]);
    }
  }

  deleteExamFile() {
    const dltConfirm = confirm('do you really want to delete this Article File??');
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

  cancelImage() {
    this.imagePreview = null;
    this.uploadImage = null;
    this.invalidImage = false;
  }

  editExam() {
    if (this.form.invalid) {
      this.formError = true;
    }

    if (this.form.valid) {
      this.loading = true;
      this.formError = false;

      const exam = new FormData();
      exam.append('_id', this.exam._id);
      exam.append('title', this.form.value.title);
      exam.append('body', this.form.value.body);
      if (this.uploadImage) {
        exam.append('image', this.uploadImage, 'exam');
      }

      this.examService.editExam(exam).subscribe(
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
    this.router.navigate(['/admin', 'exams', this.exam._id], {
      relativeTo: this.route,
      skipLocationChange: true
    });
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
