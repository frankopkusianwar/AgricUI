import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { DateService } from '../../_services/date.service';
import { HttpParams } from '@angular/common/http';
import { RequestsService } from '../../_shared/services/requests.service';

@Component({
  selector: 'app-confirm-password-page',
  templateUrl: './confirm-password-page.component.html',
  styleUrls: ['./confirm-password-page.component.scss']
})
export class ConfirmPasswordPageComponent implements OnInit {
  httpParams: HttpParams;
  src: string;
  serverError: boolean;
  loading = false;
  message: string;
  token: string;
  validToken = true;

  confirmPassword = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    newPassword2: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    this.apiService
      .post('auth/password-verification-token',{ token: this.token })
      .subscribe(() => {}, error => {

        this.validToken = false;
        this.message = 'Link has either expired or is invalid. Please request a new one or login.';
      });
  }

  constructor(
    public dateService: DateService,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: RequestsService
  ) {
    this.token = this.route.snapshot.queryParams.token;
  }

  onSubmit() {
    this.loading = true;
    this.apiService
      .put('auth/confirm-password', {
        password: this.confirmPassword.get('newPassword').value,
        token: this.token
      })
      .subscribe(
        (success: { message }) => {
          this.serverError = false;
          this.message = `${success.message}`;
          this.resetForm();
        },
        (error: any) => {
          this.serverError = true;
          this.message = error.error.message;
        }
      );
  }

  resetForm() {
    this.confirmPassword.reset();
    this.loading = !this.loading;
  }

  get newPassword() {
    return this.confirmPassword.get('newPassword');
  }
  get newPassword2() {
    return this.confirmPassword.get('newPassword2');
  }
}
