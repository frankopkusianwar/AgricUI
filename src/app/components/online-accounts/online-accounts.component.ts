import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-online-accounts',
  templateUrl: './online-accounts.component.html',
  styleUrls: ['./online-accounts.component.scss']
})
export class OnlineAccountsComponent {
  @Input() topPerformingVillageAgents;
}
