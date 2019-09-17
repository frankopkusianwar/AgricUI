import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed
} from '@angular/core/testing';

import { AdminRegisterOfftakerComponent } from './admin-register-offtaker.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { RegisterAccountPannelComponent } from 'src/app/components/register-account-pannel/register-account-pannel.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { testModules } from 'src/app/_shared/tests/testModules';

describe('AdminRegisterOfftakerComponent', () => {
  let component: AdminRegisterOfftakerComponent;
  let fixture: ComponentFixture<AdminRegisterOfftakerComponent>;
  let authService: AuthenticationService;
  let authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);
  let injector: TestBed;
  authMock.getCurrentUserValue.and.returnValue({ user: '' });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminRegisterOfftakerComponent,
        RegisterAccountPannelComponent,
        NavigationComponent
      ],

      imports: [...testModules],
      providers: [{ provide: AuthenticationService, useValue: authMock }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(AdminRegisterOfftakerComponent);
    component = fixture.componentInstance;
    injector = getTestBed();
    authService = injector.get(AuthenticationService);
  }));

  it('should create admin register component', () => {
    expect(component).toBeTruthy();
  });
});
