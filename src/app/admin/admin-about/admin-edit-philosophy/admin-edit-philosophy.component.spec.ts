import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditPhilosophyComponent } from './admin-edit-philosophy.component';

describe('AdminEditPhilosophyComponent', () => {
  let component: AdminEditPhilosophyComponent;
  let fixture: ComponentFixture<AdminEditPhilosophyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditPhilosophyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditPhilosophyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
