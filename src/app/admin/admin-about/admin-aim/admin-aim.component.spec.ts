import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAimComponent } from './admin-aim.component';

describe('AdminAimComponent', () => {
  let component: AdminAimComponent;
  let fixture: ComponentFixture<AdminAimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAimComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
