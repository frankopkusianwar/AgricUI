import { Component, OnInit, Input } from "@angular/core";
import { RequestsService } from "../../_shared/services/requests.service";

@Component({
  selector: "app-input-list",
  templateUrl: "./inputs-table.component.html",
  styleUrls: ["./inputs-table.component.scss"]
})
export class InputTableComponent implements OnInit {
  constructor(private RequestService: RequestsService) { }
  page = 1;
  count = 10;
  errors = null;
  success = false;
  message = null;
  Inputname = null;
  InputId = null;
  loading: boolean = false;
  inputs: [];
  openDeleteModal: boolean = false;
  openEditModal: boolean = false;
  openAddModal: boolean = false;
  openSuccessModal: boolean = false;
  ngOnInit() {
    this.reloadInput();
  }
  getAllInput(): void {
    this.loading = true;
    const url = "input-list";
    this.RequestService.get(url, null).subscribe(response => {
      this.loading = false;
      this.inputs = response;
    });
  }
  viewInput(id: string): void {
    this.InputId = id;
    this.openAddModal = false;
    this.openDeleteModal = false;
    this.openSuccessModal = false;
    this.openEditModal = true;
  }

  prepareToDeleteInput(id: string, name: string) {
    this.Inputname = name;
    this.InputId = id;
    this.openAddModal = false;
    this.openEditModal = false;
    this.openSuccessModal = false;
    this.openDeleteModal = true;
  }
  prepareToAddInput() {
    this.openEditModal = false;
    this.openDeleteModal = false;
    this.openSuccessModal = false;
    this.openAddModal = true;
  }
  deleteInput(id) {
    this.InputId = null;
    this.loading = true;
    this.RequestService.delete(id, "inputs").subscribe(
      response => {
        this.loading = false;
        this.success = true;
        this.message = response.message;
        // load modal
        this.openEditModal = false;
        this.openDeleteModal = false;
        this.openAddModal = false;
        this.openSuccessModal = true;
        this.reloadInput();
      },
      errorResponse => {
        this.loading = false;
        const { error } = errorResponse;
        return (this.errors = error.error);
      }
    );
  }

  reloadInput() {
    this.getAllInput();
  }
  clearInputId() {
    this.InputId = null;
  }
  getMessage(message: string) {
    this.message = message;
    // load modal
    this.openEditModal = false;
    this.openDeleteModal = false;
    this.openAddModal = false;
    this.openSuccessModal = true;
  }
}
