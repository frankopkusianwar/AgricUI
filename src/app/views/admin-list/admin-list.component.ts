import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/_shared/services/requests.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {
  title: string = 'Admin Accounts';
  type: string = 'admin';
  data: any;
  loading: boolean = true;
  error: string = null;
  private page: number = 1;
  private count: number = 20;
  selectedUser: any;
  id: string;
  action: string;
  success: boolean;
  message: string;
  db_error: string;

  constructor(
    private requestService: RequestsService,
    private router: Router
  ) {}

  ngOnInit(): any {
    this.getAdmin();
  }

  getAdmin() {
    this.loading;
    this.requestService.get('admins', null).subscribe((res: any) => {
      this.loading = false;
      this.data = res.result;
    });
  }

  getUrl(user) {
    this.setAction(user, null);
    this.router.navigateByUrl(`/admin/account/${this.selectedUser._id}`);
  }

  setAction(user, action) {
    this.selectedUser = user;
    this.action = action;
  }

  deleteAccount(id) {
    this.requestService.delete(id, 'account').subscribe(
      res => {
        this.success = true;
        this.message = res.message;
        this.getAdmin();
      },
      error => {
        this.success = false;
        this.db_error = error.error;
      }
    );
  }
}
