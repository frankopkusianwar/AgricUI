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

import { ApplicationActivitySummaryComponent } from './application-activity-summary.component';

describe('ApplicationActivitySummaryComponent', () => {
  let component: ApplicationActivitySummaryComponent;
  let fixture: ComponentFixture<ApplicationActivitySummaryComponent>;

  let service;
  let authService: AuthenticationService;
  let authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);
  let injector: TestBed;
  authMock.getCurrentUserValue.and.returnValue({ user: '' });

  const mockData = {
    success: true,
    allMobileUsersCount: 40,
    activeMobileUsersCount: 2
  };

  const visitorMockData = {
    success: true,
    visitorsCount: 1
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationActivitySummaryComponent],
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

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationActivitySummaryComponent);
    const app = fixture.debugElement.componentInstance;
    component = fixture.componentInstance;
    component.activeMobileUsers = mockData;
    component.numberOfVisitors = visitorMockData;
    fixture.detectChanges();
  });

  it('should create the application activity summary component', () => {
    expect(component).toBeTruthy();
  });
});
