import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddPhotosComponent } from './admin-add-photos.component';

describe('AdminAddPhotosComponent', () => {
  let component: AdminAddPhotosComponent;
  let fixture: ComponentFixture<AdminAddPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
