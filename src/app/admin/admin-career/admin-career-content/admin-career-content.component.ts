import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentModel } from '../../../models/content.model';
import { ContentService } from '../../../services/content.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CKEditorConfig } from '../../../shared/ckeditor.config';

@Component({
  selector: 'app-admin-career-content',
  templateUrl: './admin-career-content.component.html',
  styleUrls: ['./admin-career-content.component.css'],
})
export class AdminCareerContentComponent implements OnInit {
  loading: boolean;
  error: string;
  content: ContentModel;
  careerContent: any;
  editing: boolean;
  ckeConfig: any;
  @ViewChild('myckeditor') ckeditor: any;

  constructor(
    private contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.editing = false;
    this.ckeConfig = CKEditorConfig;

    this.contentService.getContent().subscribe(
      (responce: ContentModel) => {
        this.content = responce;
        this.careerContent = this.content.careerContent;
        this.loading = false;
      },
      (error: any) => {
        this.setError(error);
        this.loading = false;
      }
    );
  }

  saveContent() {
    if (this.careerContent) {
      this.loading = true;
      const content: any = {
        careerContent: this.careerContent,
      };
      if (this.content) {
        content._id = this.content._id;
        content.content = this.content.content;
      }

      this.contentService.saveContent(content).subscribe(
        (responce: any) => {
          this.careerContent = null;
          this.content = content;
          this.careerContent = this.content.careerContent;
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

  back() {
    this.router.navigate(['/admin', 'career'], {
      relativeTo: this.route,
      skipLocationChange: true,
    });
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
