import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditBranchComponent } from './admin-edit-branch.component';

describe('AdminEditBranchComponent', () => {
  let component: AdminEditBranchComponent;
  let fixture: ComponentFixture<AdminEditBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
