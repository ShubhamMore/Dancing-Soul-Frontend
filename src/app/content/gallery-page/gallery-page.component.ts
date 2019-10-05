import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/httpPost.service';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.css']
})
export class GalleryPageComponent implements OnInit {

  yourGalleryName='assets/img/gallery/'
  gallery: any[] = [];
  loading: boolean = true;

  constructor(private httpPostService: HttpService) { }

  ngOnInit() {
      const examsData = { api: "getImages", data: {}}
      this.httpPostService.httpPost(examsData).subscribe((val: any) => {
        console.log(val)
        this.gallery = val;
        this.loading = false;
      },
      (error) => {
      });
  }

}
