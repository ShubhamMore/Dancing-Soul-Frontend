import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/articles.model';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/httpPost.service';

@Component({
  selector: 'app-admin-article',
  templateUrl: './admin-article.component.html',
  styleUrls: ['./admin-article.component.css']
})
export class AdminArticleComponent implements OnInit {

  articles: Article[] = [];

  loading: boolean = true;

  constructor(private httpPostService: HttpService,
              private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit() {
    const data = { api : "getArticles", data : {}}
    this.httpPostService.httpPost(data).subscribe((val) => {
     this.articles = val;
     this.loading = false;
    },
    (error) => {
    });
  }

  deleteArticle(_id:string) {
    const deleteConfirm = confirm("do you really want to Delete Article??");  
    if(deleteConfirm) {
      this.loading = true;
      const data = { api : "deleteArticle", data : { _id }}
      this.httpPostService.httpPostAuth(data).subscribe((val) => {
       this.loading = false;
      },
      (error) => {
       this.loading = false;
      });
    }    
  }

  onNewArticle() {
    this.loading = true;
    this.router.navigate(['new'], {relativeTo:this.route, skipLocationChange:true});
  }
}