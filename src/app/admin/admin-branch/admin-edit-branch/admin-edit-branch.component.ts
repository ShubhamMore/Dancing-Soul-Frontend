import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BranchModel, BatchModel } from '../../../models/branch.model';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { FormValidator } from '../../../validators/form.validator';
import { BranchService } from '../../../services/branch.service';

@Component({
  selector: 'app-admin-edit-branch',
  templateUrl: './admin-edit-branch.component.html',
  styleUrls: ['./admin-edit-branch.component.css']
})
export class AdminEditBranchComponent implements OnInit {
  branch: BranchModel;

  form: FormGroup;

  batchForm: FormGroup;

  imagePreview: string[];
  uploadImages: File[];

  invalidImage: boolean;

  loading: boolean;

  error: string;

  week: string[];

  weekDays: number[];

  batches: any[];

  weekdaysTouched: boolean;

  formError: string;

  weekType: string;

  editBatchIndex: number;
  editingBatch: boolean;

  images: string;

  imgExt: string[];

  constructor(
    private branchService: BranchService,
    private formValidator: FormValidator,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.imagePreview = [];
    this.uploadImages = [];
    this.invalidImage = false;
    this.week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.weekDays = [];
    this.batches = [];
    this.weekdaysTouched = false;
    this.weekType = '0';
    this.editingBatch = false;
    this.imgExt = ['jpg', 'png'];

    this.form = new FormGroup({
      city: new FormControl(null, {
        validators: [Validators.required]
      }),
      branch: new FormControl(null, {
        validators: [Validators.required]
      }),
      address: new FormControl(null, {
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        validators: [Validators.email]
      }),
      phone: new FormControl(null, {
        validators: []
      }),
      description: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.batchForm = new FormGroup({
      week: new FormControl(this.weekType, {
        validators: [Validators.required]
      }),
      batchName: new FormControl(null, {
        validators: [Validators.required]
      }),
      fees: new FormControl(null, {
        validators: [Validators.required]
      }),
      start_timming: new FormControl(null, {
        validators: [Validators.required]
      }),
      end_timming: new FormControl(null, {
        validators: [Validators.required]
      }),
      weekDays: new FormArray(
        this.week.map(() => new FormControl(null)),
        {
          validators: [this.formValidator.daysValidator.bind(this)]
        }
      )
    });

    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      const id = params['id'];
      this.branchService.getBranch(id).subscribe(
        (responce: BranchModel) => {
          this.branch = responce;
          this.batches = this.branch.batch;
          this.form.patchValue({
            city: this.branch.city,
            branch: this.branch.branch,
            address: this.branch.address,
            email: this.branch.email,
            phone: this.branch.phone,
            description: this.branch.description,
            image: null
          });
          this.loading = false;
        },
        (error: any) => {
          this.setError(error);
        }
      );
    });
  }

