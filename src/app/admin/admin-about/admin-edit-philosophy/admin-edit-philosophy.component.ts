import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../services/httpPost.service';
import { AboutModel } from '../../../models/about.model';

@Component({
  selector: 'app-admin-edit-philosophy',
  templateUrl: './admin-edit-philosophy.component.html',
  styleUrls: ['./admin-edit-philosophy.component.css']
})
export class AdminEditPhilosophyComponent implements OnInit {

  form: FormGroup;

  philosophy: string;

  about : AboutModel;

  loading: boolean = true;

  constructor(private httpPostService: HttpService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.form = new FormGroup({
      philosophy: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    const data = { api : "getAbout", data : {}}
    this.httpPostService.httpPost(data).subscribe((val) => {
      this.about = val[0];
      this.form.patchValue({philosophy: this.about.philosophy});
      this.loading = false;
    },
    (error) => {
    });
  }

  savePhilisophy() {
    if(this.form.valid) {
      this.loading = true;
      const about : AboutModel = {
        _id : this.about._id,
        aim : this.about.aim,
        history : this.about.history,
        philosophy : this.form.value.philosophy
      }
      const data = { api : "editAbout", data : about }
      this.httpPostService.httpPostAuth(data).subscribe((val) => {
        this.form.reset();
        this.cancel();
      },
      (error) => {
       this.loading = false;
      });
    }
  }
  
  cancel() {
    this.loading = true;
    this.router.navigate(['/admin', 'about', 'philosophy'], {relativeTo: this.route, skipLocationChange:true});
  }
}