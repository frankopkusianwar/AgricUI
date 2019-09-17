import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { AdminApiCallsService } from '../../_services/admin-api-calls.service';
import {
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from 'src/app/_services/authentication.service';

import { OnlineAccountsComponent } from './online-accounts.component';

describe('OnlineAccountsComponent', () => {
  let component: OnlineAccountsComponent;
  let fixture: ComponentFixture<OnlineAccountsComponent>;

  let service;
  let authService: AuthenticationService;
  let authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);
  let injector: TestBed;
  authMock.getCurrentUserValue.and.returnValue({ user: '' });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineAccountsComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        AdminApiCallsService,
        { provide: AuthenticationService, useValue: authMock }
      ]
    })
    .compileComponents();

    service = TestBed.get(AdminApiCallsService);
    service.token = 'testToken';
    injector = getTestBed();
    authService = injector.get(AuthenticationService);
  }));

  describe('Top District component', () => {
    function setup() {
      fixture = TestBed.createComponent(OnlineAccountsComponent);
      const app = fixture.debugElement.componentInstance;
      component = fixture.componentInstance;
      return { fixture, app, component };
    }
    it('should create the top district component', () => {
      const { app } = setup();
      expect(app).toBeTruthy();
    });
  });
});
