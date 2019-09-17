import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { DateService } from '../../_services/date.service';
import { RequestsService } from '../../_shared/services/requests.service';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss']
})
export class ForgotPasswordPageComponent {
  today: number = Date.now();
  src: string;
  serverError: boolean;
  loading = false;
  message: string;

  forgetPassword = new FormGroup({
    emailAddress: new FormControl('', [
      Validators.required,
      Validators.email
    ])
  });

  constructor(
    public dateService: DateService,
    private apiService: RequestsService,
    private formBuilder: FormBuilder
  ) {}

  onSubmit() {
    this.loading = true;
    this.apiService
      .post('auth/forgot-password',  {
        email: this.forgetPassword.get('emailAddress').value
      })
      .subscribe(
        (success: { message }) => {
          this.serverError = false;
          this.message = success.message;
          this.resetForm();
        },
        (error: any) => {
          this.serverError = true;
          this.message = error.error.message;
          this.loading = !this.loading;
        }
      );
  }

  resetForm() {
    this.forgetPassword.reset();
    this.loading = !this.loading;
  }

  get email() {
    return this.forgetPassword.get('emailAddress');
  }
}
