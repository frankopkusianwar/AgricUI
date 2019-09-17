import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { ConfirmPasswordPageComponent } from './confirm-password-page.component';
import { LandingHeaderComponent } from '../../components/landing-header/landing-header.component';
import { WelcomeDetailsComponent } from '../../components/welcome-details/welcome-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RequestsService } from 'src/app/_shared/services/requests.service';

describe('ConfirmPasswordPageComponent', () => {
  let component: ConfirmPasswordPageComponent;
  let fixture: ComponentFixture<ConfirmPasswordPageComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let requestService: RequestsService;

  const testData = { error: { message: 'sample confirm password response' } };

  function setup() {
    const fixture = TestBed.createComponent(ConfirmPasswordPageComponent);
    const app = fixture.debugElement.componentInstance;
    component = fixture.componentInstance;
    return { fixture, app, component };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfirmPasswordPageComponent,
        LandingHeaderComponent,
        WelcomeDetailsComponent
      ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        RequestsService,
        {
          provide: FormBuilder,
          useValue: formBuilder
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ConfirmPasswordPageComponent);
    component = fixture.componentInstance;
    requestService = fixture.debugElement.injector.get(RequestsService);
  }));

  it('should create the confirm-password component', () => {
    const { app } = setup();
    expect(app).toBeTruthy();
  });

  it('should reset form ', () => {
    component.resetForm();
    fixture.detectChanges();
    expect(component.loading).toEqual(true);
  });

  it('should render header component ', () => {
    const { fixture } = setup();
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const landingheader = compile.querySelector('app-landing-header');
    expect(landingheader).toBeTruthy();
  });

  it('should simulate verify token error', () => {
    const spy = spyOn(requestService, 'post').and.returnValue(
      throwError(testData)
    );
    component.token = 'fake-token';
    component.ngOnInit();
    fixture.detectChanges();
    expect(spy.calls.any()).toEqual(true);
  });

  it('should simulate form submit with success response', () => {
    const spy = spyOn(requestService, 'put').and.returnValue(of(testData));
    component.loading = true;
    component.onSubmit();
    fixture.detectChanges();
    expect(component.loading).toEqual(false);
    expect(spy.calls.any()).toEqual(true);
  });

  it('should simulate form submit  with error response', () => {
    const spy = spyOn(requestService, 'put').and.returnValue(
      throwError(testData)
    );
    component.onSubmit();
    fixture.detectChanges();
    expect(spy.calls.any()).toEqual(true);
  });

  it('should render header welcome component ', () => {
    const { fixture } = setup();
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const welcomeComponent = compile.querySelector('app-welcome-details');
    expect(welcomeComponent).toBeTruthy();
  });
});
