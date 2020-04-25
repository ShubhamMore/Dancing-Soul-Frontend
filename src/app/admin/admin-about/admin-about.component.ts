import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentModel } from '../../models/content.model';
import { ContentService } from '../../services/content.service';
import { CKEditorConfig } from '../../shared/ckeditor.config';

@Component({
  selector: 'app-admin-about',
  templateUrl: './admin-about.component.html',
  styleUrls: ['./admin-about.component.css'],
})
export class AdminAboutComponent implements OnInit {
  loading: boolean;
  error: string;
  content: ContentModel;
  contentData: any;
  editing: boolean;
  ckeConfig: any;
  @ViewChild('myckeditor') ckeditor: any;

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.loading = true;
    this.editing = false;
    this.ckeConfig = CKEditorConfig;

    this.contentService.getContent().subscribe(
      (responce: ContentModel) => {
        this.content = responce;
        this.contentData = this.content.content;
        this.loading = false;
      },
      (error: any) => {
        this.setError(error);
        this.loading = false;
      }
    );
  }

  saveContent() {
    if (this.contentData) {
      this.loading = true;
      const content: any = {
        content: this.contentData,
      };
      if (this.content) {
        content._id = this.content._id;
        content.careerContent = this.content.careerContent;
      }

      this.contentService.saveContent(content).subscribe(
        (responce: any) => {
          this.contentData = null;
          this.content = content;
          this.contentData = this.content.content;
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
