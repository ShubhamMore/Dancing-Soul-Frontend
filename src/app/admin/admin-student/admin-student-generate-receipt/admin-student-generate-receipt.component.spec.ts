import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentGenerateReceiptComponent } from './admin-student-generate-receipt.component';

describe('AdminStudentGenerateReceiptComponent', () => {
  let component: AdminStudentGenerateReceiptComponent;
  let fixture: ComponentFixture<AdminStudentGenerateReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStudentGenerateReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentGenerateReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
