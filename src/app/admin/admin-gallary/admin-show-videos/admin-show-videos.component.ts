import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VideoModel } from '../../../models/video.model';
import { GalleryService } from '../../../services/gallery.service';

@Component({
  selector: 'app-admin-show-videos',
  templateUrl: './admin-show-videos.component.html',
  styleUrls: ['./admin-show-videos.component.css']
})
export class AdminShowVideosComponent implements OnInit {
  videos: VideoModel[];
  loading: boolean;
  error: string;

  constructor(
    private galleryService: GalleryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.videos = [];
    this.galleryService.getVideos().subscribe(
      (responce: VideoModel[]) => {
        this.videos = responce;
        this.loading = false;
      },
      (error: any) => {
        this.setError(error);
      }
    );
  }

  deleteVideo(id: string) {
    const deleteConfirm = confirm('do you really want to Delete this Video??');
    if (deleteConfirm) {
      this.loading = true;

      this.galleryService.removeVideo(id).subscribe(
        (responce: any) => {
          this.ngOnInit();
        },
        (error: any) => {
          this.setError(error);
        }
      );
    }
  }

  openVideo(url: string) {}

  onNewVideo() {
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
