import { Component, OnInit } from '@angular/core';
import { CareerService } from '../../../services/career.service';
import { CareerModel } from '../../../models/career.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-admin-show-career',
  templateUrl: './admin-show-career.component.html',
  styleUrls: ['./admin-show-career.component.css']
})
export class AdminShowCareerComponent implements OnInit {
  loading: boolean;
  error: string;
  ext: string;

  career: CareerModel;
  constructor(
    private careerService: CareerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe((param: Params) => {
      // tslint:disable-next-line: no-string-literal
      const id = param['id'];

      this.careerService.getCareer(id).subscribe(
        (resData: any) => {
          this.career = resData;
          if (this.career.coverLatter) {
            this.ext = this.career.coverLatter.file_name
              .substring(this.career.coverLatter.file_name.lastIndexOf('.') + 1)
              .toLowerCase();
          }
          this.loading = false;
        },
        (error: any) => {
          this.setError(error);
        }
      );
    });
  }

  cancel() {
    this.router.navigate(['/admin', 'career'], {
      relativeTo: this.route,
      skipLocationChange: true
    });
  }

  setError(err: string) {
    this.error = err;
    this.loading = false;
  }

  clearError() {
    this.error = null;
  }
}
