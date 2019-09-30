import { Component, OnInit } from '@angular/core';
import { Faculty } from '../../models/faculty.model';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/httpPost.service';

@Component({
  selector: 'app-admin-faculty',
  templateUrl: './admin-faculty.component.html',
  styleUrls: ['./admin-faculty.component.css']
})
export class AdminFacultyComponent implements OnInit {

  faculties : Faculty[] = [];

  loading: boolean = true;
  
  constructor(private httpPostService: HttpService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const data = { api : "getFaculties", data : {}}
    this.httpPostService.httpPostAuth(data).subscribe((val: any) => {
      this.faculties = val;
      this.loading = false;
    },
    (error) => {
      // this.router.navigate(["/server-not-found"], {relativeTo:this.route});
    });
  }

  onNewFaculty() {
    this.loading = true;
    this.router.navigate(['new'], {relativeTo:this.route, skipLocationChange:true});
  }
}