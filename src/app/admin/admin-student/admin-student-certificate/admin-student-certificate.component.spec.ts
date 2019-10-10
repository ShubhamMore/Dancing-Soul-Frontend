import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentCertificateComponent } from './admin-student-certificate.component';

describe('AdminStudentCertificateComponent', () => {
  let component: AdminStudentCertificateComponent;
  let fixture: ComponentFixture<AdminStudentCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStudentCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
