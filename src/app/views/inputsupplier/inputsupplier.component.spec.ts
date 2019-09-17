import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed
} from '@angular/core/testing';

import { InputsupplierComponent } from './inputsupplier.component';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { UnderdevelopmentComponent } from 'src/app/components/underdevelopment/underdevelopment.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';

describe('InputsupplierComponent', () => {
  let component: InputsupplierComponent;
  let fixture: ComponentFixture<InputsupplierComponent>;
  let authService: AuthenticationService;
  const formBuilder: FormBuilder = new FormBuilder();
  let authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);
  let injector: TestBed;
  authMock.getCurrentUserValue.and.returnValue({ user: '' });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InputsupplierComponent,
        NavigationComponent,
        UnderdevelopmentComponent,
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: FormBuilder,
          useValue: formBuilder
        },
        { provide: AuthenticationService, useValue: authMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(InputsupplierComponent);
    component = fixture.componentInstance;
    injector = getTestBed();
    authService = injector.get(AuthenticationService);
  }));

  it('should create input supplier component', () => {
    expect(component).toBeTruthy();
  });
});
