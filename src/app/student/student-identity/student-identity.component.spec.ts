import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentIdentityComponent } from './student-identity.component';

describe('StudentIdentityComponent', () => {
  let component: StudentIdentityComponent;
  let fixture: ComponentFixture<StudentIdentityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentIdentityComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
