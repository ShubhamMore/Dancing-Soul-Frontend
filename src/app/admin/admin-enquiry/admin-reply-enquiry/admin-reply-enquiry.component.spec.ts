import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReplyEnquiryComponent } from './admin-reply-enquiry.component';

describe('AdminReplyEnquiryComponent', () => {
  let component: AdminReplyEnquiryComponent;
  let fixture: ComponentFixture<AdminReplyEnquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReplyEnquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReplyEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
