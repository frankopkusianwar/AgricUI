import { EditInputComponent } from "./edit-input.component";
import { RequestsService } from "src/app/_shared/services/requests.service";
import { InputMock } from "./inputMock";
import { of, throwError } from "rxjs";

describe("EditInputComponent", () => {
  let component: EditInputComponent;
  let RequestService: RequestsService;
  let httpMock;

  beforeEach(() => {
    httpMock = jasmine.createSpyObj("httpMock", [
      "get",
      "delete",
      "put",
      "putWithImage",
      "post"
    ]);
    RequestService = new RequestsService(httpMock);
    component = new EditInputComponent(httpMock);
    component.viewInput = InputMock[0];
    component.submitted = false;
    component.loading = false;
  });
  describe("Edit Inputs", () => {
    it("should run without error", () => {
      expect(component).toBeTruthy();
    });
    /**
     * ngOnInit
     */
    it("should test ngOnInit()", () => {
      component.ngOnInit();
      expect(component).toBeDefined();
    });
    /**
     * ngOnChange
     */
    it("should test ngOnChange() lifecycle", () => {
      httpMock.get.and.returnValue(of({ result: "" }));
      component.ngOnChanges();
      expect(component).toBeDefined();
    });
    /**
     * changeImage
     */
    it("Should test changeImage() method", () => {
      const events = {
        target: {
          files: [
            {
              name: "photo_url"
            }
          ]
        }
      };
      component.changeImage(events);
      expect(component).toBeDefined();
    });
    /**
     * UpdateInput
     */
    it("should test updateInput()", () => {
      let form = new FormData();
      form.append("name", "name");
      form.append("price", "price");
      form.append("unit", "untit");
      form.append("_method", "PUT");
      form.append("supplier", "supplier");
      httpMock.putWithImage.and.returnValue(of({ message: {} }));
      const Id = "12";
      component.updateInput(form, Id);
      expect(httpMock.putWithImage).toHaveBeenCalledWith(`inputs/${Id}`, form);
    });
    /**
     * errorHandler
     */
    it("Should test errorHandler()", () => {
      const httpErrors = { error: { error: "something wrong" } };
      component.catchError(httpErrors);
    });
    it("should catch error on getInputDetails()", () => {
      const error = {
        success: false,
        status: 503,
        error: ''
      };
      httpMock.get.and.returnValue(throwError(error));
      component.getInputDetails('not-id');
    });
    it("should catch error on updateInput()", () => {
      let form = new FormData();
      form.append("name", "name");
      form.append("price", "price");
      form.append("unit", "untit");
      form.append("_method", "PUT");
      form.append("supplier", "supplier");
      const error = {
        success: false,
        status: 503,
        error: ''
      };
      httpMock.putWithImage.and.returnValue(throwError(error));
      component.updateInput(form, 'not-id');
    });
  });
});
