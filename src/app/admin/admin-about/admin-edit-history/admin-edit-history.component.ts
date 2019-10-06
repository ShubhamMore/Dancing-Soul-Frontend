import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AboutService } from '../../../services/about.service';
import { AboutModel } from '../../../models/about.model';

@Component({
  selector: 'app-admin-edit-history',
  templateUrl: './admin-edit-history.component.html',
  styleUrls: ['./admin-edit-history.component.css']
})
export class AdminEditHistoryComponent implements OnInit {

  form: FormGroup;

  about: AboutModel;

  loading: boolean = true;

  error: string = null;

  constructor(private aboutService: AboutService,
    private router: Router,
    private route: ActivatedRoute) { }
    
  ngOnInit() {
    this.form = new FormGroup({
      history: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    
    this.aboutService.getAbout()
    .subscribe((responce: AboutModel) => {
     this.about = responce;
     this.form.patchValue({history: this.about.history});
     this.loading = false;
    },
    (error) => {
      this.setError(error)
    });
  }

  saveHistory() {
    if(this.form.valid) {
      this.loading = true;
      const about: AboutModel = {
        _id: this.about._id,
        aim: this.about.aim,
        history: this.form.value.history,
        philosophy: this.about.philosophy
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
    this.router.navigate(['/admin', 'about', 'history'], {relativeTo: this.route, skipLocationChange: true});
  }

	setError(err: string) {
		this.error = err;
		this.loading = false;
	}

	clearError() {
		this.error = null;
	}

}
