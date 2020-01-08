import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CareerModel } from '../../models/career.model';
import { CareerService } from '../../services/career.service';

@Component({
  selector: 'app-admin-career',
  templateUrl: './admin-career.component.html',
  styleUrls: ['./admin-career.component.css']
})
export class AdminCareerComponent implements OnInit {
  careers: CareerModel[];

  loading: boolean;
  error: string;
  constructor(
    private careerService: CareerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.careers = [];
    this.careerService.getCareers().subscribe(
      (responce: any) => {
        this.careers = responce;
        this.loading = false;
      },
      (error: any) => {
        this.setError(error);
      }
    );
  }

  content() {
    this.router.navigate(['/admin', 'career', 'content'], {
      relativeTo: this.route,
      skipLocationChange: true
    });
  }

  deleteCareer(id: string) {
    const confirm = window.confirm('Do you really want to delete This??');
    if (confirm) {
      this.loading = true;
      this.careerService.deleteCareer(id).subscribe(
        (responce: any) => {
          this.careers = responce;
          this.loading = false;
        },
        (error: any) => {
          this.setError(error);
        }
      );
    }
  }

  setError(err: string) {
    this.error = err;
    this.loading = false;
  }

  clearError() {
    this.error = null;
  }
}
