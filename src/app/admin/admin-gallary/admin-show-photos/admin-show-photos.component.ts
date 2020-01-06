import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../../services/gallery.service';
import { ImageModel } from '../../../models/image.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-admin-show-photos',
  templateUrl: './admin-show-photos.component.html',
  styleUrls: ['./admin-show-photos.component.css']
})
export class AdminShowPhotosComponent implements OnInit {
  form: FormGroup;
  images: ImageModel[];
  category: string;
  loading: boolean;
  error: string;

  constructor(private galleryService: GalleryService) {}

  ngOnInit() {
    this.loading = true;
    this.images = [];
    this.form = new FormGroup({
      category: new FormControl('mdp', {
        validators: [Validators.required]
      })
    });

    this.categoryChanged();
  }

  getImages(category: string) {
    this.loading = true;
    this.images = [];
    this.galleryService.getImages(category).subscribe(
      (response: ImageModel[]) => {
        this.images = response;
        this.loading = false;
      },
      (error: any) => {
        this.setError(error);
      }
    );
  }

  categoryChanged() {
    this.category = this.form.value.category;
    this.getImages(this.category);
  }

  deleteImage(publicId: string) {
    this.loading = true;
    this.galleryService.removeImage(publicId).subscribe(
      (responce: any) => {
        this.ngOnInit();
      },
      (error: any) => {
        this.setError(error);
      }
    );
  }

  setError(err: string) {
    this.error = err;
    this.loading = false;
  }

  clearError() {
    this.error = null;
  }
}
