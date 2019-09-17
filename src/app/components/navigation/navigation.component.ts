import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  user: any = '';
  firstname: string;
  lastname: string;
  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUserValue();
    this.firstname = this.user['firstname'];
    this.lastname = this.user['lastname'];
  }

  logOut() {
    this.authService.logout();
  }
}
