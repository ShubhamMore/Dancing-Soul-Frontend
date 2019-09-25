import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsShelterPageComponent } from './news-shelter-page.component';

describe('NewsShelterPageComponent', () => {
  let component: NewsShelterPageComponent;
  let fixture: ComponentFixture<NewsShelterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsShelterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsShelterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
