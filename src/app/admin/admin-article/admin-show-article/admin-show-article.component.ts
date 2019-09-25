import { Component, OnInit } from '@angular/core';
import { Article } from '../../../models/articles.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../../../services/httpPost.service';

@Component({
  selector: 'app-admin-show-article',
  templateUrl: './admin-show-article.component.html',
  styleUrls: ['./admin-show-article.component.css']
})
export class AdminShowArticleComponent implements OnInit {
  article: Article;

  loading : boolean = true;

  constructor(private httpPostService: HttpService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params:Params) => {
        const _id = params['id'];
        const data = { api : "getArticle", data : { _id }}
        this.httpPostService.httpPost(data).subscribe((val) => {
          this.article = val;
          this.loading = false;
        },
        (error) => {
        });
        
      }
    );
  }

  edit() {
    this.loading = true;
    this.router.navigate(['edit'], {relativeTo: this.route, skipLocationChange:true});
  }

  delete() {
    
    const dltConfirm = confirm("do you really want to delete??");
    if(dltConfirm) {
      this.loading = true;
      const data = { api : "deleteArticle", data : { _id : this.article._id }}
      this.httpPostService.httpPostAuth(data).subscribe((val) => {
        this.cancel();
      },
      (error) => {
      this.loading = false;
      });
    }
  }

  cancel() {
    this.loading = true;
    this.router.navigate(['/admin', 'article'], {relativeTo: this.route, skipLocationChange:true});
  }
}