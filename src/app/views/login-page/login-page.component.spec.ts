import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { LoginPageComponent } from "./login-page.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { WelcomeDetailsComponent } from "../../components/welcome-details/welcome-details.component";
import { LandingHeaderComponent } from "../../components/landing-header/landing-header.component";

describe("LoginPageComponent", () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginPageComponent,
        LandingHeaderComponent,
        WelcomeDetailsComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: "**", component: LandingHeaderComponent }
        ]),
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  }));

  it("should create the login component", () => {
    expect(component).toBeTruthy();
  });

  it("Clear message", () => {
    let input = fixture.debugElement.query(By.css("input"));

    input.triggerEventHandler("keyup", null);
    fixture.detectChanges();
    spyOn(component, "clearMessage");
    expect(component.error).toEqual("");
  });

  it("should submit form if form is valid", () => {
    fixture.ngZone.run(() => {
      expect(component.loginForm.valid).toBeFalsy();
      component.loginForm.controls["email"].setValue("test@test.com");

      component.loginForm.controls["password"].setValue("123456789");

      expect(component.loginForm.valid).toBeTruthy();

      component.handleSubmit(component.loginForm);
      component.showHome("admin");
      expect(component.submitted).toBe(true);
    });
  });

  it("should return error if form is invalid", () => {
    fixture.ngZone.run(() => {
      expect(component.loginForm.valid).toBeFalsy();
      component.loginForm.controls["email"].setValue("");

      component.loginForm.controls["password"].setValue("123456789");

      expect(component.loginForm.valid).toBeFalsy();

      component.handleSubmit(component.loginForm);
      component.showHome("");
      expect(component.submitted).toBe(true);
    });
  });
});
