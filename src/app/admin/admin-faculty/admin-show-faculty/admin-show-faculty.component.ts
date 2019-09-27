import { Component, OnInit } from '@angular/core';
import { Faculty } from '../../../models/faculty.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../../../services/httpPost.service';

@Component({
  selector: 'app-admin-show-faculty',
  templateUrl: './admin-show-faculty.component.html',
  styleUrls: ['./admin-show-faculty.component.css']
})
export class AdminShowFacultyComponent implements OnInit {

  faculty: Faculty = null;

  loading: boolean = true;

  constructor(private httpPostService: HttpService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.
    subscribe(
      (params: Params) => {
        const _id = params['id'];
        const data = { api : "getFaculty", data : { _id }}
        this.httpPostService.httpPostAuth(data).subscribe((val) => {
          this.faculty = val;
          this.loading = false;
        },
        (error) => {
        });
      }
    );
  }

  changeStatus(_id:string, status:string) {
    let statusConfirm: any = true;
    if(status === "0") {
      statusConfirm = confirm("do you really want to Deactivate Faculty??");
    }
    else if(status === "1") {
      statusConfirm = confirm("do you want to Activate this Faculty again??");
    }

    if(statusConfirm) {
      this.loading = true;

      const data = { api : "changeFacultyStatus", data : { _id, status }};
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
    this.router.navigate(['/admin', 'faculty'], {relativeTo: this.route, skipLocationChange:true});
  }
} 