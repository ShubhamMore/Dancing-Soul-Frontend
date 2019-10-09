import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddVideosComponent } from './admin-add-videos.component';

describe('AdminAddVideosComponent', () => {
  let component: AdminAddVideosComponent;
  let fixture: ComponentFixture<AdminAddVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
