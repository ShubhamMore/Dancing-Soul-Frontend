import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExamCertificateComponent } from './student-exam-certificate.component';

describe('StudentExamCertificateComponent', () => {
  let component: StudentExamCertificateComponent;
  let fixture: ComponentFixture<StudentExamCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentExamCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentExamCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
