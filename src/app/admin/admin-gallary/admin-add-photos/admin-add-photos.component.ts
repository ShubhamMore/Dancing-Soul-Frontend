import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../../services/httpPost.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-add-photos',
  templateUrl: './admin-add-photos.component.html',
  styleUrls: ['./admin-add-photos.component.css']
})
export class AdminAddPhotosComponent implements OnInit {

  form: FormGroup;
  imagePreview: string[] = [];
  uploadImages: File[] = [];
  loading: boolean = true;
  error : string = null;
  invalidImage : boolean = false;

  constructor(private httpPostService: HttpService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.loading = false;
  }

  onImagePicked(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    const imgExt : string[] = ["jpg", "png"];
    let ext : string = null;
    for(let i = 0; i < files.length; i++) {
      ext = files[i].name.substring(files[i].name.lastIndexOf('.') + 1);
      if(!(imgExt.indexOf(ext)!=-1)) {
        return this.invalidImage = true;
      }
    }
    this.invalidImage = false;
    for(let i = 0; i < files.length; i++) {
      this.uploadImages.push(files[i]);
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview.push(<string>reader.result);
      };
      reader.readAsDataURL(files[i]);
    }
    this.form.patchValue({image: null});
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    
    this.loading = true;
    
    const title = this.form.value.title;
    const postData = new FormData();
    for(let i = 0; i < this.uploadImages.length; i++) {
      postData.append("image", this.uploadImages[i], title+i);
    }
    const data = { api : "addImages", data : postData }
    
    this.httpPostService.httpPostAuth(data)
    .subscribe(responseData => {
      this.imagePreview = [];
      this.uploadImages = [];
      this.form.reset();
      this.cancel();
    },
    (error) => {
      this.setError(error)
    });
  }

  cancelImage(index : number) {
    this.imagePreview.splice(index, 1);
    this.uploadImages.splice(index, 1);
  }

  cancel() {
    this.loading = true;
    this.router.navigate(['/admin', 'gallery'], {relativeTo:this.route, skipLocationChange:true});
  }

  setError(err : string) {
		this.error = err;
		this.loading = false;
	}

	clearErr() {
		this.error = null;
	}
}