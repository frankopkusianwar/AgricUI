import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { RequestsService } from "../../_shared/services/requests.service";

@Component({
  selector: "app-edit-input",
  templateUrl: "./edit-input.component.html",
  styleUrls: ["./edit-input.component.scss"]
})
export class EditInputComponent implements OnInit {
  constructor(private RequestService: RequestsService) { }
  @Input() InputId;
  @Output() successEvent = new EventEmitter();
  @Output() successMessage = new EventEmitter();
  ngOnInit() { }
  ngOnChanges() {
    this.getInputDetails(this.InputId);
  }

  /**
   * OnSubmit method allows user to update input
   */
  submitted = false;
  loading = false;
  loadingModal = false;
  viewInput = null;
  errors: any = null;
  /**category array */
  categories = [
    "Seeds",
    "Pesticide",
    "Herbicide",
    "Fertilizer",
    "Farming Tools"
  ];
  selectedImage: File = null;
  changeImage(event) {
    this.selectedImage = <File>event.target.files[0];
  }

  getInputDetails(id: string): void {
    this.loadingModal = true;
    const URL = `inputs/${id}`;
    this.RequestService.get(URL, null).subscribe(
      response => {
        this.loadingModal = false;
        this.viewInput = response.result;
      },
      errorResponse => this.catchError(errorResponse)
    );
  }

  updateInput(updateInputForm, id) {
    this.loading = true;
    const form = updateInputForm;
    const URL = `inputs/${id}`;
    let formData = new FormData();

    formData.append("name", form.name);
    formData.append("category", form.category);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("unit", form.unit);
    formData.append("crops", form.crops);
    formData.append("supplier", form.supplier);
    formData.append("quantity", form.quantity);
    if (this.selectedImage)
      formData.append("photo", this.selectedImage, this.selectedImage.name);
    formData.append("_method", "PUT");
    this.RequestService.putWithImage(URL, formData).subscribe(
      response => {
        this.submitted = true;
        this.successMessage.emit(response.message);
        this.reloadInputs();
      },
      error => this.catchError(error)
    );
  }
  catchError(errorResponse) {
    this.loadingModal = false;
    this.loading = false;
    const { error } = errorResponse;
    return (this.errors = error.error);
  }
  reloadInputs() {
    return this.successEvent.emit();
  }
}
