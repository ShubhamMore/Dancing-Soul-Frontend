import { Component, OnInit, HostListener } from '@angular/core';
import { NewsModel } from '../../models/news.model';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-shelter-page',
  templateUrl: './news-shelter-page.component.html',
  styleUrls: ['./news-shelter-page.component.css']
})
export class NewsShelterPageComponent implements OnInit {
  newsList: NewsModel[];
  modelImageSrc: string;
  loading: boolean;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.loading = true;
    this.newsList = [];
    this.newsService.getAllNews().subscribe(
      (responce: NewsModel[]) => {
        this.newsList = responce;
        this.loading = false;
      },
      (error: any) => {}
    );
  }

  openImageModal(url: any) {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
    this.modelImageSrc = url;
  }
  closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
    this.modelImageSrc = '';
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
    this.modelImageSrc = '';
  }
}
