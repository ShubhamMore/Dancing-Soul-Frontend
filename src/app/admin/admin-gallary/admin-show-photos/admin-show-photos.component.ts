import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../../services/gallery.service';
import { ImageModel } from '../../../models/image.model';
@Component({
  selector: 'app-admin-show-photos',
  templateUrl: './admin-show-photos.component.html',
  styleUrls: ['./admin-show-photos.component.css']
})
export class AdminShowPhotosComponent implements OnInit {

  images: ImageModel[] = [];
  loading: boolean = true;
  error: string = null;

  constructor(private galleryService: GalleryService) {}

  ngOnInit() {
    this.galleryService.getImages()
    .subscribe((response: ImageModel[]) => {
      this.images = response;
      this.loading = false;
    },
    (error: any) => {
      this.setError(error);
    });
  }

  deleteImage(public_id: string) {

    this.loading = true;
    this.galleryService.removeImage(public_id)
    .subscribe((responce: any) => {
      this.ngOnInit();
    },
    (error: any) => {
      this.setError(error);
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
