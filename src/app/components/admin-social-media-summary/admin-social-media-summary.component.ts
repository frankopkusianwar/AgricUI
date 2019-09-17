import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-social-media-summary',
  templateUrl: './admin-social-media-summary.component.html',
  styleUrls: ['./admin-social-media-summary.component.scss']
})
export class AdminSocialMediaSummaryComponent {
  @Input() twitterReport;
  @Input() facebookReport;
  @Input() youtubeReport;
}
