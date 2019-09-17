import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-application-activity-summary',
  templateUrl: './application-activity-summary.component.html',
  styleUrls: ['./application-activity-summary.component.scss']
})
export class ApplicationActivitySummaryComponent {
  @Input() activeMobileUsers: any;
  @Input() numberOfVisitors: any;
}
