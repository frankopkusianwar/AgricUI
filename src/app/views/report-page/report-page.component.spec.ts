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
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { ReportPageComponent } from './report-page.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { AdminReportSidebarComponent } from '../../components/admin-report-sidebar/admin-report-sidebar.component';
import { ReportFilterComponent } from '../../components/report-filter/report-filter.component';
import { AdminSocialMediaSummaryComponent } from '../../components/admin-social-media-summary/admin-social-media-summary.component';
import { ApplicationActivitySummaryComponent } from '../../components/application-activity-summary/application-activity-summary.component';
import { TopDistrictsComponent } from '../../components/top-districts/top-districts.component';
import { OnlineAccountsComponent } from '../../components/online-accounts/online-accounts.component';
import { MostOrderedProductsComponent } from '../../components/most-ordered-products/most-ordered-products.component';
import { of } from 'rxjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';

describe('ReportPageComponent', () => {
  let component: ReportPageComponent;
  let fixture: ComponentFixture<ReportPageComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  let authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);
  let AdminApiCallsServiceMock;
  let getDataSpy;
  let injector: TestBed;
  authMock.getCurrentUserValue.and.returnValue({ user: '' });

  beforeEach(async(() => {
    AdminApiCallsServiceMock = {
      status: true,
      data: ''
    };
    const adminApiCallsService = jasmine.createSpyObj('AdminApiCallsService', [
      'getData'
    ]);
    getDataSpy = adminApiCallsService.getData.and.returnValue(
      of(AdminApiCallsServiceMock)
    );

    TestBed.configureTestingModule({
      declarations: [
        ReportPageComponent,
        NavigationComponent,
        AdminReportSidebarComponent,
        ReportFilterComponent,
        AdminSocialMediaSummaryComponent,
        ApplicationActivitySummaryComponent,
        TopDistrictsComponent,
        OnlineAccountsComponent,
        MostOrderedProductsComponent
      ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        FormsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        NgxChartsModule
      ],
      providers: [
        { provide: AdminApiCallsService, useValue: adminApiCallsService },
        { provide: AuthenticationService, useValue: authMock },
        { provide: FormBuilder, useValue: formBuilder }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportPageComponent);
    component = fixture.componentInstance;
  }));

  it('should correctly call ngOnit', () => {
    const vaData = {};
    component.ngOnInit();
    expect(component.loaded).toEqual(true);
  });

  it('should render component with date and location filter', () => {
    const vaData = {
      startDate: '7 / 11 / 2019',
      endDate: '7 / 13 / 2019',
      district: 'All',
      location: ''
    };
    component.ngOnInit();
    component.updateOnFilter(vaData)
    expect(component.loaded).toEqual(true);
  });

  it('should render component with date and location filter', () => {
    const vaData = {
      startDate: '7 / 11 / 2019',
      endDate: '7 / 13 / 2019',
      district: 'Bushenyi',
      location: '&district=Bushenyi'
    };
    component.ngOnInit();
    component.updateOnFilter(vaData)
    expect(component.loaded).toEqual(true);
  });
});
