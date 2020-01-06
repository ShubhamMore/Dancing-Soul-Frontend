import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GalleryService } from '../../../services/gallery.service';

@Component({
  selector: 'app-admin-add-videos',
  templateUrl: './admin-add-videos.component.html',
  styleUrls: ['./admin-add-videos.component.css']
})
export class AdminAddVideosComponent implements OnInit {
  form: FormGroup;
  formError: boolean;

  loading: boolean;
  error: string;

  constructor(
    private galleryService: GalleryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.formError = false;
    this.form = new FormGroup({
      date: new FormControl(this.date(), {
        validators: [Validators.required]
      }),
      title: new FormControl(null, {
        validators: [Validators.required]
      }),
      videoUrl: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.loading = false;
  }

  date(): string {
    const today: any = new Date();
    const date: string =
      this.dateMonthCreator(today.getDate()) +
      '-' +
      this.dateMonthCreator(today.getMonth() + 1) +
      '-' +
      today.getFullYear().toString();
    return date;
  }

  dateMonthCreator(dm: number): string {
    if (dm < 10) {
      return '0' + dm.toString();
    }
    return dm.toString();
  }

  addVideo() {
    if (this.form.invalid) {
      this.formError = true;
    }

    if (this.form.valid) {
      this.formError = false;
      this.loading = true;
      const video: any = {
        title: this.form.value.title,
        url: this.form.value.videoUrl,
        created_at: this.form.value.date
      };

      this.galleryService.addVideo(video).subscribe(
        (responce: any) => {
          this.form.reset();
          this.cancel();
        },
        (error: any) => {
          this.setError(error);
        }
      );
    }
  }

  cancel() {
    this.loading = true;
    this.router.navigate(['/admin', 'gallery', 'videos'], {
      relativeTo: this.route,
      skipLocationChange: true
    });
  }

  setError(err: string) {
    this.error = err;
    this.loading = false;
  }

  clearError() {
    this.error = null;
  }
}
