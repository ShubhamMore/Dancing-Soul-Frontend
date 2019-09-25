import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddFacultyComponent } from './admin-add-faculty.component';

describe('AdminAddFacultyComponent', () => {
  let component: AdminAddFacultyComponent;
  let fixture: ComponentFixture<AdminAddFacultyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddFacultyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
