import { InputTableComponent } from "./inputs-table.component";
import { RequestsService } from "src/app/_shared/services/requests.service";
import { of, throwError } from "rxjs";

describe("InputsTable Component", () => {
  let component: InputTableComponent;
  let RequestService;
  let httpMock;

  beforeEach(() => {
    httpMock = jasmine.createSpyObj("httpMock", ["delete", "get"]);
    RequestService = new RequestsService(httpMock);
    component = new InputTableComponent(httpMock);
    httpMock.get.and.returnValue(of({ result: '' }));
    component.ngOnInit();
  });
  const inputData = {
    success: true,
    data: [{
      category: "Herbicide",
      crops: ['crops'],
      unit: ['12'],
      price: ['1000'],
      description: 'description',
      supplier: 'supplier',
      quantity: 1
    }]
  };
  describe("Input Table Tests", () => {
    it("should view inputs", () => {
      component.ngOnInit();
      expect(component).toBeTruthy();
    });
    it('should getAllInput()', () => {
      httpMock.get.and.returnValue(of(inputData));
      component.getAllInput();
      expect(component.loading).toBeDefined();
    })
    /**
     * view Input
     */
    it("should viewInputs()", () => {
      const id = "1234";
      component.viewInput(id);
      expect(component).toBeDefined();
    });
    /**
     * prepareToDeleteInput()
     */
    it("should test prepareToDeleteInput()", () => {
      component.InputId = "45";
      component.Inputname = "this is andela";
      component.prepareToDeleteInput(component.InputId, component.Inputname);
      expect(component.openDeleteModal).toBe(true);
      expect(component.openEditModal).toBe(false);
      expect(component.openAddModal).toBe(false);
      expect(component.openSuccessModal).toBe(false);
    });
    /**
     * deleteInput
     */
    it("should test deleteInput()", () => {
      httpMock.delete.and.returnValue(of({ result: {} }));
      const id = "465";
      component.deleteInput(id);
      expect(httpMock.delete).toHaveBeenCalledWith(`${id}`, "inputs");
    });
    /**
     *  clearInputId
     */
    it("should  clearInputId()", () => {
      component.clearInputId();
      expect(component).toBeDefined();
    });
    it("should catch error when deleting diagnosis if 503 error occurred ", () => {
      const error = {
        success: false,
        status: 503,
        error: ""
      };
      httpMock.delete.and.returnValue(throwError(error));
      component.deleteInput("not-id");
    });
    /**
     * prepareToAddInput
     */
    it('should test prepareToAddInput', () => {
      component.prepareToAddInput();
      expect(component.openDeleteModal).toBe(false);
      expect(component.openEditModal).toBe(false);
      expect(component.openAddModal).toBe(true);
      expect(component.openDeleteModal).toBe(false);
    });
    /**
     * getMessage
     */
    it('should test getMessage', () => {
      component.getMessage('successfully created');
      expect(component.openDeleteModal).toBe(false);
      expect(component.openEditModal).toBe(false);
      expect(component.openAddModal).toBe(false);
      expect(component.openDeleteModal).toBe(false);
      expect(component.openSuccessModal).toBe(true);
    })
  });
});
