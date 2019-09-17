import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { ForgotPasswordPageComponent } from './forgot-password-page.component';
import { LandingHeaderComponent } from '../../components/landing-header/landing-header.component';
import { WelcomeDetailsComponent } from '../../components/welcome-details/welcome-details.component';
import { RequestsService } from 'src/app/_shared/services/requests.service';

describe('ForgotPasswordPageComponent', () => {
  let component: ForgotPasswordPageComponent;
  let fixture: ComponentFixture<ForgotPasswordPageComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let requestService: RequestsService;
  const testData = { error: { message: 'sample forget password response' } };

  function setup() {
    const fixture = TestBed.createComponent(ForgotPasswordPageComponent);
    const app = fixture.debugElement.componentInstance;
    component = fixture.componentInstance;
    return { fixture, app, component };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ForgotPasswordPageComponent,
        LandingHeaderComponent,
        WelcomeDetailsComponent
      ],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        RequestsService,
        {
          provide: FormBuilder,
          useValue: formBuilder
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ForgotPasswordPageComponent);
    component = fixture.componentInstance;
    requestService = fixture.debugElement.injector.get(RequestsService);
  }));

  it('should simulate form submit with success response', () => {
    const spy = spyOn(requestService, 'post').and.returnValue(of(testData));
    component.loading = true;
    component.onSubmit();
    fixture.detectChanges();
    expect(component.loading).toEqual(false);
    expect(spy.calls.any()).toEqual(true);
  });

  it('should simulate form submit  with error response', () => {
    const spy = spyOn(requestService, 'post').and.returnValue(
      throwError(testData)
    );
    component.onSubmit();
    fixture.detectChanges();
    expect(spy.calls.any()).toEqual(true);
  });

  it('should reset form ', () => {
    component.resetForm();
    fixture.detectChanges();
    expect(component.loading).toEqual(true);
  });

  it('should create the forget-password component', () => {
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

  it('should render header welcome component ', () => {
    const { fixture } = setup();
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const welcomeComponent = compile.querySelector('app-welcome-details');
    expect(welcomeComponent).toBeTruthy();
  });
});
