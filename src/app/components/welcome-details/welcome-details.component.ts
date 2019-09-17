import { Component } from '@angular/core';
import { DateService } from '../../_services/date.service';

@Component({
  selector: 'app-welcome-details',
  templateUrl: './welcome-details.component.html',
  styleUrls: ['./welcome-details.component.scss']
})
export class WelcomeDetailsComponent {
  today: number = Date.now();
  src: string;

  constructor(public dateService: DateService) {}

  toggleVideo() {
    this.src = this.src ? '' : '../../assets/videos/akorion_services.mp4';
  }
}
