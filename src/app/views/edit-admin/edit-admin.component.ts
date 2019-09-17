import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { RequestsService } from 'src/app/_shared/services/requests.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/_shared/utils/base-component';
@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.scss']
})
export class EditAdminComponent extends BaseComponent implements OnInit {
  adminForm: FormGroup;
  errors: string;
  message: string;
  success: boolean;
  loading: boolean = false;
  submitted: boolean = false;
  confirm_password: boolean = false;
  title: string = 'Edit Admin Account';
  db_errors: string = null;
  id: string;
  data: any;

  constructor(
    private formBuilder: FormBuilder,
    requestService: RequestsService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    super(requestService);
  }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    this.getUser(this.id);
    this.adminForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      email: ['', [Validators.email]],
      adminRole: ['']
    });
  }

  cancel() {
    this.router.navigateByUrl('/admins');
  }

  editAdmin(action, id, data) {
    this.loading = true;
    this.requestService.patch(action, id, data).subscribe(
      (res: any) => {
        this.loading = false;
        this.message = res.message;
        this.success = true;
        this.router.navigateByUrl('/admins');
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
      const { value } = this.adminForm;
      const values = {};
      for (const [key, keyValue] of Object.entries(value)) {
        if (keyValue) values[key] = keyValue;
      }
      if (
        Object.values(values)
          .join()
          .trim().length > 0
      )
        this.editAdmin('account', this.id, values);
    }
  }
}
