import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../services/gallery.service';
import { ImageModel } from '../../models/image.model';
import { VideoModel } from '..//..//models/video.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.css']
})
export class GalleryPageComponent implements OnInit {

  yourGalleryName='assets/img/gallery/'
  gallery: ImageModel[] = [];
  loading: boolean = true;
  videos : VideoModel[] = [];
  videoLinks : SafeResourceUrl[] = [];
  constructor(private galleryService: GalleryService,private sanitizer: DomSanitizer) { }

  ngOnInit() {
      this.galleryService.getAllImages()
      .subscribe((responce: ImageModel[]) => {
        this.gallery = responce;
        this.loading = false;
      },
      (error: any) => {
        console.log(error)
      });
      this.galleryService.getVideos()
    .subscribe((responce: VideoModel[]) => {
     this.videos = responce;
     this.loading = false;
     this.videoLinks = this.videos.map(video => this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+video.url.split('/')[video.url.split('/').length-1]));
    },
    (error: any) => {        
    });    
  }

  ngAfterViewInit(){

  }


}
