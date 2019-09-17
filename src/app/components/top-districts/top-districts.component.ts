import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-top-districts',
  templateUrl: './top-districts.component.html',
  styleUrls: ['./top-districts.component.scss']
})
export class TopDistrictsComponent {
  @Input() topPerformingDistricts;
  @Input() topPerformingMasterAgents;
}
