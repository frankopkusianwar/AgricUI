import { Component, OnInit } from '@angular/core';
import { DateService } from '../../_services/date.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  constructor(public dateService: DateService) {}
}
