import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/httpPost.service';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.css']
})
export class AdminNewsComponent implements OnInit {

  news: any[] = [];

  loading: boolean = true;

  error : string = null;

  constructor(private httpPostService: HttpService,
              private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit() {
    const data = { api : "getAllNews", data : {}}
    this.httpPostService.httpPost(data).subscribe((val) => {
      this.news = val;
      this.loading = false;
    },
    (error) => {
      this.setError(error)
    });
  }

  deleteNews(_id:string) {
    const deleteConfirm = confirm("do you really want to Delete News??");  
    if(deleteConfirm) {
      this.loading = true;
      const data = { api : "deleteNews", data : { _id }}
      this.httpPostService.httpPostAuth(data).subscribe((val) => {
       this.loading = false;
      },
      (error) => {
        this.setError(error)
      });
    }    
  }

  onNewNews() {
    this.loading = true;
    this.router.navigate(['new'], {relativeTo:this.route, skipLocationChange:true});
  }

  setError(err : string) {
		this.error = err;
		this.loading = false;
	}

	clearErr() {
		this.error = null;
	}
}