import { Component, OnInit, HostListener } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ArticleModel } from '../../models/articles.model';

@Component({
  selector: 'app-articles-page',
  templateUrl: './articles-page.component.html',
  styleUrls: ['./articles-page.component.css']
})
export class ArticlesPageComponent implements OnInit {
  articles: any[];
  modelImageSrc: string;
  loading: boolean;

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.loading = true;
    this.articles = [];
    this.articleService.getAllArticles().subscribe(
      (responce: ArticleModel[]) => {
        this.articles = responce;
        this.loading = false;
      },
      (error: any) => {}
    );
  }

  openImageModal(url) {
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
