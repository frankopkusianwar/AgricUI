import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPageComponent } from './register-page.component';
import { LandingHeaderComponent } from '../../components/landing-header/landing-header.component';

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPageComponent, LandingHeaderComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(RegisterPageComponent);
    component = fixture.componentInstance;
  }));

  it('should create register page component', () => {
    expect(component).toBeTruthy();
  });
});
