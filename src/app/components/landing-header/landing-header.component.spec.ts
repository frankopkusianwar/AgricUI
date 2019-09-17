import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingHeaderComponent } from './landing-header.component';

describe('LandingHeaderComponent', () => {
  let component: LandingHeaderComponent;
  let fixture: ComponentFixture<LandingHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LandingHeaderComponent]
    }).compileComponents();
  }));
  afterAll(() => {
    TestBed.resetTestingModule();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the navigation component', () => {
    expect(component).toBeTruthy();
  });
});
