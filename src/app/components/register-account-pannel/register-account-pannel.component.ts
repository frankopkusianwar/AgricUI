import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RequestsService } from 'src/app/_shared/services/requests.service';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { BaseComponent } from 'src/app/_shared/utils/base-component';
@Component({
  selector: 'app-register-account-pannel',
  templateUrl: './register-account-pannel.component.html',
  styleUrls: ['./register-account-pannel.component.scss']
})
export class RegisterAccountPannelComponent extends BaseComponent
  implements OnInit {
  password: string;
  @Output() formEvent = new EventEmitter<any>();

  district = [
    'Bukomansimbi',
    'Kyenjojo',
    'Buliisa',
    'Jinja',
    'Kitgum',
    'Mukono',
    'Amuru',
    'Oyam',
    'Buvuma',
    'Pader',
    'Kween',
    'Arua',
    'Kamwenge',
    'Mbarara',
    'Amuria',
    'Apac',
    'Mbale',
    'Luuka',
    'Kampala',
    'Kibingo',
    'Kotido',
    'Kabarole',
    'Mitooma',
    'Sironko',
    'Maracha',
    'Nakapiripiti',
    'Buikwe',
    'Kasese',
    'Mubende',
    'Kanungu',
    'Kaabong',
    'Kayunga',
    'Agago'
  ];

  /**
   * @description constructor
   * @param authenticationService
   * @param formBuilder
   */
  constructor(
    private formBuilder: FormBuilder,
    requestService: RequestsService
  ) {
    super(requestService);
  }
  ngOnInit() {
    this.Form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      account_name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      phone_number: [
        '',
        [
          Validators.required,
          Validators.maxLength(17),
          Validators.minLength(11)
        ]
      ],
      address: ['', [Validators.required]],
      contact_person: ['', [Validators.required]],
      district: ['', [Validators.required]],
      value_chain: ['', [Validators.required]],
      password: ['', [Validators.required]],
      account_type: ['', [Validators.required]]
    });
  }

  generatePassword() {
    let result = '';
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (var i = 0; i < 15; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.Form.patchValue({
      password: result
    });
  }
}
