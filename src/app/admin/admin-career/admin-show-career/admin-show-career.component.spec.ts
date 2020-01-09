import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowCareerComponent } from './admin-show-career.component';

describe('AdminShowCareerComponent', () => {
  let component: AdminShowCareerComponent;
  let fixture: ComponentFixture<AdminShowCareerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminShowCareerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShowCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
