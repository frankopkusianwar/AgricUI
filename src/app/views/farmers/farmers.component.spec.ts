import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed
} from '@angular/core/testing';

import { FarmersComponent } from './farmers.component';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { UnderdevelopmentComponent } from 'src/app/components/underdevelopment/underdevelopment.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { CSV2JSONModule } from 'angular2-csv2json';
import { requestMock } from 'src/app/_shared/tests/spies.spec';
import { RequestsService } from 'src/app/_shared/services/requests.service';

describe('FarmersComponent', () => {
  let component: FarmersComponent;
  let fixture: ComponentFixture<FarmersComponent>;
  let authService: AuthenticationService;
  const formBuilder: FormBuilder = new FormBuilder();
  let authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);
  let injector: TestBed;
  authMock.getCurrentUserValue.and.returnValue({ user: '' });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FarmersComponent,
        NavigationComponent,
        UnderdevelopmentComponent,
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        CSV2JSONModule   
      ],
      providers: [
        { provide: RequestsService, useValue: requestMock },
        { provide: AuthenticationService, useValue: authMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(FarmersComponent);
    component = fixture.componentInstance;
    injector = getTestBed();
    authService = injector.get(AuthenticationService);
  }));

  it('should create Farmer Component', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly call ngOnit', () => {
    const vaData = {};
    component.ngOnInit();
    expect(component.loaded).toEqual(true);
  });
});
