import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditAimComponent } from './admin-edit-aim.component';

describe('AdminEditAimComponent', () => {
  let component: AdminEditAimComponent;
  let fixture: ComponentFixture<AdminEditAimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditAimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditAimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
