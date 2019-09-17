import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { AppDashboardNavigationComponent } from '../../../components/app-dashboard-navigation/app-dashboard-navigation.component';
import { DiseasesComponent } from './diseases.component';
import { DiagnosisTableComponent } from 'src/app/components/diagnosis-table/diagnosis-table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { EditDiagnosisModalComponent } from '../../../components/edit-diagnosis-modal/edit-diagnosis-modal.component';
import { RequestsService } from 'src/app/_shared/services/requests.service';
import { requestMock } from 'src/app/_shared/tests/spies.spec';
import { QuillModule } from 'ngx-quill';

describe('PestsComponent', () => {
  let component: DiseasesComponent;
  let fixture: ComponentFixture<DiseasesComponent>;
  let injector: TestBed;
  let requestService: RequestsService;
  let authService: AuthenticationService;
  const authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);

  authMock.getCurrentUserValue.and.returnValue({ user: '' });


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DiagnosisTableComponent,
        AppDashboardNavigationComponent,
        EditDiagnosisModalComponent,
        DiseasesComponent,
        NavigationComponent
      ],
      imports: [
        NgxPaginationModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        QuillModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: RequestsService, useValue: requestMock },
        { provide: AuthenticationService, useValue: authMock }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(DiagnosisTableComponent);
    component = fixture.componentInstance;
    injector = getTestBed();
    requestService = injector.get(RequestsService);
    authService = injector.get(AuthenticationService);
  }));

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should create the Pests component', () => {
    expect(component).toBeTruthy();
  });
});
