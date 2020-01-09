import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../services/gallery.service';
import { environment } from '../../../environments/environment';
import { VideoModel } from '..//..//models/video.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.css']
})
export class GalleryPageComponent implements OnInit {
  yourGalleryName: string;
  gallery: any;
  loading: boolean;
  mdpUrl: string;
  itcUrl: string;
  mdmUrl: string;
  videos: VideoModel[];
  videoLinks: SafeResourceUrl[];
  constructor(private galleryService: GalleryService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.loading = true;
    this.yourGalleryName = 'assets/img/gallery/';
    this.videos = [];
    this.videoLinks = [];
    this.mdpUrl = environment.url + 'images/mdp.json';
    this.itcUrl = environment.url + 'images/itc.json';
    this.mdmUrl = environment.url + 'images/mdm.json';

    this.galleryService.getAllImages().subscribe(
      (responce: any) => {
        this.gallery = responce;

        this.galleryService.getVideos().subscribe(
          (res: VideoModel[]) => {
            this.videos = res;
            this.videoLinks = this.videos.map(video =>
              this.sanitizer.bypassSecurityTrustResourceUrl(
                'https://www.youtube.com/embed/' +
                  video.url.split('/')[video.url.split('/').length - 1]
              )
            );
            this.loading = false;
          },
          (error: any) => {
            console.log(error);
          }
        );
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  ngAfterViewInit() {}
}
