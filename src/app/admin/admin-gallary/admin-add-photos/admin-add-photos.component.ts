import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GalleryService } from '../../../services/gallery.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GoogleSymbol } from '@agm/core/services/google-maps-types';

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
  error: string = null;
  invalidImage: boolean = false;

  constructor(private galleryService: GalleryService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      category: new FormControl('', {
        validators: [Validators.required]
      })
    });
    this.loading = false;
  }

  onImagePicked(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    const imgExt: string[] = ["jpg", "png"];
    let ext: string = null;
    for(let i = 0; i < files.length; i++) {
      ext = files[i].name.substring(files[i].name.lastIndexOf('.') + 1);
      if (!(imgExt.indexOf(ext) != -1)) {
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
    if (this.form.invalid || !(this.uploadImages.length > 0)) {
      return;
    }
  
    this.loading = true;
  
    const category = this.form.value.category;
    console.log(category)
    const images = new FormData();
    images.append("category", category);
    for(let i = 0; i < this.uploadImages.length; i++) {
      images.append("image", this.uploadImages[i], category+i);
    }
    
    this.galleryService.addImages(images)
    .subscribe((responce: any) => {
      this.imagePreview = [];
      this.uploadImages = [];
      this.form.reset();
      this.cancel();
    },
    (error: any) => {
      this.setError(error);
    });
  }

  cancelImage(index: number) {
    this.imagePreview.splice(index, 1);
    this.uploadImages.splice(index, 1);
  }

  cancel() {
    this.loading = true;
    this.router.navigate(['/admin', 'gallery'], {relativeTo: this.route, skipLocationChange: true});
  }

  setError(err: string) {
		this.error = err;
		this.loading = false;
	}

	clearError() {
		this.error = null;
	}
}
