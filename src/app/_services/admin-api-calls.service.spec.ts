import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminApiCallsService } from './admin-api-calls.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('AdminApiCallsService', () => {
  let apiUrl = environment.API_URL;
  let service;
  let mockResponses;
  let httpTestingController;
  let startDate = '2017-12-12';
  let endDate = '2019-12-12';
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AdminApiCallsService]
    })
  );
  beforeAll(() => {
    service = TestBed.get(AdminApiCallsService);
    httpTestingController = TestBed.get(HttpTestingController);
    mockResponses = {
      villageAgents: {
        success: true,
        count: 1,
        villageAgents: [
          {
            _id: '248833b0262f4ddeaa8d69105677f886',
            agriculture_experience_in_years: 'NA',
            assets_held: 'NA',
            certification_doc_url: 'NA',
            education_doc_url: 'NA',
            education_level: 'NA',
            eloquent_type: 'va',
            farmers_enterprises: 'NA',
            ma_id: 'AK/MA/0421',
            other_occupation: 'NA',
            partner_id: 'NA',
            'position held_in_community': 'NA',
            service_provision_experience_in_years: 'NA',
            services_va_provides: 'NA',
            status: 'active',
            time: '2018-07-05T21:48:13:141586',
            total_farmers_acreage: 'NA',
            total_number_of_farmers: 'NA',
            type: 'va',
            vaId: 'AK/MA/0421/0001',
            va_country: 'Uganda',
            va_district: 'rukungiri',
            va_dob: 'NA',
            va_gender: 'female',
            va_home_gps_Accuracy: 'NA',
            va_home_gps_Altitude: 'NA',
            va_home_gps_Latitude: 'NA',
            va_home_gps_Longitude: 'NA',
            va_id_number: 'NA',
            va_id_type: 'NA',
            va_name: 'Nyesiga Benadeth',
            va_parish: 'Nyakariro',
            va_phonenumber: 789394948,
            va_photo:
              'https =>//drive.google.com/open?id=1MwZuPcWTOcJYa6536Buk9FEc5i7HrZ3U',
            va_region: 'Western',
            va_subcounty: 'Bwambara',
            va_village: 'Kashayo'
          }
        ]
      }
    };
    service = TestBed.get(AdminApiCallsService);
    service.token = 'testToken';
  });

  it('should be create the AdminApiCallsService', () => {
    const service: AdminApiCallsService = TestBed.get(AdminApiCallsService);
    expect(service).toBeTruthy();
  });

  it('should get village agents', () => {
    service.getData('village-agents').subscribe((data: any) => {
      expect(data).toEqual(mockResponses.villageAgents);
    });
    const req = httpTestingController.expectOne(`${apiUrl}/village-agents`);
    expect(req.request.method).toBe('GET');
    httpTestingController.verify();
  });
  it('should get input suppliers', () => {
    service.getData('input-suppliers').subscribe((data: any) => {
      expect(data).toEqual(mockResponses.villageAgents);
    });
    const req = httpTestingController.expectOne(`${apiUrl}/input-suppliers`);
    expect(req.request.method).toBe('GET');
    httpTestingController.verify();
  });
  it('should get offtakers', () => {
    service.getData('offtakers').subscribe((data: any) => {
      expect(data).toEqual(mockResponses.villageAgents);
    });
    const req = httpTestingController.expectOne(`${apiUrl}/offtakers`);
    expect(req.request.method).toBe('GET');
    httpTestingController.verify();
  });
  it('should get devtPartners', () => {
    service.getData('devt-partners').subscribe((data: any) => {
      expect(data).toEqual(mockResponses.villageAgents);
    });
    const req = httpTestingController.expectOne(`${apiUrl}/devt-partners`);
    expect(req.request.method).toBe('GET');
    httpTestingController.verify();
  });
  it('should get top districts', () => {
    service.getData('top-districts').subscribe((data: any) => {
      expect(data).toEqual(mockResponses.villageAgents);
    });
    const req = httpTestingController.expectOne(`${apiUrl}/top-districts`);
    expect(req.request.method).toBe('GET');
    httpTestingController.verify();
  });
  it('should get activity summary', () => {
    service.getData('activity-summary').subscribe((data: any) => {
      expect(data).toEqual(mockResponses.villageAgents);
    });
    const req = httpTestingController.expectOne(`${apiUrl}/activity-summary`);
    expect(req.request.method).toBe('GET');
    httpTestingController.verify();
  });
  it('should get total acreage', () => {
    service.getData('total-acreage').subscribe((data: any) => {
      expect(data).toEqual(mockResponses.villageAgents);
    });
    const req = httpTestingController.expectOne(`${apiUrl}/total-acreage`);
    expect(req.request.method).toBe('GET');
    httpTestingController.verify();
  });
  it('should get total payment', () => {
    service.getData('total-payment').subscribe((data: any) => {
      expect(data).toEqual(mockResponses.villageAgents);
    });
    const req = httpTestingController.expectOne(`${apiUrl}/total-payment`);
    expect(req.request.method).toBe('GET');
    httpTestingController.verify();
  });
  it('should get village-agents filtered by date', () => {
    service
      .getData(`village-agents/?start_date=${startDate}&end_date=${endDate}`)
      .subscribe((data: any) => {
        expect(data).toEqual(mockResponses.villageAgents);
      });
    const req = httpTestingController.expectOne(
      `${apiUrl}/village-agents/?start_date=${startDate}&end_date=${endDate}`
    );
    expect(req.request.method).toBe('GET');
    httpTestingController.verify();
  });
  it('should get input-suppliers filtered by date', () => {
    service
      .getData(`input-suppliers/?start_date=${startDate}&end_date=${endDate}`)
      .subscribe((data: any) => {
        expect(data).toEqual(mockResponses.villageAgents);
      });
    const req = httpTestingController.expectOne(
      `${apiUrl}/input-suppliers/?start_date=${startDate}&end_date=${endDate}`
    );
    expect(req.request.method).toBe('GET');
    httpTestingController.verify();
  });
  it('should get offtakers filtered by date', () => {
    service
      .getData(`offtakers/?start_date=${startDate}&end_date=${endDate}`)
      .subscribe((data: any) => {
        expect(data).toEqual(mockResponses.villageAgents);
      });
    const req = httpTestingController.expectOne(
      `${apiUrl}/offtakers/?start_date=${startDate}&end_date=${endDate}`
    );
    expect(req.request.method).toBe('GET');
    httpTestingController.verify();
  });
  it('should get devtpartners filtered by date', () => {
    service
      .getData(`devtpartners/?start_date=${startDate}&end_date=${endDate}`)
      .subscribe((data: any) => {
        expect(data).toEqual(mockResponses.villageAgents);
      });
    const req = httpTestingController.expectOne(
      `${apiUrl}/devtpartners/?start_date=${startDate}&end_date=${endDate}`
    );
    expect(req.request.method).toBe('GET');
    httpTestingController.verify();
  });
  it('should get top-districts filtered by date', () => {
    service
      .getData(`top-districts/?start_date=${startDate}&end_date=${endDate}`)
      .subscribe((data: any) => {
        expect(data).toEqual(mockResponses.villageAgents);
      });
    const req = httpTestingController.expectOne(
      `${apiUrl}/top-districts/?start_date=${startDate}&end_date=${endDate}`
    );
    expect(req.request.method).toBe('GET');
    httpTestingController.verify();
  });
  it('should get top produce', () => {
    service.getData('top-produce').subscribe((data: any) => {
      expect(data).toEqual(mockResponses.villageAgents);
    });
    const req = httpTestingController.expectOne(`${apiUrl}/top-produce`);
    expect(req.request.method).toBe('GET');
    httpTestingController.verify();
  });
  it("should get top produce filtered by date", () => {
    service.getData(`top-produce/?start_date=${startDate}&end_date=${endDate}`).subscribe((data: any) => {
      expect(data).toEqual(mockResponses.villageAgents);
    });
    const req = httpTestingController.expectOne(`${apiUrl}/top-produce/?start_date=${startDate}&end_date=${endDate}`);
    expect(req.request.method).toBe("GET");
    httpTestingController.verify();
  });
});
