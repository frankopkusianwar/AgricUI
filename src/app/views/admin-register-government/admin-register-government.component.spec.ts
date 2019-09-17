import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed
} from '@angular/core/testing';

import { AdminRegisterGovernmentComponent } from './admin-register-government.component';
import { RegisterAccountPannelComponent } from '../../components/register-account-pannel/register-account-pannel.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { testModules } from '../../_shared/tests/testModules';
import { AuthenticationService } from 'src/app/_services/authentication.service';

describe('AdminRegisterGovernmentComponent', () => {
  let component: AdminRegisterGovernmentComponent;
  let fixture: ComponentFixture<AdminRegisterGovernmentComponent>;
  let authService: AuthenticationService;
  let authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);
  let injector: TestBed;
  authMock.getCurrentUserValue.and.returnValue({ user: '' });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminRegisterGovernmentComponent,
        RegisterAccountPannelComponent,
        NavigationComponent
      ],
      imports: [...testModules],
      providers: [{ provide: AuthenticationService, useValue: authMock }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(AdminRegisterGovernmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
