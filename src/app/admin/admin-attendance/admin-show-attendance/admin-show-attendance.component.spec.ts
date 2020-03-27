import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowAttendanceComponent } from './admin-show-attendance.component';

describe('AdminShowAttendanceComponent', () => {
  let component: AdminShowAttendanceComponent;
  let fixture: ComponentFixture<AdminShowAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminShowAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShowAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
