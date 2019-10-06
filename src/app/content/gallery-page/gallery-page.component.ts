import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../services/gallery.service';
import { ImageModel } from '../../models/image.model';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.css']
})
export class GalleryPageComponent implements OnInit {

  yourGalleryName='assets/img/gallery/'
  gallery: ImageModel[] = [];
  loading: boolean = true;

  constructor(private galleryService: GalleryService) { }

  ngOnInit() {
      this.galleryService.getImages()
      .subscribe((responce: ImageModel[]) => {
        console.log(responce)
        this.gallery = responce;
        this.loading = false;
      },
      (error: any) => {
      });
  }

}
