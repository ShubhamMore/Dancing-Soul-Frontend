import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentShowProgressComponent } from './admin-student-show-progress.component';

describe('AdminStudentShowProgressComponent', () => {
  let component: AdminStudentShowProgressComponent;
  let fixture: ComponentFixture<AdminStudentShowProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminStudentShowProgressComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentShowProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
