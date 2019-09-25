import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPhilosophyComponent } from './admin-philosophy.component';

describe('AdminPhilosophyComponent', () => {
  let component: AdminPhilosophyComponent;
  let fixture: ComponentFixture<AdminPhilosophyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPhilosophyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPhilosophyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
