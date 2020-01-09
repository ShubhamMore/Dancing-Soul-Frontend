import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCareerContentComponent } from './admin-career-content.component';

describe('AdminCareerContentComponent', () => {
  let component: AdminCareerContentComponent;
  let fixture: ComponentFixture<AdminCareerContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCareerContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCareerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
