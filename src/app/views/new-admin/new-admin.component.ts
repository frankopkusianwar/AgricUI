import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { RequestsService } from 'src/app/_shared/services/requests.service';

@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.scss']
})
export class NewAdminComponent implements OnInit {
  adminForm: FormGroup;
  errors: string;
  success: boolean;
  loading: boolean = false;
  submitted: boolean = false;
  confirm_password: boolean = false;
  title: string = 'New Admin Account';
  db_errors: string = null;
  isConfirmed: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private requestService: RequestsService
  ) {}

  ngOnInit() {
    this.adminForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      adminRole: ['', [Validators.required]]
    });
  }

  clearMessage() {
    this.errors = '';
    this.success = false;
    this.db_errors = '';
  }

  get password() {
    return this.adminForm.get('password');
  }
  get confirmedPassword() {
    return this.adminForm.get('confirmPassword');
  }

  comparePassword() {
    return this.password.value === this.confirmedPassword.value;
  }

  registerAdmin(form: object) {
    this.loading = true;
    this.clearMessage();
    this.requestService.post('admin', form).subscribe(
      res => {
        this.loading = false;
        this.success = true;
      },
      error => {
        this.loading = false;
        this.db_errors = error.error;
      }
    );
  }

  handleSubmit() {
    this.submitted = true;
    if (this.adminForm.valid) {
      this.isConfirmed = this.comparePassword();
      const { value } = this.adminForm;
      this.isConfirmed ? this.registerAdmin(value) : false;
    }
  }
}
