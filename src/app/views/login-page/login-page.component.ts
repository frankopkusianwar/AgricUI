import { Component, OnInit, OnDestroy } from '@angular/core';
import { DateService } from '../../_services/date.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  today: number = Date.now();
  src: string = '';
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;
  error = null;
  message: string = '';
  isLoggedIn = false;
  private subscription = new Subscription();
  /**
   * @description constructor
   * @param authenticationService
   * @param formBuilder
   * @param route
   * @param router
   * @param alert
   */
  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dateService: DateService
  ) {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  ngOnInit() {
    if (this.authenticationService.isLoggedIn()) {
      const user = this.authenticationService.getCurrentUserValue();
      if (this.authenticationService.isLoggedIn()) {
        this.showHome(user.type);
      }
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clearMessage() {
    this.error = '';
  }

  handleSubmit(formData: any) {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.login();
    }
    return;
  }
  showHome(type: string) {
    if (type === 'admin') {
      this.router.navigateByUrl('/admin_dashboard');
    } else {
      this.router.navigateByUrl('/');
    }
  }
  /**
   * @returns {object} http response
   */
  login() {
    this.loading = true;
    this.clearMessage();
    this.authenticationService.loginUser(this.loginForm.value).subscribe(
      (res: any) => {
        this.loading = false;
        this.authenticationService.setCurrentUserValue({
          ...res.user,
          token: res.token
        });
        const { type } = res.user;
        this.showHome(type);
      },
      error => {
        this.loading = false;
        this.error = error.error.error;
      }
    );
  }
}
