import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEnquiryComponent } from './admin-enquiry.component';

describe('AdminEnquiryComponent', () => {
  let component: AdminEnquiryComponent;
  let fixture: ComponentFixture<AdminEnquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEnquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});