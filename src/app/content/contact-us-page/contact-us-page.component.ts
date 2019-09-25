import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us-page',
  templateUrl: './contact-us-page.component.html',
  styleUrls: ['./contact-us-page.component.css']
})
export class ContactUsPageComponent implements OnInit {

  contactDetailsJson ={"phone":"9876543210","email":"dancingSoul@gmail.com","address":"kasarvadavali,Thane"};

  yourName = "your name";
 yourEmail = "your e-mail"
  yourMessage = "message"
  latitude = -28.68352;
  longitude = -147.20785;
  mapType = 'satellite';

 userName = this.yourName;
  emailId = this.yourEmail;
  message = this.yourMessage;
  
  clearText(event){
    if(this.yourName === event.srcElement.innerHTML){
      this.userName = "";
    }
    if(this.yourEmail === event.srcElement.innerHTML){
      this.emailId = "";
    }  
    if(this.yourMessage === event.srcElement.innerHTML){
      this.message = "";
    }    
  }
  checkIfEmpty(event,inputName){
    console.log(this.userName);
    if(inputName==="userName" && event.srcElement.innerHTML === ""){
      this.userName = this.yourName;
    }
    if(inputName==="emailId" && event.srcElement.innerHTML === ""){
      this.emailId = this.yourEmail;
    }  
    if(inputName==="message" && event.srcElement.innerHTML === ""){
      this.message = this.yourMessage;
    }    
  }

  reset(){
    this.userName = this.yourName;
    this.emailId = this.yourEmail;
    this.message = this.yourMessage;
  }

  formSubmit(){
    this.reset();
  }

  constructor() { }

  ngOnInit() { 
  }
}