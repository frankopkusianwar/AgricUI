import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { DateService } from '../../_services/date.service';
import { RequestsService } from 'src/app/_shared/services/requests.service';
import { BaseComponent } from 'src/app/_shared/utils/base-component';

@Component({
  selector: 'app-request-account-pannel',
  templateUrl: './request-account-pannel.component.html',
  styleUrls: ['./request-account-pannel.component.scss']
})
export class RequestAccountPannelComponent extends BaseComponent {
  today: number = Date.now();

  /**
   * @description constructor
   * @param authenticationService
   * @param formBuilder
   * @param route
   * @param router
   * @param alert
   */
  constructor(
    private formBuilder: FormBuilder,
    public dateService: DateService,
    requestService: RequestsService
  ) {
    super(requestService);
  }

  ngOnInit() {
    this.Form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phonenumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(17),
          Validators.minLength(11)
        ]
      ],
      address: ['', [Validators.required]]
    });
  }
}
