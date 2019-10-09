import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowPhotosComponent } from './admin-show-photos.component';

describe('AdminShowPhotosComponent', () => {
  let component: AdminShowPhotosComponent;
  let fixture: ComponentFixture<AdminShowPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminShowPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShowPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