  onImagePicked(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    const imgExt: string[] = ['jpg', 'png'];
    let ext: string = null;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
      ext = files[i].name.substring(files[i].name.lastIndexOf('.') + 1).toLowerCase();
      if (!(imgExt.indexOf(ext) !== -1)) {
        return (this.invalidImage = true);
      }
    }
    this.invalidImage = false;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
      this.uploadImages.push(files[i]);
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview.push(reader.result as string);
      };
      reader.readAsDataURL(files[i]);
    }
    this.form.patchValue({ image: null });
  }

  cancelImage(index: number) {
    this.imagePreview.splice(index, 1);
    this.uploadImages.splice(index, 1);
  }

  addBatch() {
    if (this.batchForm.valid) {
      this.formError = null;

      const days: string[] = [];
      const week: number[] = this.weekDays.sort();
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < week.length; i++) {
        days.push(this.week[week[i]]);
      }

      const batch = {
        batchType: this.weekType,
        days: days.join(', '),
        batchName: this.batchForm.value.batchName,
        time: this.batchForm.value.start_timming + '-' + this.batchForm.value.end_timming,
        fees: this.batchForm.value.fees
      };
      this.batches.push(batch);
      this.weekDays = [];
      this.batchForm.reset({ week: this.weekType });
      this.weekdaysTouched = false;
    }
  }

  editBatch(i: number) {
    this.editBatchIndex = i;
    this.editingBatch = true;
    const batch: any = this.batches[i];
    const weekDays = [null, null, null, null, null, null, null];
    batch.days.split(',').forEach((day: string) => {
      const j: number = this.week.indexOf(day.trim());
      weekDays[j] = 'checked';
      this.weekDays.push(j);
    });
    this.batchForm.patchValue({ weekDays });

    this.batchForm.patchValue({
      week: batch.batchType,
      batchName: batch.batchName,
      fees: batch.fees,
      start_timming: batch.time.split('-')[0].trim(),
      end_timming: batch.time.split('-')[1].trim()
    });
  }

  saveEditBatch() {
    if (this.batchForm.valid) {
      this.formError = null;
      const days: string[] = [];
      const week: number[] = this.weekDays.sort();
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < week.length; i++) {
        days.push(this.week[week[i]]);
      }

      const batch: BatchModel = {
        _id: this.batches[this.editBatchIndex]._id,
        batchType: this.weekType,
        days: days.join(', '),
        batchName: this.batchForm.value.batchName,
        time: this.batchForm.value.start_timming + ' - ' + this.batchForm.value.end_timming,
        fees: this.batchForm.value.fees
      };

      this.batches[this.editBatchIndex] = batch;
      this.cancelEditBatch();
    }
  }

  cancelEditBatch() {
    this.editBatchIndex = null;
    this.editingBatch = false;
    this.weekDays = [];
    this.batchForm.reset({ week: this.weekType });
    this.weekdaysTouched = false;
  }

  deleteBatch(i: number) {
    const confirmDelete: any = confirm('do you really want to Delete this Batch??');
    if (confirmDelete) {
      this.batches.splice(i, 1);
    }
  }

  editAddress() {
    if (this.form.invalid) {
      return (this.formError = '*Please Fill All Fields of Branch');
    }

    if (this.batches.length === 0) {
      return (this.formError = '*Please Add Batches');
    }

    if (this.form.valid) {
      this.loading = true;
      this.formError = null;

      const editedBranch = new FormData();
      editedBranch.append('_id', this.branch._id);
      editedBranch.append('city', this.form.value.city);
      editedBranch.append('branch', this.form.value.branch);
      editedBranch.append('address', this.form.value.address);
      editedBranch.append('email', this.form.value.email);
      editedBranch.append('phone', this.form.value.phone);
      editedBranch.append('description', this.form.value.description);
      editedBranch.append('batch', JSON.stringify(this.batches));
      editedBranch.append('status', this.branch.status);

      if (this.uploadImages.length > 0) {
        for (let i = 0; i < this.uploadImages.length; i++) {
          editedBranch.append('image', this.uploadImages[i], 'branch' + i);
        }
      }

      this.branchService.editBrnach(editedBranch).subscribe(
        (responce: any) => {
          this.form.reset();
          this.cancel();
        },
        (error: any) => {
          this.setError(error);
        }
      );
    }
  }

  cancel() {
    this.loading = true;
    this.imagePreview = [];
    this.uploadImages = [];
    this.invalidImage = false;
    this.router.navigate(['/admin', 'branch', this.branch._id], {
      relativeTo: this.route,
      skipLocationChange: true
    });
  }

  scheduleChange() {
    this.weekType = this.batchForm.value.week;
  }

  weekDay(event: any, index: number) {
    this.weekdaysTouched = true;

    if (event.target.checked) {
      return this.weekDays.push(index);
    }
    this.weekDays.splice(
      this.weekDays.findIndex(day => day === index),
      1
    );
  }

  isWeekType(weekType: string): boolean {
    const n = this.batches.length;
    for (let i = 0; i < n; i++) {
      if (this.batches[i].batchType === weekType) {
        return true;
      }
    }
    return false;
  }

  setError(err: string) {
    this.error = err;
    this.loading = false;
  }

  clearError() {
    this.error = null;
  }
}
