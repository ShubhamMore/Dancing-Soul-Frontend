import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowEnquiryComponent } from './admin-show-enquiry.component';

describe('AdminShowEnquiryComponent', () => {
  let component: AdminShowEnquiryComponent;
  let fixture: ComponentFixture<AdminShowEnquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminShowEnquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShowEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
