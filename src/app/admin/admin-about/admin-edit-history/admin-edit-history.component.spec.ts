import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditHistoryComponent } from './admin-edit-history.component';

describe('AdminEditHistoryComponent', () => {
  let component: AdminEditHistoryComponent;
  let fixture: ComponentFixture<AdminEditHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
