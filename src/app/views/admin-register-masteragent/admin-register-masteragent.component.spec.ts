import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed
} from '@angular/core/testing';
import { AdminRegisterMasteragentComponent } from './admin-register-masteragent.component';
import { RegisterAccountPannelComponent } from '../../components/register-account-pannel/register-account-pannel.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { testModules } from '../../_shared/tests/testModules';
import { AuthenticationService } from 'src/app/_services/authentication.service';
describe('AdminRegisterMasteragent', () => {
  let component: AdminRegisterMasteragentComponent;
  let fixture: ComponentFixture<AdminRegisterMasteragentComponent>;
  let app;
  let authService: AuthenticationService;
  let authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);
  let injector: TestBed;
  authMock.getCurrentUserValue.and.returnValue({ user: '' });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminRegisterMasteragentComponent,
        RegisterAccountPannelComponent,
        NavigationComponent
      ],
      imports: [...testModules],
      providers: [{ provide: AuthenticationService, useValue: authMock }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminRegisterMasteragentComponent);
    component = fixture.componentInstance;
    app = fixture.debugElement.nativeElement;
    injector = getTestBed();
    authService = injector.get(AuthenticationService);
    fixture.detectChanges();
  }));

  it('should create the AdminRegisterMasteragent component', () => {
    expect(component).toBeTruthy();
  });
});
