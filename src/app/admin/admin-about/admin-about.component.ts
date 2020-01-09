import { Component, OnInit } from '@angular/core';
import { ContentModel } from '../../models/content.model';
import { ContentService } from '../../services/content.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-about',
  templateUrl: './admin-about.component.html',
  styleUrls: ['./admin-about.component.css']
})
export class AdminAboutComponent implements OnInit {
  loading: boolean;
  error: string;
  content: ContentModel;
  editing: boolean;

  form: FormGroup;

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.loading = true;
    this.editing = false;
    this.form = new FormGroup({
      content: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.contentService.getContent().subscribe(
      (responce: ContentModel) => {
        this.content = responce;
        if (this.content) {
          this.form.patchValue({ content: this.content.content });
        }
        this.loading = false;
      },
      (error: any) => {
        this.setError(error);
      }
    );
  }

  saveContent() {
    if (this.form.valid) {
      this.loading = true;
      const content: any = {
        content: this.form.value.content
      };
      if (this.content) {
        content._id = this.content._id;
        content.careerContent = this.content.careerContent;
      }

      this.contentService.saveContent(content).subscribe(
        (responce: any) => {
          this.form.reset();
          this.content = content;
          this.form.patchValue({ content: this.content.content });
          this.cancel();
        },
        (error: any) => {
          this.setError(error);
        }
      );
    }
  }

  edit() {
    this.editing = true;
  }

  cancel() {
    this.editing = false;
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
