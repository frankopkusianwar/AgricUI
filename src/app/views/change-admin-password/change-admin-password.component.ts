import { Component, OnInit } from '@angular/core';
import { AdminApiCallsService } from '../../_services/admin-api-calls.service';
import {
  VillageAgent,
  InputSupplier,
  Offtaker,
  DevtPartner,
  TopDistrict,
  ActivitySummary,
  TotalAcreage,
  TotalPayment,
  TopProduce
} from '../../interfaces/admin.interface';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-admin-password',
  templateUrl: './change-admin-password.component.html',
  styleUrls: ['./change-admin-password.component.scss']
})
export class ChangeAdminPasswordComponent implements OnInit {
  loading = false;
  errorMessage: string;
  successMessage: string;
  password;
  changeAdminPassword = new FormGroup({
    oldPassword: new FormControl('', [
      Validators.required,
    ]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ])
  });

  constructor(private api: AdminApiCallsService) { }
  ngOnInit() {
  }

  onSubmit() {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.api.postData('change-password', this.password)
      .subscribe((res) => {
        this.successMessage = res.message;
        this.loading = false;
        this.changeAdminPassword.reset();
      }, (errRes) => {
        const { error, message } = errRes.error;
        this.loading = false;
        this.errorMessage = message || error;
      });
  }
  oldPassword() { return this.changeAdminPassword.get('oldPassword'); }

  newPassword() { return this.changeAdminPassword.get('newPassword'); }

  confirmPassword() { return this.changeAdminPassword.get('confirmPassword'); }

  passwordMatch() {
    if (this.newPassword().valid && this.confirmPassword().value !== ''
       && (this.newPassword().value !== this.confirmPassword().value)) {
         return false;
        }
    this.password = {
      oldPassword: this.oldPassword().value,
      newPassword: this.newPassword().value,
    };
    return true;
  }
}
