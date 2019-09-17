import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { RequestsService } from 'src/app/_shared/services/requests.service';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/_shared/utils/base-component';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent extends BaseComponent implements OnInit {
  @Input() id: string;
  @Input() userId: string;
  @Input() accountUrl: string;
  submitted: boolean = false;
  success: boolean = false;
  form: FormGroup;
  loading: boolean = false;
  data: any;
  message: string;

  @Output() EditAcct = new EventEmitter();
  @Output() modalClose = new EventEmitter();
  
  constructor(
    private formBuilder: FormBuilder,
    requestService: RequestsService,
    private router: Router
  ) {
    super(requestService);
  }

  ngOnInit() {
    this.getUser(this.userId);
    this.form = this.formBuilder.group({
      phonenumber: ['', [Validators.maxLength(17), Validators.minLength(11)]],
      contact_person: [''],
      value_chain: [''],
      account_name: [''],
      username: ['']
    });
  }

  editUser(id: string, data: object) {
    this.loading = true;
    this.requestService.patch('account', id, data).subscribe(
      res => {
        this.loading = false;
        this.message = res.message;
        this.success = true;
      },
      error => {
        this.loading = false;
        this.db_errors = error.error;
      }
    );
  }

  closeModal() {
    this.success = false;
    this.id = null;
    this.EditAcct.emit({});
    this.modalClose.emit();
  }

  handleSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      const { value } = this.form;
      const values = {};
      for (const [key, keyValue] of Object.entries(value)) {
        if (keyValue) values[key] = keyValue;
      }
      if (
        Object.values(values)
          .join()
          .trim().length > 0
      )
        this.editUser(this.userId, values);
    }
    return;
  }
}
