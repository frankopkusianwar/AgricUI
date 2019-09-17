import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPageComponent } from './about-page.component';
import { LandingHeaderComponent } from '../../components/landing-header/landing-header.component';

describe('AboutPageComponent', () => {
  let component: AboutPageComponent;
  let fixture: ComponentFixture<AboutPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboutPageComponent, LandingHeaderComponent]
    }).compileComponents();
  }));

  function setup() {
    const fixture = TestBed.createComponent(AboutPageComponent);
    const app = fixture.debugElement.componentInstance;
    component = fixture.componentInstance;
    return { fixture, app, component };
  }
  it('should create the about component', () => {
    const { app } = setup();
    expect(app).toBeTruthy();
  });
  it('should render header component ', () => {
    const { fixture } = setup();
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const landingheader = compile.querySelector('app-landing-header');
    expect(landingheader).toBeTruthy();
  });
});
