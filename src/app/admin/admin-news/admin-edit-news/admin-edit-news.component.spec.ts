import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditNewsComponent } from './admin-edit-news.component';

describe('AdminEditNewsComponent', () => {
  let component: AdminEditNewsComponent;
  let fixture: ComponentFixture<AdminEditNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
