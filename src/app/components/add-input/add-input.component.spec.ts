import { AddInputComponent } from "./add-input.component";
import { RequestsService } from "src/app/_shared/services/requests.service";
import { of, throwError } from "rxjs";

describe("AddInputComponent", () => {
  let component: AddInputComponent;
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
    component = new AddInputComponent(httpMock);
    component.success = false;
    component.loading = false;
  });
  describe("Add Inputs", () => {
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
     * changeImage
     */
    it("Should test changeImage() method", () => {
      const events = {
        target: {
          files: [
            {
              name: "photo"
            }
          ]
        }
      };
      component.changeImage(events);
    });
    /**
     * CreateInput
     */
    it("should test createInput()", () => {
      let form = new FormData();
      form.append("name", "name");
      form.append("category", "category");
      form.append("description", "description");
      form.append("price", "price");
      form.append("unit", "unit");
      form.append("crops", "crops");
      form.append("supplier", "supplier");
      form.append("quantity", "quantity");
      httpMock.putWithImage.and.returnValue(of({ message: {} }));
      component.createInput(form);
      expect(httpMock.putWithImage).toHaveBeenCalledWith(`inputs`, form);
    });
    /**
     * throw error
     */
    it("should throw an error on createInput()", () => {
      let form = new FormData();
      form.append("name", "name");
      form.append("category", "category");
      form.append("description", "description");
      const error = {
        success: false,
        status: 503,
        error: ""
      };
      httpMock.putWithImage.and.returnValue(throwError(error));
      component.createInput(form);
    });
    it("should handlerError()", () => {
      const httpErrors = { error: { error: { error: "something wrong" } } };
      component.handlerError(httpErrors);
      expect(component.loading).toBe(false);
    });
  });
});
