import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { AdminApiCallsService } from '../../_services/admin-api-calls.service';
import {
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from 'src/app/_services/authentication.service';

import { TopDistrictsComponent } from './top-districts.component';

describe('TopDistrictsComponent', () => {
  let component: TopDistrictsComponent;
  let fixture: ComponentFixture<TopDistrictsComponent>;

  let service;
  let authService: AuthenticationService;
  let authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);
  let injector: TestBed;
  authMock.getCurrentUserValue.and.returnValue({ user: '' });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopDistrictsComponent ],
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
      fixture = TestBed.createComponent(TopDistrictsComponent);
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
