import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    let id : string;
    this.route.queryParams.
    subscribe(
    (params: Params) => {
      id = params["id"];
    });
    this.router.navigate(['dashboard'], {relativeTo: this.route, queryParamsHandling: "preserve"});
  }
}