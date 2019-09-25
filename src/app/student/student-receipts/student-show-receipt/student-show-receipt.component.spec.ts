import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentShowReceiptComponent } from './student-show-receipt.component';

describe('StudentShowReceiptComponent', () => {
  let component: StudentShowReceiptComponent;
  let fixture: ComponentFixture<StudentShowReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentShowReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentShowReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
