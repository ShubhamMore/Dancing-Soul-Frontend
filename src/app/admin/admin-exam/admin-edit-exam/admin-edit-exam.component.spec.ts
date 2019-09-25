import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditExamComponent } from './admin-edit-exam.component';

describe('AdminEditExamComponent', () => {
  let component: AdminEditExamComponent;
  let fixture: ComponentFixture<AdminEditExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
