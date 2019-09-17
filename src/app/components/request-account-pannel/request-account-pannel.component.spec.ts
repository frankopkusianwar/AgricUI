import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RequestAccountPannelComponent } from './request-account-pannel.component';
import { LandingHeaderComponent } from '../landing-header/landing-header.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { RequestsService } from 'src/app/_shared/services/requests.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { requestMock } from 'src/app/_shared/tests/spies.spec';

describe('RequestAccountPannelComponent', () => {
  let component: RequestAccountPannelComponent;
  let fixture: ComponentFixture<RequestAccountPannelComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let requestService: RequestsService;

  requestMock.post.and.returnValue(of({ success: '' }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequestAccountPannelComponent, LandingHeaderComponent],
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
        { provide: RequestsService, useValue: requestMock }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(RequestAccountPannelComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  }));

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

  it('should submit form if all fields are filled', () => {
    expect(component.Form.valid).toBeFalsy();
    component.Form.controls['email'].setValue('test@test.com');
    component.Form.controls['address'].setValue('andela');
    component.Form.controls['firstname'].setValue('name');
    component.Form.controls['lastname'].setValue('name');
    component.Form.controls['phonenumber'].setValue('123456789578');

    expect(component.Form.valid).toBeTruthy();

    component.handleSubmit(component.Form);

    expect(component.submitted).toBe(true);
  });

  it('should return an error if some input fields are empty or invalid', () => {
    expect(component.Form.valid).toBeFalsy();
    component.Form.controls['email'].setValue('');
    component.Form.controls['address'].setValue('andela');
    component.Form.controls['firstname'].setValue('name');
    component.Form.controls['lastname'].setValue('name');
    component.Form.controls['phonenumber'].setValue('123456789578');

    expect(component.Form.valid).toBeFalsy();

    component.handleSubmit(component.Form);

    expect(component.submitted).toBe(true);
  });

  it('should return an error if email exists', () => {
    requestMock.post.and.returnValue(
      throwError({ error: 'The email has already been taken.' })
    );

    expect(component.Form.valid).toBeFalsy();
    component.Form.controls['email'].setValue('admin2020@gmail.com');
    component.Form.controls['address'].setValue('andela');
    component.Form.controls['firstname'].setValue('name');
    component.Form.controls['lastname'].setValue('name');
    component.Form.controls['phonenumber'].setValue('123456789578');

    expect(component.Form.valid).toBeTruthy();

    component.handleSubmit(component.Form);

    expect(component.submitted).toBe(true);
  });

  it('should clear message', () => {
    let input = fixture.debugElement.query(By.css('input'));

    input.triggerEventHandler('keyup', null);
    fixture.detectChanges();
    spyOn(component, 'clearMessage');
    expect(component.error).toEqual('');
  });
});
