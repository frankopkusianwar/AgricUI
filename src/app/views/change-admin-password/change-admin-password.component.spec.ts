import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ChangeAdminPasswordComponent } from './change-admin-password.component';
import { AdminApiCallsService } from '../../_services/admin-api-calls.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrderModule } from 'ngx-order-pipe';
import { of, throwError } from 'rxjs';

describe('ChangeAdminPasswordComponent', () => {
  let component: ChangeAdminPasswordComponent;
  let fixture: ComponentFixture<ChangeAdminPasswordComponent>;
  let service;
  let authService: AuthenticationService;
  let adminApiCallsService: AdminApiCallsService;

  const formBuilder: FormBuilder = new FormBuilder();
  const authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);
  let injector: TestBed;
  authMock.getCurrentUserValue.and.returnValue({ user: '' });

  function setup() {
    fixture = TestBed.createComponent(ChangeAdminPasswordComponent);
    const app = fixture.debugElement.componentInstance;
    component = fixture.componentInstance;
    adminApiCallsService = fixture.debugElement.injector.get(
      AdminApiCallsService
    );
    return { fixture, app, component };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeAdminPasswordComponent, NavigationComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        OrderModule
      ],
      providers: [
        {
          provide: FormBuilder,
          useValue: formBuilder
        },
        AdminApiCallsService,
        { provide: AuthenticationService, useValue: authMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    service = TestBed.get(AdminApiCallsService);
    service.token = 'testToken';
    injector = getTestBed();
    authService = injector.get(AuthenticationService);
    const {app, fixture, component} = setup();
  }));


  it('should create the Admin change password component', () => {
    const { app } = setup();
    expect(app).toBeTruthy();
  });
  it('should check if password match form ', () => {
    component.changeAdminPassword.controls['confirmPassword'].setValue('dch^sahghs7');
    component.changeAdminPassword.controls['newPassword'].setValue('dch^sahghs7');
    component.changeAdminPassword.controls['oldPassword'].setValue('old-pass2');
    component.confirmPassword();
    component.onSubmit();
    component.passwordMatch();
    expect(component.password).toEqual( { oldPassword: 'old-pass2', newPassword: 'dch^sahghs7' } );
  });


  it('should check if password does not match ', () => {
    component.changeAdminPassword.controls['confirmPassword'].setValue('dch^sahghs7');
    component.changeAdminPassword.controls['oldPassword'].setValue('old-pass2');
    component.changeAdminPassword.controls['newPassword'].setValue('6dch^sahghsya7');
    component.passwordMatch();
    expect(component.password).toBeUndefined();
  });

  it('should simulate form submit with success response', () => {
    const spy = spyOn(adminApiCallsService, 'postData').and.returnValue(
      of({})
    );
    component.loading = true;
    component.onSubmit();
    fixture.detectChanges();
    expect(component.loading).toEqual(false);
    expect(spy.calls.any()).toEqual(true);
  });

  it('should simulate form submit  with error response', () => {
    const spy = spyOn(adminApiCallsService, 'postData').and.returnValue(
      throwError({ error: true})
    );
    component.onSubmit();
    fixture.detectChanges();
    expect(spy.calls.any()).toEqual(true);
  });

  it('should render navbar', () => {
    const { fixture } = setup();
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const landingheader = compile.querySelector('.navbar');
    expect(landingheader).toBeTruthy();
  });
});
