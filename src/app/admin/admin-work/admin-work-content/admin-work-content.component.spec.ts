import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWorkContentComponent } from './admin-work-content.component';

describe('AdminWorkContentComponent', () => {
  let component: AdminWorkContentComponent;
  let fixture: ComponentFixture<AdminWorkContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminWorkContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWorkContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
