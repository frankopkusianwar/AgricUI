import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { NavigationComponent } from "../../components/navigation/navigation.component";
import { of, throwError } from "rxjs";
import { AppDashboardNavigationComponent } from "../app-dashboard-navigation/app-dashboard-navigation.component";
import { EditDiagnosisModalComponent } from "../../components/edit-diagnosis-modal/edit-diagnosis-modal.component";
import { AdminApiCallsService } from "src/app/_services/admin-api-calls.service";
import { QuillModule } from "ngx-quill";

describe("DiagnosisTableComponent", () => {
  let component: EditDiagnosisModalComponent;
  let fixture: ComponentFixture<EditDiagnosisModalComponent>;
  let requestMock = jasmine.createSpyObj("AdminApiCallsService", [
    "getData",
    "postData"
  ]);
  const authMock = jasmine.createSpyObj("AuthenticationService", [
    "getCurrentUserValue"
  ]);

  let formgroup: FormGroup;
  authMock.getCurrentUserValue.and.returnValue({ user: "" });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavigationComponent,
        AppDashboardNavigationComponent,
        EditDiagnosisModalComponent,
        NavigationComponent
      ],
      imports: [
        RouterTestingModule,
        NgxPaginationModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        QuillModule.forRoot(),
        FormsModule
      ],
      providers: [
        { provide: "", useValue: "" },
        { provide: FormGroup, useValue: formgroup },
        { provide: AdminApiCallsService, useValue: requestMock },
        { provide: AuthenticationService, useValue: authMock }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(EditDiagnosisModalComponent);
    component = fixture.componentInstance;
    component.diagnosisInformationForm = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-zA-Z ]*")
      ]),
      cause: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-zA-Z ]*")
      ]),
      crop: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-zA-Z ]*")
      ]),
      photo: new FormControl(null),
      control: new FormControl(""),
      explanation: new FormControl("")
    });
  }));

  const getDiagnosisData = {
    success: true,
    data: [
      {
        category: "Disease",
        cause: "Virus",
        control: "<ol><li>One has worked.</li><li>All is well now</li></ol>",
        created_at: "2019-08-30 14:25:02",
        crop: "Maize",
        eloquent_type: "diagnosis",
        explanation: "This is a test explanation",
        name: "Soybean rust",
        photo: "",
        photo_url:
          "https://images.unsplash.com/photo-1512006410192-5e496c2c207b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
        updated_at: "2019-09-02 14:34:55",
        _id: "38a0eca1-1722-332f-a95b-d6b729a5d26b"
      }
    ]
  };

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it("should create the edit diagnosis table component", () => {
    expect(component).toBeTruthy();
  });

  it("should successfully call ngOnit", () => {
    expect(component.loading).toBe(false);
    component.category = "pest";
    component.diagnosisId = "koijosw-ijisd";
    requestMock.getData.and.returnValue(of(getDiagnosisData));
    component.ngOnInit();
    expect(component.loading).toBe(false);
  });

  it('should load single diagnosisInformation', () => {
    component.category = 'pest';
    component.diagnosisInformation = getDiagnosisData.data[0];
    requestMock.getData.and.returnValue(of(getDiagnosisData));
    component.loadDiagnosisInformation('oi0820-askdow');
    fixture.detectChanges();
    expect(component.diagnosisInformation).toEqual(getDiagnosisData.data[0]);
  });

  it("should return error if error occurred when loading single diagnosisInformation", () => {
    const error = {
      status: false,
      error: "Some error occurred"
    };
    component.category = "pest";
    requestMock.getData.and.returnValue(throwError(error));
    component.loadDiagnosisInformation("oi0820-askdow");
    expect(component.loading).toBe(false);
    expect(component.message).toBe(error.error);
  });

  it("should load crops information", () => {
    requestMock.getData.and.returnValue(of(getDiagnosisData.data[0]));
    component.loadCrops();
    expect(component.crops).toEqual(getDiagnosisData.data[0]);
  });

  it("should close diagnosis modal", () => {
    component.closeEditDiagnosisModal();
  });

  it("should refresh diagnosis information", () => {
    component.refreshDiagnosisInformation();
  });

  it("should process image selection if image is valid", () => {
    const event = {
      target: {
        files: [
          {
            name: "image.jpg",
            size: 40000
          }
        ]
      }
    };

    component.processPhoto(event);
    expect(component.file).toEqual(event.target.files[0]);
  });

  it("should not process image if invalid", () => {
    const event = {
      target: {
        files: [
          {
            name: "image.pdf",
            size: 400000000
          }
        ]
      }
    };

    component.processPhoto(event);
    expect(component.file).toBeUndefined();
    expect(component.diagnosisInformationForm.status).toEqual("INVALID");
  });

  it("should successfully call onSubmit() when photo is present", () => {
    const value = {
      name: "name",
      crop: "crop",
      cause: "cause",
      photo: "photo.jpeg",
      control: "prevention",
      explanation: "explanation"
    };
    component.file = { name: "image.jpg", size: 40000000 };
    component.diagnosisInformationForm.setValue(value);
    requestMock.postData.and.returnValue(of(getDiagnosisData));
    component.onSubmit();
    expect(component.updatedDiagnosisInformation).toEqual(
      getDiagnosisData["data"][0]
    );
  });

  it("should successfully call onSubmit() when photo is absent", () => {
    const value = {
      name: "name",
      crop: "crop",
      cause: "cause",
      photo: null,
      control: "prevention",
      explanation: "explanation"
    };
    component.diagnosisInformationForm.setValue(value);
    requestMock.postData.and.returnValue(of(getDiagnosisData));
    component.onSubmit();
    expect(component.updatedDiagnosisInformation).toEqual(
      getDiagnosisData["data"][0]
    );
  });

  it("should successfully call editDiagnosisInformation()", () => {
    const value = {
      name: "name",
      crop: "crop",
      cause: "cause",
      photo: null,
      control: "prevention",
      explanation: "explanation"
    };
    component.diagnosisId = "hoiia023-232n";
    component.category = "pest";
    requestMock.postData.and.returnValue(of(getDiagnosisData));
    component.editDiagnosisInformation(value);
    expect(component.updatedDiagnosisInformation).toEqual(
      getDiagnosisData["data"][0]
    );
    expect(component.status).toEqual("Success");
    expect(component.message).toEqual("Pest info has been successfully edited");
  });

  it("should return error if editDiagnosisInformation() was not successful", () => {
    const value = {
      name: "name",
      crop: "crop",
      cause: "cause",
      photo: null,
      control: "prevention",
      explanation: "explanation"
    };
    component.diagnosisId = "hoiia023-232n";
    component.category = "pest";
    requestMock.postData.and.returnValue(throwError({}));
    component.editDiagnosisInformation(value);
    expect(component.editDiagnosticInformationLoading).toBe(false);
    expect(component.status).toEqual("Failure");
    expect(component.message).toEqual("An error occurred. Please try again");
  });
});
