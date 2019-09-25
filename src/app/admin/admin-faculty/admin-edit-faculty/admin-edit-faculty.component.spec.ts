import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditFacultyComponent } from './admin-edit-faculty.component';

describe('AdminEditFacultyComponent', () => {
  let component: AdminEditFacultyComponent;
  let fixture: ComponentFixture<AdminEditFacultyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditFacultyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
