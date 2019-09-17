import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed
} from '@angular/core/testing';
import { AppManagementDashboardComponent } from './app-management-dashboard.component';
import { AppDashboardNavigationComponent } from 'src/app/components/app-dashboard-navigation/app-dashboard-navigation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RequestsService } from 'src/app/_shared/services/requests.service';
import { requestMock } from 'src/app/_shared/tests/spies.spec';
import { CSV2JSONModule } from 'angular2-csv2json';
import { ChartsModule } from 'ng2-charts';
import { of, throwError } from 'rxjs';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
describe('AppManagementDashboardComponent', () => {
  let component: AppManagementDashboardComponent;
  let fixture: ComponentFixture<AppManagementDashboardComponent>;
  let authService: AuthenticationService;
  let requestService: RequestsService;
  const authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);
  let injector: TestBed;
  authMock.getCurrentUserValue.and.returnValue({ user: '' });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppManagementDashboardComponent,
        NavigationComponent,
        AppDashboardNavigationComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        CSV2JSONModule,
        ChartsModule
      ],
      providers: [
        { provide: RequestsService, useValue: requestMock },
        { provide: AuthenticationService, useValue: authMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(AppManagementDashboardComponent);
    component = fixture.componentInstance;
    injector = getTestBed();
    authService = injector.get(AuthenticationService);
    requestService = injector.get(RequestsService);
  }));
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should call ngOnInit', () => {
    const initDataSpy = spyOn(component, 'initData').and.returnValue(of());
    component.ngOnInit();
    expect(initDataSpy).toHaveBeenCalled();
  });
  it('should load data', () => {
    const response = [];
    (response[0] = {
      totalNewOrders: 135
    }),
    (response[1] = {
      count: 265
    }),
    (response[2] = {
      totalPayment: 63100050.52948
    }),
    (response[3] = {
      available_stock: {
        Herbicides: 9992,
        Seeds: 4500,
        Fertilizer: 4500,
        Tools: 1500
      },
      total: 20492
    }), (response[4] = {
      farmers_orders: {
        Fertilizer: 11,
        Herbicide: 9,
        Pesticide: 10,
        Seeds: 11
        }
    }),
    (response[5] = {
      count: 330
    }),
    (response[6] = {
      count: 331
    }),
    (response[7] = {
      count: 40
    });
    requestMock.get().subscribe(() => {
      component.onDataLoaded(response);
      expect(component.loaded).toEqual(true);
    });
  });
  
  it('should call initData successfully', () => {
    const onDataLoaded = spyOn(component, 'onDataLoaded').and.returnValue(of());
    component.initData();
    expect(onDataLoaded).toHaveBeenCalled();
  });
  it('should return error if initData was not successful', () => {
    spyOn(component, 'loadData').and.returnValue(throwError(''));
    component.initData();
    expect(component.errorMessage).toEqual('Error loading data.');
  });
});
