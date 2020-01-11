import { Component, OnInit } from '@angular/core';
import { EnquiryService } from '../../services/enquiry.service';
import { ContactService } from '../../services/contact.service';
import { ContactModel } from '../../models/contact.module';

@Component({
  selector: 'app-contact-us-page',
  templateUrl: './contact-us-page.component.html',
  styleUrls: ['./contact-us-page.component.css']
})
export class ContactUsPageComponent implements OnInit {
  contactDetailsJson: ContactModel;

  yourName = 'your name';
  yourPhone = 'your phone';
  yourEmail = 'your e-mail';
  yourMessage = 'message';

  latitude = -28.68352;
  longitude = -147.20785;
  mapType = 'satellite';

  userName = this.yourName;
  emailId = this.yourEmail;
  message = this.yourMessage;
  contact = this.yourPhone;

  loading: boolean;

  constructor(private enquiryService: EnquiryService, private contactService: ContactService) {}

  ngOnInit() {
    this.loading = true;
    this.contactService.getContact().subscribe(
      (resData: any) => {
        this.contactDetailsJson = resData;
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
      }
    );
  }

  inputUserName(userName: string) {
    this.userName = userName;
  }

  inputEmailId(emailId: string) {
    this.emailId = emailId;
  }

  inputMessage(message: string) {
    this.message = message;
  }

  inputContact(contact: string) {
    this.contact = contact;
  }

  clearText(event) {
    if (this.yourName === event.srcElement.innerHTML) {
      this.userName = '';
    }
    if (this.yourPhone === event.srcElement.innerHTML) {
      this.contact = '';
    }
    if (this.yourEmail === event.srcElement.innerHTML) {
      this.emailId = '';
    }
    if (this.yourMessage === event.srcElement.innerHTML) {
      this.message = '';
    }
  }

  checkIfEmpty(event: any, inputName: string) {
    console.log(this.userName);
    if (inputName === 'userName' && event.srcElement.innerHTML === '') {
      this.userName = this.yourName;
    }
    if (inputName === 'contact' && event.srcElement.innerHTML === '') {
      this.contact = this.yourPhone;
    }
    if (inputName === 'emailId' && event.srcElement.innerHTML === '') {
      this.emailId = this.yourEmail;
    }
    if (inputName === 'message' && event.srcElement.innerHTML === '') {
      this.message = this.yourMessage;
    }
  }

  reset() {
    this.userName = this.yourName;
    this.contact = this.yourPhone;
    this.emailId = this.yourEmail;
    this.message = this.yourMessage;
  }

  formSubmit() {
    if (
      this.userName === this.yourName &&
      this.contact === this.yourPhone &&
      this.emailId === this.yourEmail &&
      this.message === this.yourMessage
    ) {
      return;
    }
    const sendEmailData = {
      name: this.userName,
      email: this.emailId,
      phone: this.contact,
      message: this.message,
      seen: '0'
    };

    this.enquiryService.sendEnquiry(sendEmailData).subscribe(
      (responce: any) => {},
      (error: any) => {}
    );
    this.reset();
  }
}
