import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed
} from '@angular/core/testing';

import { AdminApiCallsService } from '../../_services/admin-api-calls.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from 'src/app/_services/authentication.service';

import { AdminSocialMediaSummaryComponent } from './admin-social-media-summary.component';

describe('AdminSocialMediaSummaryComponent', () => {
  let component: AdminSocialMediaSummaryComponent;
  let fixture: ComponentFixture<AdminSocialMediaSummaryComponent>;

  let service;
  let authService: AuthenticationService;
  let authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);
  let injector: TestBed;
  authMock.getCurrentUserValue.and.returnValue({ user: '' });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSocialMediaSummaryComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        AdminApiCallsService,
        { provide: AuthenticationService, useValue: authMock }
      ]
    }).compileComponents();

    service = TestBed.get(AdminApiCallsService);
    service.token = 'testToken';
    injector = getTestBed();
    authService = injector.get(AuthenticationService);
  }));

  describe('Admin Social component', () => {
    function setup() {
      fixture = TestBed.createComponent(AdminSocialMediaSummaryComponent);
      const app = fixture.debugElement.componentInstance;
      component = fixture.componentInstance;
      return { fixture, app, component };
    }
    it('should create the admin social component', () => {
      const { app } = setup();
      expect(app).toBeTruthy();
    });
  });
});
