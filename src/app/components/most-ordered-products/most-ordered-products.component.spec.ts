import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AuthenticationService } from 'src/app/_services/authentication.service';

import { MostOrderedProductsComponent } from './most-ordered-products.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { AdminApiCallsService } from 'src/app/_services/admin-api-calls.service';


describe('MostOrderedProductsComponent', () => {
  let component: MostOrderedProductsComponent;
  let fixture: ComponentFixture<MostOrderedProductsComponent>;
   let authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);
  let adminApiService: AdminApiCallsService;
  authMock.getCurrentUserValue.and.returnValue({ user: '' });

   function setup() {
    fixture = TestBed.createComponent(MostOrderedProductsComponent);  
    const app = fixture.debugElement.componentInstance;
    component = fixture.componentInstance;
    adminApiService = fixture.debugElement.injector.get(     AdminApiCallsService);
     return { fixture, app, component };
   }


   beforeEach(async(() => {

    TestBed.configureTestingModule({
    declarations: [MostOrderedProductsComponent],
    imports: [
      RouterTestingModule,
      HttpClientTestingModule,
      NgxChartsModule
      ],
      providers: [
        AdminApiCallsService,
        { provide: AuthenticationService, useValue: authMock }
      ]
    }).compileComponents();
  }));	

  it('it should create most ordered products and sevices component', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });

  it('it should render loadFilter', () => {
    const { component, fixture } = setup();
    const response = {
      data: [{ name: 'Maize' }]
    };
    const spyNgOnit = spyOn(adminApiService, 'getData').and.returnValue(
      of(response)
    );
    expect(component.filterLoaded).toBeFalsy();
    component.loadFilter('enterprises');
    expect(component.filterLoaded).toBe(true);
    expect(spyNgOnit.calls.any()).toBe(true);
  });
  
  it('it should not render loadFilter when error occurs', () => {
    const { component, fixture } = setup();
    const errorResponse = {
      error: { error: 'Error occurred.' }
    };
    const spyNgOnit = spyOn(adminApiService, 'getData').and.returnValue(
      throwError(errorResponse)
    );
    component.loadFilter('enterprises');
    expect(component.errorMessage).toBe(errorResponse.error.error);
    expect(spyNgOnit.calls.any()).toBe(true);
  });

  it('it should call extractProducts and extractServices correctly', () => {
      const { component } = setup();
      const response = {
        data: {
          products: [[ "Korn Kali", "Harvester"], [ "Korn Kali", "Harvester"]],
          services: [{ garden_mapping: 5 }, { maize: 2 }]
        }
      };
      component.extractProducts(response);
      component.extractServices(response);
      expect(component.products).toContain({name: 'Korn Kali', value: 2});
      expect(component.services).toContain({name: 'Garden mapping', value: 5});
    });

  it('it should call getProductsAndServices', () => {
    const { component } = setup();
    const response = {
      data: {
        products: [
            [
                "Korn Kali",
                "Harvester"
            ],
        ],
        services: [
            {
                garden_mapping: 5
            }
        ]
      }
    };
    const spyNgOnit = spyOn(adminApiService, 'getData').and.returnValue(
      of(response)
    );
    component.getProductsAndServices('Crop');
    expect(component.productsAndServicesLoaded).toBe(true);
    expect(spyNgOnit.calls.any()).toBe(true);
  });
  
  it('it should not call getProductsAndServices when error occurs', () => {
    const { component } = setup();
    const errorResponse = {
      error: { error: 'Error occurred.' }
    };
    const spyNgOnit = spyOn(adminApiService, 'getData').and.returnValue(
      throwError(errorResponse)
    );
    component.getProductsAndServices('Crop');
    expect(component.errorMessage).toBe(errorResponse.error.error);
    expect(spyNgOnit.calls.any()).toBe(true);
  });

  it('it should correctly handle filterType change event', () => {
    const { component, fixture } = setup();
    const response = {
      data: [{ name: 'Maize' }]
    };
    const spyNgOnit = spyOn(adminApiService, 'getData').and.returnValue(
      of(response)
    );
    expect(component.filterLoaded).toBeFalsy();
    component.filterTypeChange('Crop');
    fixture.detectChanges();
    expect(component.filterType).toEqual('Crop');
    expect(spyNgOnit.calls.any()).toBe(true);
  });
});
