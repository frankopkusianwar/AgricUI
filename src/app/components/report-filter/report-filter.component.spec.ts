import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationService } from 'src/app/_services/authentication.service';

import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { ReportFilterComponent } from './report-filter.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { AdminApiCallsService } from 'src/app/_services/admin-api-calls.service';

describe('ReportFilterComponent', () => {
  let component: ReportFilterComponent;
  let fixture: ComponentFixture<ReportFilterComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  let authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);
  authMock.getCurrentUserValue.and.returnValue({ user: '' });

  beforeEach(async(() => {
    let reportFilterApiCallService = jasmine.createSpyObj('AdminApiCallsService', [
      'getData'
    ]);
    reportFilterApiCallService.getData.and.returnValue(
      of({
        status: true,
        data: []
      })
    )

    TestBed.configureTestingModule({
      declarations: [ReportFilterComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule
      ],
      providers: [
        AdminApiCallsService,
        { provide: AuthenticationService, useValue: authMock },
        { provide: FormBuilder, useValue: formBuilder },
        { provide: AdminApiCallsService, useValue: reportFilterApiCallService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportFilterComponent);
    component = fixture.componentInstance;
  }));

  it('it should create report filter component', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly call ngOnit', () => {
    const vaData = {};
    component.ngOnInit();
    expect(component.districtsLoaded).toEqual(true);
  });

  it('it should show date error', () => {
    component.startDateVal = new Date(2019, 7, 25).toDateString();
    component.endDateVal = new Date(2019, 7, 11).toDateString();
    component.district = 'Kitgum';
    component.filterQuery();
    expect(component.invalidDateTime).toEqual(false);
  });

  it('should toggle the report filter component', () => {
    component.toggleFilter = true;
    component.toggleDateFilter();
    expect(component.toggleFilter).toEqual(false);
  });

  it('it should filter without specific location', () => {
    component.startDateVal = '7 / 11 / 2019';
    component.endDateVal = '7 / 13 / 2019';
    component.district = "All";
    component.filterQuery();
    expect(component.loaded).toEqual(true);
  });

  it('should check if all elements are loaded', () => {
    component.filterQuery();
    expect(component.loaded).toEqual(true);
  });
});
