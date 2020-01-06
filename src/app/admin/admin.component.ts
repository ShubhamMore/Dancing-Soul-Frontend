import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor() {}

  sidenav: boolean;

  ngOnInit() {
    this.sidenav = false;
  }

  toggle() {
    this.sidenav = !this.sidenav;
  }
}
