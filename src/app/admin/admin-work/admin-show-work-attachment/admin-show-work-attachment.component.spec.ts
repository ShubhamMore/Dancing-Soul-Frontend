import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowWorkAttachmentComponent } from './admin-show-work-attachment.component';

describe('AdminShowWorkAttachmentComponent', () => {
  let component: AdminShowWorkAttachmentComponent;
  let fixture: ComponentFixture<AdminShowWorkAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminShowWorkAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShowWorkAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
