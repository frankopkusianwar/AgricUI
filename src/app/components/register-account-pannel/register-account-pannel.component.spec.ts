import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed
} from '@angular/core/testing';
import { NavigationComponent } from '../navigation/navigation.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterAccountPannelComponent } from './register-account-pannel.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RequestsService } from '../../_shared/services/requests.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { of, throwError } from 'rxjs';
import { requestMock } from 'src/app/_shared/tests/spies.spec';

describe('RegisterAccountPannelComponent', () => {
  let component: RegisterAccountPannelComponent;
  let fixture: ComponentFixture<RegisterAccountPannelComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let requestService: RequestsService;
  let injector: TestBed;

  let authService: AuthenticationService;
  let authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);

  authMock.getCurrentUserValue.and.returnValue({ user: '' });

  requestMock.post.and.returnValue(of({ success: '' }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterAccountPannelComponent, NavigationComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        {
          provide: FormBuilder,
          useValue: formBuilder
        },
        { provide: AuthenticationService, useValue: authMock },
        { provide: RequestsService, useValue: requestMock }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(RegisterAccountPannelComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    requestService = TestBed.get(RequestsService);
    injector = getTestBed();
    authService = injector.get(AuthenticationService);
  }));

  afterAll(() => {
    TestBed.resetTestingModule();
  });
  beforeAll(() => {
    requestMock.post.calls.reset();
  });

  afterEach(() => {
    requestMock.post.calls.reset();
  });
  it('should create admin register panel', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.Form.valid).toBeFalsy();
  });
  it('email field validity', () => {
    let email = component.Form.controls['email'];
    expect(email.valid).toBeFalsy();
  });
  it('email field validity', () => {
    let errors = {};
    let email = component.Form.controls['email'];
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('should successfully submit form if it is valid', () => {
    expect(component.Form.valid).toBeFalsy();
    component.Form.controls['email'].setValue('test@test.com');
    component.Form.controls['password'].setValue('123456789');
    component.Form.controls['address'].setValue('somewhere');
    component.Form.controls['value_chain'].setValue('Crop');
    component.Form.controls['district'].setValue('Agago');
    component.Form.controls['account_name'].setValue('name');
    component.Form.controls['username'].setValue('name');
    component.Form.controls['phone_number'].setValue('12434354356');
    component.Form.controls['contact_person'].setValue('Samuel');
    component.Form.controls['account_type'].setValue('Custom');

    expect(component.Form.valid).toBeTruthy();

    component.handleSubmit(component.Form);

    expect(component.submitted).toBe(true);
  });

  it('should return error if form is invalid', () => {
    expect(component.Form.valid).toBeFalsy();
    component.Form.controls['email'].setValue('');
    component.Form.controls['password'].setValue('123456789');
    component.Form.controls['address'].setValue('somewhere');
    component.Form.controls['value_chain'].setValue('Crop');
    component.Form.controls['district'].setValue('Agago');
    component.Form.controls['account_name'].setValue('name');
    component.Form.controls['username'].setValue('name');
    component.Form.controls['phone_number'].setValue('12434354356');
    component.Form.controls['contact_person'].setValue('Samuel');
    component.Form.controls['account_type'].setValue('Custom');

    expect(component.Form.valid).toBeFalsy();

    component.handleSubmit(component.Form);

    expect(component.submitted).toBe(true);
  });

  it('generate Password', () => {
    let btn = fixture.debugElement.query(By.css('.password_btn'));
    const password = fixture.debugElement.query(By.css('#password'))
      .nativeElement.innerText;

    btn.triggerEventHandler('click', null);
    fixture.detectChanges();
    spyOn(component, 'generatePassword');
    expect(password).toBe('');
  });

  it('should clear message', () => {
    let input = fixture.debugElement.query(By.css('input'));
    input.triggerEventHandler('keyup', null);
    fixture.detectChanges();
    spyOn(component, 'clearMessage');
    expect(component.error).toEqual('');
  });

  it('should return error if email exists', () => {
    requestMock.post.and.returnValue(
      throwError({ error: 'The email has already been taken.' })
    );
    expect(component.Form.valid).toBeFalsy();
    component.Form.controls['email'].setValue('admin2020@gmail.com');
    component.Form.controls['password'].setValue('123456789');
    component.Form.controls['address'].setValue('somewhere');
    component.Form.controls['value_chain'].setValue('Crop');
    component.Form.controls['district'].setValue('Agago');
    component.Form.controls['account_name'].setValue('name');
    component.Form.controls['username'].setValue('name');
    component.Form.controls['phone_number'].setValue('12434354356');
    component.Form.controls['contact_person'].setValue('Samuel');
    component.Form.controls['account_type'].setValue('Custom');
    component.handleSubmit(component.Form);
    expect(component.Form.valid).toBeTruthy();
    expect(component.submitted).toBe(true);
  });
});
