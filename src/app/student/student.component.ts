import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      const id = params['id'];
    });
    this.router.navigate(['dashboard'], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve'
    });
  }
}
