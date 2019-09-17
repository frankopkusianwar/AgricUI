import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed
} from '@angular/core/testing';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminDashboardComponent } from './admin-dashboard.component';
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
import { HighchartsChartComponent } from 'highcharts-angular';
import { FarmerDistributionComponent } from 'src/app/components/farmer-distribution/farmer-distribution.component';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let service;
  let authService: AuthenticationService;
  let adminApiCallsService: AdminApiCallsService;
  const testData = {
    topProduce: {
      success: true,
      farmProduceCount: 20,
      topFarmProduce: {
        Popcorn: 6,
        Tobbaco: 5
      },
      allFarmProduce: {
        Popcorn: 6,
        Tobbaco: 5
      }
    }
  };
  const testDataError = { error: { errorMessage: 'Could not get top produce' } };
  const formBuilder: FormBuilder = new FormBuilder();
  const authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);
  let injector: TestBed;
  authMock.getCurrentUserValue.and.returnValue({ user: '' });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminDashboardComponent,
        NavigationComponent,
        FarmerDistributionComponent,
        HighchartsChartComponent
      ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        OrderModule,
        NgxChartsModule
      ],
      providers: [
        {
          provide: FormBuilder,
          useValue: formBuilder
        },
        AdminApiCallsService,
        { provide: AuthenticationService, useValue: authMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    service = TestBed.get(AdminApiCallsService);
    service.token = 'testToken';
    injector = getTestBed();
    authService = injector.get(AuthenticationService);
  }));

  describe('AdminDashboard component', () => {
    function setup() {
      fixture = TestBed.createComponent(AdminDashboardComponent);
      const app = fixture.debugElement.componentInstance;
      component = fixture.componentInstance;
      adminApiCallsService = fixture.debugElement.injector.get(
        AdminApiCallsService
      );
      return { fixture, app, component };
    }
    it('should create the Admindashboard component', () => {
      const { app } = setup();
      expect(app).toBeTruthy();
    });

    it('should successfully call extractFarmerAndAgentsOrderStatistics', () => {
      const { component, fixture } = setup();
      const response = {
        data: [
          {
            soil_test_agent: 19,
            soil_test_farmer: 20
          },
          {
            garden_mapping_agent: 30,
            garden_mapping_farmer: 30
          },
          {
            planting_agent: 20,
            planting_farmer: 20
          },
          {
            insurance_agent: 45,
            insurance_farmer: 45
          },
          {
            spraying_agent: 20,
            spraying_farmer: 20
          }
        ]
      };
      component.extractFarmerAndAgentsOrderStatistics(response);
      expect(component.farmersAgentsOrderStatistics).toEqual([
        {
          name: 'Farmers',
          series: [
            { name: 'Soil test', value: 20 },
            { name: 'Garden mapping', value: 30 },
            { name: 'Planting', value: 20 },
            { name: 'Insurance', value: 45 },
            { name: 'Spraying', value: 20 }
          ]
        },
        {
          name: 'Farmers helped by VAs',
          series: [
            { name: 'Soil test', value: 19 },
            { name: 'Garden mapping', value: 30 },
            { name: 'Planting', value: 20 },
            { name: 'Insurance', value: 45 },
            { name: 'Spraying', value: 20 }
          ]
        }
      ]);
    });

    it('should return error if initData was not successful', () => {
      const { component } = setup();
      spyOn(component, 'loadData').and.returnValue(throwError(''));
      component.initData();
      expect(component.errorMessage).toEqual('Error loading data.');
    });
  
    it('should successfully call getVillageAgentsDistricts', () => {
      const { component } = setup();
      const response = {
        result: [
          {
            _id: "01f9dc43-e21f-3adf-9be7-790f63789cb2",
            agriculture_experience_in_years: "NA",
            assets_held: "NA",
            certification_doc_url: "NA",
            created_at: "2019-08-07 13:40:58",
            education_doc_url: "NA",
            education_level: "NA",
            eloquent_type: "va",
            farmers_enterprises: "NA",
            ma_id: "AK/MA/0421",
            other_occupation: "NA",
            partner_id: "NA",
            password: "$2y$10$0hRHy0Ktg8QW3cAfDqgdvuP4YfwjYMBzunlY5LcrxrdsORahMAu7u",
            "position held_in_community": "NA",
            service_provision_experience_in_years: "NA",
            services_va_provides: "NA",
            status: "active",
            time: "2018-07-05T21:48:13:141586",
            total_farmers_acreage: "NA",
            total_number_of_farmers: "NA",
            type: "va",
            updated_at: "2019-08-07 13:40:58",
            vaId: "AK/MA/0421/0001",
            va_country: "Uganda",
            va_district: "Bushenyi",
            va_dob: "NA",
            va_gender: "female",
            va_home_gps_Accuracy: "NA",
            va_home_gps_Altitude: "NA",
            va_home_gps_Latitude: "NA",
            va_home_gps_Longitude: "NA",
            va_id_number: "NA",
            va_id_type: "NA",
            va_name: "Danyka Kertzmann",
            va_parish: "Nyakariro",
            va_phonenumber: "1-686-710-2966 x628",
            va_photo: "https =>//drive.google.com/open?id=1MwZuPcWTOcJYa6536Buk9FEc5i7HrZ3U",
            va_region: "Western",
            va_subcounty: "Bwambara",
            va_village: "Kashayo"
          }
        ]
      };

      component.getVillageAgentsDistricts(response);
      expect(component.villageAgentsDistricts).toEqual({ Bushenyi: 1 });
    });

    it('should correctly call the onloaded method', () => {
      const results: Array<any> = 'this is a fake string'.split('');
      results[4] = {
        result: [
          {
            _id: "01f9dc43-e21f-3adf-9be7-790f63789cb2",
            agriculture_experience_in_years: "NA",
            assets_held: "NA",
            certification_doc_url: "NA",
            created_at: "2019-08-07 13:40:58",
            education_doc_url: "NA",
            education_level: "NA",
            eloquent_type: "va",
            farmers_enterprises: "NA",
            ma_id: "AK/MA/0421",
            other_occupation: "NA",
            partner_id: "NA",
            password: "$2y$10$0hRHy0Ktg8QW3cAfDqgdvuP4YfwjYMBzunlY5LcrxrdsORahMAu7u",
            "position held_in_community": "NA",
            service_provision_experience_in_years: "NA",
            services_va_provides: "NA",
            status: "active",
            time: "2018-07-05T21:48:13:141586",
            total_farmers_acreage: "NA",
            total_number_of_farmers: "NA",
            type: "va",
            updated_at: "2019-08-07 13:40:58",
            vaId: "AK/MA/0421/0001",
            va_country: "Uganda",
            va_district: "Bushenyi",
            va_dob: "NA",
            va_gender: "female",
            va_home_gps_Accuracy: "NA",
            va_home_gps_Altitude: "NA",
            va_home_gps_Latitude: "NA",
            va_home_gps_Longitude: "NA",
            va_id_number: "NA",
            va_id_type: "NA",
            va_name: "Danyka Kertzmann",
            va_parish: "Nyakariro",
            va_phonenumber: "1-686-710-2966 x628",
            va_photo: "https =>//drive.google.com/open?id=1MwZuPcWTOcJYa6536Buk9FEc5i7HrZ3U",
            va_region: "Western",
            va_subcounty: "Bwambara",
            va_village: "Kashayo"
          }
        ]
      };
      results[8] = {
        activitiesPercentage: ''
      };
      results[10] = {
        data: [
          {
            soil_test_agent: 19,
            soil_test_farmer: 20
          },
          {
            garden_mapping_agent: 30,
            garden_mapping_farmer: 30
          },
          {
            planting_agent: 20,
            planting_farmer: 20
          },
          {
            insurance_agent: 45,
            insurance_farmer: 45
          },
          {
            spraying_agent: 20,
            spraying_farmer: 20
          }
        ]
      };
      component.onDataLoaded(results);
      expect(component.loaded).toEqual(true);
    });

    it('should toggle the report filter component', () => {
      component.toggleFilter = true;
      component.toggleDateFilter();
      expect(component.toggleFilter).toEqual(false);
    });

    it('should filter data based on date', () => {
      component.startDateVal = '7 / 11 / 2019';
      component.endDateVal = '7 / 13 / 2019';
      component.ngOnInit();
      component.loaded = true;
      component.toggleDateFilter();
      expect(component.loaded).toEqual(true);
    });

    it('should return error if date is invalid', () => {
      const vaData = {};
      component.startDateVal = new Date(2019, 7, 25).toDateString();
      component.endDateVal = new Date(2019, 7, 11).toDateString();
      component.ngOnInit();
      component.toggleDateFilter();
      expect(component.invalidDateTime).toEqual(false);
    });

    it('should calculate valueDescOrder', () => {
      const aData = { value: 2, key: '2' };
      const bData = { value: 1, key: '1' };
      const val = component.valueDescOrder(aData, bData);
      const val2 = component.valueDescOrder(bData, aData);
      expect(val).toEqual(-1);
      expect(val2).toEqual(1);
    });
  });
});
