import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddBranchComponent } from './admin-add-branch.component';

describe('AdminAddBranchComponent', () => {
  let component: AdminAddBranchComponent;
  let fixture: ComponentFixture<AdminAddBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
