import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { of, throwError } from 'rxjs';
import { spy } from 'sinon';

import { AuthenticationService } from '../../_services/authentication.service';
import { PostDiagnosisModalComponent } from './post-diagnosis-modal.component';
import { RequestsService } from 'src/app/_shared/services/requests.service';
import { requestMock } from 'src/app/_shared/tests/spies.spec';
import { AdminApiCallsService } from 'src/app/_services/admin-api-calls.service';

const blobToFile = (fileName: string): File => {
  const b: any = new Blob([], {type : 'image/jpeg'});
  b.lastModifiedDate = new Date();
  b.name = fileName;
  return b as File;
};

const diagnosisMock = {
  name: 'Virus Name',
  cause: 'Virus cause',
  crop: 'Virus crop',
  photo: null,
  control: 'Virus control',
  explanation: 'Virus explanation',
};

describe('PostDiagnosisModalComponent', () => {
  let component: PostDiagnosisModalComponent;
  let fixture: ComponentFixture<PostDiagnosisModalComponent>;
  let injector: TestBed;
  let requestService: RequestsService;
  let authService: AuthenticationService;

  const authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);

  const returnData = of({
    success: true,
    data: [],
  });

  authMock.getCurrentUserValue.and.returnValue({ user: '' });

  const getCropService = jasmine.createSpyObj('AdminApiCallsService', [
    'getData', 'postData'
  ]);

  getCropService.getData.and.returnValue(returnData);
  getCropService.postData.and.returnValue(returnData);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostDiagnosisModalComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        QuillModule.forRoot()
      ],
      providers: [
        { provide: AuthenticationService, useValue: authMock },
        { provide: RequestsService, useValue: requestMock },
        { provide: AdminApiCallsService, useValue: getCropService }
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(PostDiagnosisModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    requestService = TestBed.get(RequestsService);
    injector = getTestBed();
    authService = injector.get(AuthenticationService);
  }));

  beforeAll(() => {
    getCropService.getData.calls.reset();
  });

  afterEach(() => {
    getCropService.getData.calls.reset();
    getCropService.postData.calls.reset();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should execute processPhoto method', () => {
    const events = {
      target: {
        files: [
          {
            name: 'photo.png',
            size: 1000000
          }
        ]
      }
    };
    component.processPhoto(events);
  });

  it('should execute handleSubmit', () => {
    fixture.detectChanges();
    spy(component, 'postDiagnosis');
    spyOn(component, 'closeModal').and.returnValue(true);

    component.file = blobToFile('image.png');
    component.handleSubmit(diagnosisMock);

    diagnosisMock.control = null;
    component.handleSubmit(diagnosisMock);
    expect(component.requiredField.control).toBeTruthy();

    diagnosisMock.control = 'New value';
    diagnosisMock.explanation = null;
    component.handleSubmit(diagnosisMock);
    expect(component.requiredField.explanation).toBeTruthy();

    diagnosisMock.control = 'New value';
    diagnosisMock.explanation = 'New value';
    component.file = null;
    component.handleSubmit(diagnosisMock);
    expect(component.requiredField.photo).toBeTruthy();
  });

  it('should execute clearErrorMessage method', () => {
    const inputControl = { name: 'control', };
    const inputExplanation = { name: 'explanation', };

    component.clearErrorMessage(inputControl);
    component.clearErrorMessage(inputExplanation);
  });

  it('should execute instance methods', () => {
    const message = 'Just for testing';
    const status = 'success';
    component.displayAlert(message, status);
    component.refreshDiagnosisInfo();
  });

  it('should throw error on postDiagnosis', () => {
    fixture.detectChanges();
    getCropService.postData.and.returnValue(throwError({ error: 'Cannot create diagnosis' }));
    component.postDiagnosis(diagnosisMock);
  });
});
