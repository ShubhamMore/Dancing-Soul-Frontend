import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ContactModel } from '../../models/contact.module';

@Component({
  selector: 'app-admin-contact',
  templateUrl: './admin-contact.component.html',
  styleUrls: ['./admin-contact.component.css']
})
export class AdminContactComponent implements OnInit {
  form: FormGroup;
  contact: ContactModel;
  loading: boolean;
  error: string;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.loading = true;
    this.form = new FormGroup({
      address: new FormControl(null, {
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      phone: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.contactService.getContact().subscribe(
      (responce: any) => {
        this.contact = responce;
        if (this.contact) {
          this.form.patchValue({
            address: this.contact.address,
            email: this.contact.email,
            phone: this.contact.phone
          });
        }
        this.loading = false;
      },
      (error: any) => {
        this.setError(error);
      }
    );
  }

  saveContact() {
    if (this.form.valid) {
      this.loading = true;
      const contact: any = {
        address: this.form.value.address,
        email: this.form.value.email,
        phone: this.form.value.phone
      };

      if (this.contact) {
        contact._id = this.contact._id;
      }

      this.contactService.saveContact(contact).subscribe(
        (responce: any) => {
          this.contact = contact;
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
