import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { RequestsService } from "src/app/_shared/services/requests.service";

@Component({
  selector: "app-add-input",
  templateUrl: "./add-input.component.html",
  styleUrls: ["./add-input.component.scss"]
})
export class AddInputComponent implements OnInit {
  @Input() addInput;
  @Output() successEvent = new EventEmitter();
  @Output() successMessage = new EventEmitter();

  success = false;
  loading = false;
  db_errors: string = null;
  errors: string;
  constructor(private RequestService: RequestsService) {}

  ngOnInit() {}
  selectedImage: File = null;
  changeImage(event) {
    this.selectedImage = <File>event.target.files[0];
  }

  createInput(createInputForm) {
    const form = createInputForm;
    const URL = `inputs`;
    this.loading = true;
    let formData = new FormData();
    formData.append("name", form.name);
    formData.append("category", form.category);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("unit", form.unit);
    formData.append("crops", form.crops);
    formData.append("supplier", form.supplier);
    formData.append("quantity", form.quantity);
    if (this.selectedImage) {
      formData.append("photo", this.selectedImage, this.selectedImage.name);
    }
    this.RequestService.putWithImage(URL, formData).subscribe(
      response => {
        this.loading = false;
        this.success = true;
        this.successMessage.emit("Input inserted successfully");
        this.refresh();
      },
      error => this.handlerError(error)
    );
  }
  refresh() {
    this.successEvent.emit();
  }
  handlerError(error) {
    this.loading = false;
    this.db_errors = error.error.error;
  }
}
