import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { of, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DiagnosisTableComponent } from './diagnosis-table.component';
import { AppDashboardNavigationComponent } from '../app-dashboard-navigation/app-dashboard-navigation.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EditDiagnosisModalComponent } from '../../components/edit-diagnosis-modal/edit-diagnosis-modal.component';
import { RequestsService } from 'src/app/_shared/services/requests.service';
import { AdminApiCallsService } from 'src/app/_services/admin-api-calls.service';
import { requestMock } from 'src/app/_shared/tests/spies.spec';
import { QuillModule } from 'ngx-quill';

import { PostDiagnosisModalComponent } from '../post-diagnosis-modal/post-diagnosis-modal.component';

describe('DiagnosisTableComponent', () => {
  let component: DiagnosisTableComponent;
  let fixture: ComponentFixture<DiagnosisTableComponent>;
  let injector: TestBed;
  let requestService: RequestsService;
  let authService: AuthenticationService;
  const authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);

  const getCropService = jasmine.createSpyObj('AdminApiCallsService', [
    'getData'
  ]);

  authMock.getCurrentUserValue.and.returnValue({ user: '' });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DiagnosisTableComponent,
        NavigationComponent,
        AppDashboardNavigationComponent,
        EditDiagnosisModalComponent,
        PostDiagnosisModalComponent,
      ],
      imports: [
        RouterTestingModule,
        NgxPaginationModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        QuillModule.forRoot()
      ],
      providers: [
        { provide: RequestsService, useValue: requestMock },
        { provide: AuthenticationService, useValue: authMock },
        { provide: AdminApiCallsService, useValue: getCropService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(DiagnosisTableComponent);
    component = fixture.componentInstance;
    injector = getTestBed();
    requestService = injector.get(RequestsService);
    authService = injector.get(AuthenticationService);
  }));

  const getDiagnosisData = {
    success: true,
    data: [{
      category: 'Disease',
      cause: 'Virus',
      control: '<ol><li>One has worked.</li><li>All is well now</li></ol>',
      created_at: '2019-08-30 14:25:02',
      crop: 'Maize',
      eloquent_type: 'diagnosis',
      explanation: 'This is a test explanation',
      name: 'Soybean rust',
      photo: '',
      photo_url: `https://images.unsplash.com/photo-1512006410192-5e496c2c207b?
      ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80`,
      updated_at: '2019-09-02 14:34:55',
      _id: '38a0eca1-1722-332f-a95b-d6b729a5d26b'
    }]
  };

  const deleteDiagnosisData = {
    success: true,
    data: null
  };

  const returnData = of(getDiagnosisData);
  getCropService.getData.and.returnValue(returnData);

  beforeAll(() => {
    getCropService.getData.calls.reset();
  });

  afterEach(() => {
    getCropService.getData.calls.reset();
  });

  it('should create the Diagnosis Table component', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnit successfully for pests', () => {
    expect(component.loading).toBeUndefined();
    component.type = 'Pests';
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.loading).toBeDefined();
    expect(component.data).toBeTruthy();
  });

  it('should call ngOnit successfully for pests', () => {
    expect(component.loading).toBeUndefined();
    component.type = 'Diseases';
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.loading).toBeDefined();
    expect(component.data).toBeTruthy();
  });

  it('should correctly set diagnosis category', () => {
    expect(component.type).toBeUndefined();
    component.type = 'Pests';
    component.setCategory();
    expect(component.category).toEqual('pest');
  });

  it('should correctly loadDiagnosis data', () => {
    expect(component.loading).toBeUndefined();
    component.type = 'Pests';
    requestMock.get.and.returnValue(of(getDiagnosisData));
    component.loadDiagnosis();
    expect(component.loading).toBeDefined();
    expect(component.data['data']).toEqual(getDiagnosisData.data);
  });

  it('should catch error when getting diagnosis if error occurred', () => {
    const error = {
      success: false,
      error: ''
    };
    component.type = 'Pests';
    requestMock.get.and.returnValue(throwError(error));
    component.loadDiagnosis();
    expect(component.loading).toBe(false);
    expect(component.message).toBe('');
  });

  it('should correctly set diagnosis view information', () => {
    component.setDiagnosisView(getDiagnosisData);
    expect(component.diagnosisViewData).toEqual(getDiagnosisData);
  });

  it('should correctly delete diagnosis information', () => {
    expect(component.deleteDiagnosisloading).toBeUndefined();
    expect(component.deleteDiagnosisSuccess).toBeUndefined();
    requestMock.delete.and.returnValue(of(deleteDiagnosisData));
    component.deleteDiagnosis('oi0923n-232323');
    expect(component.deleteDiagnosisloading).toBe(false);
    expect(component.deleteDiagnosisSuccess).toBe(true);
    expect(component.message).toEqual('Diagnosis information deleted successfully');
  });

  it('should catch error when deleting diagnosis if 503 error occurred ', () => {
    const error = {
      success: false,
      status: 503,
      error: ''
    };
    requestMock.delete.and.returnValue(throwError(error));
    component.deleteDiagnosis('uojsij0we-ojaosds');
    expect(component.deleteDiagnosisloading).toBe(false);
    expect(component.deleteDiagnosisSuccess).toBe(false);
    expect(component.message).toBe('Some error occurred. Please try again');
  });

  it('should catch error when deleting diagnosis that does not exist ', () => {
    const error = {
      success: false,
      status: 404,
      error: ''
    };
    requestMock.delete.and.returnValue(throwError(error));
    component.deleteDiagnosis('uojsij0we-ojaosds');
    expect(component.deleteDiagnosisloading).toBe(false);
    expect(component.deleteDiagnosisSuccess).toBe(false);
    expect(component.message).toBe('Diagnosis information not found!');
  });

  it('should set diagnosis action correctly', () => {
    component.setDiagnosisAction('ojoijsd-ad', 'Edit', 'editModal');
    expect(component.diagnosisId).toEqual('ojoijsd-ad');
    expect(component.diagnosisAction).toEqual('Edit');
    expect(component.modalId).toEqual('editModal');
  });

  it('should clear message successfully', () => {
    component.message = 'message';
    component.clearMessage();
    expect(component.message).toEqual('');
  });

  it('should close diagnosis modal', () => {
    component.diagnosisId = 'ojoijsd-we';
    component.closeDiagnosisModal();
    expect(component.diagnosisId).toBeNull();
  });

  it('should refresh the diagnosis page', () => {
    expect(component.data).toBeUndefined();
    requestMock.get.and.returnValue(of(getDiagnosisData));
    component.refreshDiagnosisList();
    expect(component.data['data']).toEqual(getDiagnosisData.data);
  });
});
