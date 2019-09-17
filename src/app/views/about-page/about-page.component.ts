import { Component, OnInit } from '@angular/core';
import { DateService } from '../../_services/date.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent {
  constructor(public dateService: DateService) {}
}
