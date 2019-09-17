import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-dashboard-navigation',
  templateUrl: './app-dashboard-navigation.component.html',
  styleUrls: ['./app-dashboard-navigation.component.scss']
})
export class AppDashboardNavigationComponent implements OnInit{
  public href: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.href = this.router.url;
  }
  isPage (page) {
    return this.href.includes(page);
  }
}
