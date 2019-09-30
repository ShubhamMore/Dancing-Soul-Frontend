import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../services/httpPost.service';
import { AboutModel } from '../../../models/about.model';

@Component({
  selector: 'app-admin-edit-aim',
  templateUrl: './admin-edit-aim.component.html',
  styleUrls: ['./admin-edit-aim.component.css']
})
export class AdminEditAimComponent implements OnInit {

  form: FormGroup;

  about: AboutModel;

  loading: boolean = true;

  error : string = null;
	
  constructor(private httpPostService: HttpService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      aim: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    const data = { api : "getAbout", data : {}}
    this.httpPostService.httpPost(data).subscribe((val) => {
     this.about = val[0];
     this.form.patchValue({ aim: this.about.aim});
     this.loading = false;
    },
    (error) => {
      
    });
    
  }

  saveAim() {
    if(this.form.valid) {
      this.loading = true;
      const about : AboutModel = {
        _id : this.about._id,
        aim : this.form.value.aim,
        history : this.about.history,
        philosophy : this.about.philosophy
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
    this.router.navigate(['/admin', 'about', 'aim'], {relativeTo: this.route, skipLocationChange:true});
  }
  
	setError(err : string) {
		this.error = err;
		this.loading = false;
	}

	clearErr() {
		this.error = null;
	}
}