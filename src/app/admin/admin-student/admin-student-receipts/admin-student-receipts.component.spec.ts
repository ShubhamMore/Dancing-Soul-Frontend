import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentReceiptsComponent } from './admin-student-receipts.component';

describe('AdminStudentReceiptsComponent', () => {
  let component: AdminStudentReceiptsComponent;
  let fixture: ComponentFixture<AdminStudentReceiptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStudentReceiptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
