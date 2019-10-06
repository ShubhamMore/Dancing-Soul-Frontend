import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AboutService } from '../../../services/about.service';
import { AboutModel } from '../../../models/about.model';

@Component({
  selector: 'app-admin-edit-philosophy',
  templateUrl: './admin-edit-philosophy.component.html',
  styleUrls: ['./admin-edit-philosophy.component.css']
})
export class AdminEditPhilosophyComponent implements OnInit {

  form: FormGroup;

  philosophy: string;

  about: AboutModel;

  loading: boolean = true;
  error: string = null;
	
  constructor(private aboutService: AboutService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.form = new FormGroup({
      philosophy: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.aboutService.getAbout()
    .subscribe((responce: AboutModel) => {
      this.about = responce;
      this.form.patchValue({philosophy: this.about.philosophy});
      this.loading = false;
    },
    (error: any) => {
      this.setError(error)
    });
  }

  savePhilisophy() {
    if(this.form.valid) {
      this.loading = true;
      const about: AboutModel = {
        _id: this.about._id,
        aim: this.about.aim,
        history: this.about.history,
        philosophy: this.form.value.philosophy
      }

      this.aboutService.saveAbout(about)
      .subscribe((responce: any) => {
        this.form.reset();
        this.cancel();
      },
      (error: any) => {
        this.setError(error)
      });
    }
  }
  
  cancel() {
    this.loading = true;
    this.router.navigate(['/admin', 'about', 'philosophy'], {relativeTo: this.route, skipLocationChange: true});
  }

  
	setError(err: string) {
		this.error = err;
		this.loading = false;
	}

	clearError() {
		this.error = null;
	}
}