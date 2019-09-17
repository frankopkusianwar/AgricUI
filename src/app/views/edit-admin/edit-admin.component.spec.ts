import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed
} from "@angular/core/testing";

import { EditAdminComponent } from "./edit-admin.component";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ReactiveFormsModule, FormsModule, FormBuilder } from "@angular/forms";
import { NavigationComponent } from "src/app/components/navigation/navigation.component";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { RequestsService } from "src/app/_shared/services/requests.service";
import { of, throwError } from "rxjs";
import { ActivatedRoute, convertToParamMap } from "@angular/router";
import { By } from "@angular/platform-browser";
import { requestMock } from "src/app/_shared/tests/spies.spec";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("EditAdminComponent", () => {
  let component: EditAdminComponent;
  let fixture: ComponentFixture<EditAdminComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let injector: TestBed;
  let requestService: RequestsService;
  let authService: AuthenticationService;

  let authMock = jasmine.createSpyObj("AuthenticationService", [
    "getCurrentUserValue"
  ]);
  authMock.getCurrentUserValue.and.returnValue({ user: "" });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditAdminComponent, NavigationComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: "**", component: NavigationComponent }
        ]),
        ReactiveFormsModule,
        FormsModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: FormBuilder,
          useValue: formBuilder
        },
        { provide: RequestsService, useValue: requestMock },
        { provide: AuthenticationService, useValue: authMock }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(EditAdminComponent);
    component = fixture.componentInstance;
    injector = getTestBed();
    requestService = injector.get(RequestsService);
    authService = injector.get(AuthenticationService);
  }));

  beforeAll(() => {
    requestMock.get.calls.reset();
    requestMock.patch.calls.reset();
    requestMock.post.calls.reset();
  });

  afterEach(() => {
    requestMock.get.calls.reset();
    requestMock.patch.calls.reset();
    requestMock.post.calls.reset();
  });

  const result = [
    {
      _id: "QbgS_ws",
      firstname: "letty",
      lastname: "letty",
      contact_person: "letty",
      phonenumber: "09098987676",
      value_chain: "Crop",
      status: "demo"
    }
  ];
  requestMock.get.and.returnValue(of({ result }));
  requestMock.post.and.returnValue(of({ result }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should get user data", () => {
    const id = "QbgS_ws";
    component.getUser(id);
    fixture.detectChanges();
    requestMock.get().subscribe(() => {
      expect(component.loading).toEqual(false);
    });
  });

  it("should successfully edit form if valid", () => {
    fixture.ngZone.run(() => {
      const id = "QbgS_ws";
      fixture.detectChanges();
      component.adminForm.controls["firstname"].setValue("kelvin");
      component.handleSubmit();
      expect(component.submitted).toBe(true);
      component.cancel();
    });
  });

  it("should return error if form is invalid", () => {
    const id = "QbgS_ws";
    fixture.detectChanges();
    component.adminForm.controls["email"].setValue(";;");
    component.handleSubmit();
    expect(component.submitted).toBe(true);
  });
});
