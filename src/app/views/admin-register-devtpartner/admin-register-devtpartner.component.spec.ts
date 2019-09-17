import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed
} from '@angular/core/testing';

import { AdminRegisterDevtpartnerComponent } from './admin-register-devtpartner.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { RegisterAccountPannelComponent } from 'src/app/components/register-account-pannel/register-account-pannel.component';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { testModules } from 'src/app/_shared/tests/testModules';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdminRegisterDevtpartnerComponent', () => {
  let component: AdminRegisterDevtpartnerComponent;
  let fixture: ComponentFixture<AdminRegisterDevtpartnerComponent>;
  let authService: AuthenticationService;
  let authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);
  let injector: TestBed;
  authMock.getCurrentUserValue.and.returnValue({ user: '' });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminRegisterDevtpartnerComponent,
        RegisterAccountPannelComponent,
        NavigationComponent
      ],
      imports: [...testModules],
      providers: [{ provide: AuthenticationService, useValue: authMock }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(AdminRegisterDevtpartnerComponent);
    component = fixture.componentInstance;
    injector = getTestBed();
    authService = injector.get(AuthenticationService);
    fixture.detectChanges();
  }));

  it('should create admin register component', () => {
    expect(component).toBeTruthy();
  });
});
