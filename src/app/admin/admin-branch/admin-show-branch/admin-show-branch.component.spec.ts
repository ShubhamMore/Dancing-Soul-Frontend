import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowBranchComponent } from './admin-show-branch.component';

describe('AdminShowBranchComponent', () => {
  let component: AdminShowBranchComponent;
  let fixture: ComponentFixture<AdminShowBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminShowBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShowBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
