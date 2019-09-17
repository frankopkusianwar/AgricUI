import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../_shared/services/requests.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent {
  message: string;
  loading: boolean;

  contactForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z -]*')
    ]),
    message: new FormControl('', [Validators.required])
  });

  constructor(private readonly request: RequestsService) {}

  onSubmit() {
    this.loading = true;
    this.request
      .post('contact', {
        message: this.contactForm.get('message').value,
        email: this.contactForm.get('email').value,
        name: this.contactForm.get('name').value
      })
      .subscribe(res => {
        this.message = res.message;
        this.loading = false;
        this.contactForm.reset();
      });
  }
  get email() {
    return this.contactForm.get('email');
  }

  get name() {
    return this.contactForm.get('name');
  }
}
