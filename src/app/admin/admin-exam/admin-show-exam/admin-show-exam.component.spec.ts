import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowExamComponent } from './admin-show-exam.component';

describe('AdminShowExamComponent', () => {
  let component: AdminShowExamComponent;
  let fixture: ComponentFixture<AdminShowExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminShowExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShowExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
