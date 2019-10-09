import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowVideosComponent } from './admin-show-videos.component';

describe('AdminShowVideosComponent', () => {
  let component: AdminShowVideosComponent;
  let fixture: ComponentFixture<AdminShowVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminShowVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShowVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
