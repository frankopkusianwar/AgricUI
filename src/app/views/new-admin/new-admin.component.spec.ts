import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed
} from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NewAdminComponent } from './new-admin.component';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RequestsService } from '../../_shared/services/requests.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { requestMock } from 'src/app/_shared/tests/spies.spec';

describe('NewAdminComponent', () => {
  let component: NewAdminComponent;
  let fixture: ComponentFixture<NewAdminComponent>;
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
      declarations: [NewAdminComponent, NavigationComponent],
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
    fixture = TestBed.createComponent(NewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  afterAll(() => {
    TestBed.resetTestingModule();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(NewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeAll(() => {
    requestMock.post.calls.reset();
  });

  afterEach(() => {
    requestMock.post.calls.reset();
  });

  it('should create  NewAdminComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should clear message', () => {
    let input = fixture.debugElement.query(By.css('input'));

    input.triggerEventHandler('keyup', null);
    fixture.detectChanges();
    spyOn(component, 'clearMessage');
    expect(component.errors).toEqual('');
  });
  it('should submit form if it is valid', () => {
    expect(component.adminForm.valid).toBeFalsy();
    component.adminForm.controls['email'].setValue('test@test.com');
    component.adminForm.controls['password'].setValue('123456789');
    component.adminForm.controls['confirmPassword'].setValue('123456789');
    component.adminForm.controls['firstname'].setValue('name');
    component.adminForm.controls['lastname'].setValue('name');
    component.adminForm.controls['adminRole'].setValue('Analyst');

    expect(component.adminForm.valid).toBeTruthy();

    component.handleSubmit();

    expect(component.submitted).toBe(true);
  });

  it('should return error if form is invalid', () => {
    expect(component.adminForm.valid).toBeFalsy();
    component.adminForm.controls['email'].setValue('');
    component.adminForm.controls['password'].setValue('123456789');
    component.adminForm.controls['confirmPassword'].setValue('123456789');
    component.adminForm.controls['firstname'].setValue('name');
    component.adminForm.controls['lastname'].setValue('name');
    component.adminForm.controls['adminRole'].setValue('Analyst');

    expect(component.adminForm.valid).toBeFalsy();
    fixture.detectChanges();
    component.handleSubmit();

    expect(component.submitted).toBe(true);
  });

  it('submitting a form returns password mismatch error', () => {
    expect(component.adminForm.valid).toBeFalsy();
    component.adminForm.controls['email'].setValue('test@test.com');
    component.adminForm.controls['password'].setValue('123456789');
    component.adminForm.controls['confirmPassword'].setValue('1234567');
    component.adminForm.controls['firstname'].setValue('name');
    component.adminForm.controls['lastname'].setValue('name');
    component.adminForm.controls['adminRole'].setValue('Analyst');

    component.handleSubmit();
    expect(component.isConfirmed).toBeFalsy();
  });

  it('form should return email exist error', () => {
    requestMock.post.and.returnValue(
      throwError({ error: 'The email has already been taken.' })
    );
    expect(component.adminForm.valid).toBeFalsy();
    component.adminForm.controls['email'].setValue('admin2020@gmail.com');
    component.adminForm.controls['password'].setValue('123456789');
    component.adminForm.controls['confirmPassword'].setValue('123456789');
    component.adminForm.controls['firstname'].setValue('name');
    component.adminForm.controls['lastname'].setValue('name');
    component.adminForm.controls['adminRole'].setValue('Analyst');

    component.handleSubmit();
    fixture.detectChanges();
    expect(component.adminForm.valid).toBeTruthy();
  });
  it('register new Admin', () => {
    component.adminForm.controls['email'].setValue('test@test.com');
    component.adminForm.controls['password'].setValue('123456789');
    component.adminForm.controls['confirmPassword'].setValue('123456789');
    component.adminForm.controls['firstname'].setValue('name');
    component.adminForm.controls['lastname'].setValue('name');
    component.adminForm.controls['adminRole'].setValue('Analyst');
    requestMock.post.and.returnValue(of(component.adminForm));
    component.registerAdmin(component.adminForm);
  });
});
