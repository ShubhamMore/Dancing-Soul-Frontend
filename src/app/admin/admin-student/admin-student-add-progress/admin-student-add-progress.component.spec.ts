import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentAddProgressComponent } from './admin-student-add-progress.component';

describe('AdminStudentAddProgressComponent', () => {
  let component: AdminStudentAddProgressComponent;
  let fixture: ComponentFixture<AdminStudentAddProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStudentAddProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentAddProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
