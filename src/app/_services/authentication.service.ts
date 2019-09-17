import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { User } from '../_models/User';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: BehaviorSubject<User>;
  constructor(private http: HttpClient, private router: Router) {}

  public getCurrentUserValue(): User {
    let user = localStorage.getItem('currentUser');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  public setCurrentUserValue(user: User) {
    this.initUser();
    this.currentUser.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  loginUser(values: any): Observable<any> {
    return this.http.post(`${environment.API_URL}/auth/login`, { ...values });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  public initUser() {
    if (!this.currentUser) {
      this.currentUser = new BehaviorSubject<User>(null);
    }
  }

  isLoggedIn(): boolean {
    const user = this.getCurrentUserValue();
    if (user) {
      this.initUser();
      this.currentUser.next(user);
      return true;
    }
    return false;
  }
}
