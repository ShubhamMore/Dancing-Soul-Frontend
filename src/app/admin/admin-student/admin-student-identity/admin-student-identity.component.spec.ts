import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentIdentityComponent } from './admin-student-identity.component';

describe('AdminStudentIdentityComponent', () => {
  let component: AdminStudentIdentityComponent;
  let fixture: ComponentFixture<AdminStudentIdentityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminStudentIdentityComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
