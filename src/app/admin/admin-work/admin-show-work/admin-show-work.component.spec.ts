import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowWorkComponent } from './admin-show-work.component';

describe('AdminShowWorkComponent', () => {
  let component: AdminShowWorkComponent;
  let fixture: ComponentFixture<AdminShowWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminShowWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShowWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
