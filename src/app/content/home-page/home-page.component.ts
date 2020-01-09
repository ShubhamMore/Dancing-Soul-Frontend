import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  constructor(private contentService: ContentService) {}

  loading: boolean;
  content: string;

  ngOnInit() {
    this.loading = true;
    this.contentService.getContent().subscribe(
      (responce: any) => {
        this.content = responce.content;
        this.loading = false;
      },
      (error: any) => {}
    );
  }
}
