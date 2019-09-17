import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminUsersLogComponent } from './admin-users-log.component';
import { AdminApiCallsService } from '../../_services/admin-api-calls.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrderModule } from 'ngx-order-pipe';
import { of, throwError } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';

describe('AdminUsersLogComponent', () => {
  let component: AdminUsersLogComponent;
  let fixture: ComponentFixture<AdminUsersLogComponent>;
  let service;
  let authService: AuthenticationService;
  let adminApiCallsService: AdminApiCallsService;

  const formBuilder: FormBuilder = new FormBuilder();
  const authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);
  let injector: TestBed;
  authMock.getCurrentUserValue.and.returnValue({ user: '' });

  function setup() {
    fixture = TestBed.createComponent(AdminUsersLogComponent);
    const app = fixture.debugElement.componentInstance;
    component = fixture.componentInstance;
    adminApiCallsService = fixture.debugElement.injector.get(
      AdminApiCallsService
    );
    return { fixture, app, component };
  }
  const logs = [
    {
      email: 'emmsdan@ggogle.com',
      user: 'emms dan',
      activity: 'account created'
    },
    {
      email: 'mexlet@gmail.com',
      user: 'fake mex',
      activity: 'account deleted'
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUsersLogComponent, NavigationComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        NgxPaginationModule,
        OrderModule
      ],
      providers: [
        AdminApiCallsService,
        { provide: AuthenticationService, useValue: authMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    service = TestBed.get(AdminApiCallsService);
    service.token = 'testToken';
    injector = getTestBed();
    authService = injector.get(AuthenticationService);
    const { app, fixture, component } = setup();
  }));

  it('should create the Admin Activity Log component', () => {
    const { app } = setup();
    expect(app).toBeTruthy();
  });

  it('should format date correctly', () => {
    const date = new Date('2017-12-22T03:24:00').toString();
    const formatDate = component.formatDate(date);
    fixture.detectChanges();
    expect(formatDate).toEqual('Fri Dec 22 2017, 3:24:00 AM');
  });

  it('should simulate fetched activity logs', () => {
    const spy = spyOn(adminApiCallsService, 'getData').and.returnValue(
      of({
        activityLog: logs
      })
    );
    component.ngOnInit();
    fixture.detectChanges();
    expect(spy.calls.any()).toEqual(true);
  });

  it('should get activity by date range', () => {
    component.data = logs;
    const formatDate = component.getDateRange();
    fixture.detectChanges();
    expect(component.tempData).toEqual(component.data);
  });

  it('should simulate search activity logs', () => {
    component.data = logs;
    const formatDate = component.searchTable({
      target: {
        value: 'ggogle'
      }
    });
    fixture.detectChanges();
    expect(component.tempData).toEqual([logs[0]]);
  });

  it('should simulate export activity logs', () => {
    component.tempData = logs;
    const formatDate = component.onExportCSV();
    fixture.detectChanges();
    expect(component.tempData).toEqual(logs);
  });

  it('should simulate print activity logs', () => {
    component.tempData = logs;
    const formatDate = component.printable();
    fixture.detectChanges();
    expect(component.tempData).toEqual(logs);
  });
});
