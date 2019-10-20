import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../services/gallery.service';
import { EnvVar } from '../../shared/config';
import { VideoModel } from '..//..//models/video.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.css']
})
export class GalleryPageComponent implements OnInit {

  yourGalleryName='assets/img/gallery/'
  gallery: any = null;
  loading: boolean = true;
  mdpUrl: string = null;
  itcUrl: string = null;
  mdmUrl: string = null;
  videos : VideoModel[] = [];
  videoLinks : SafeResourceUrl[] = [];
  constructor(private galleryService: GalleryService,private sanitizer: DomSanitizer) { }

  ngOnInit() {
    
    this.mdpUrl = EnvVar.url + "images/mdp.json";
    this.itcUrl = EnvVar.url + "images/itc.json";
    this.mdmUrl = EnvVar.url + "images/mdm.json";
    
    this.galleryService.getAllImages()
    .subscribe((responce: any) => {
      this.gallery = responce;
      
      this.galleryService.getVideos()
      .subscribe((responce: VideoModel[]) => {
      this.videos = responce;
      this.videoLinks = this.videos.map(video => this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+video.url.split('/')[video.url.split('/').length-1]));
      this.loading = false;
      },
      (error: any) => { 
        console.log(error)
      });
    },
    (error: any) => {
      console.log(error)
    });
  }

  ngAfterViewInit(){

  }
}
