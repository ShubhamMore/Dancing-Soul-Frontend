import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowFacultyComponent } from './admin-show-faculty.component';

describe('AdminShowFacultyComponent', () => {
  let component: AdminShowFacultyComponent;
  let fixture: ComponentFixture<AdminShowFacultyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminShowFacultyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShowFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
