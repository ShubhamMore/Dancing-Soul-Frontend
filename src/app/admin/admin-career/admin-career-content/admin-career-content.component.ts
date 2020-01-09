import { Component, OnInit } from '@angular/core';
import { ContentModel } from '../../../models/content.model';
import { ContentService } from '../../../services/content.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-career-content',
  templateUrl: './admin-career-content.component.html',
  styleUrls: ['./admin-career-content.component.css']
})
export class AdminCareerContentComponent implements OnInit {
  loading: boolean;
  error: string;
  content: ContentModel;
  editing: boolean;

  form: FormGroup;

  constructor(
    private contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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
          this.form.patchValue({ content: this.content.careerContent });
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
        careerContent: this.form.value.content
      };
      if (this.content) {
        content._id = this.content._id;
        content.content = this.content.content;
      }

      this.contentService.saveContent(content).subscribe(
        (responce: any) => {
          this.form.reset();
          this.content = content;
          this.form.patchValue({ content: this.content.careerContent });
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
      skipLocationChange: true
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
