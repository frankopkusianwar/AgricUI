import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthGuard } from './auth.guard';
import { AuthenticationService } from '../_services/authentication.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let injector: TestBed;
  let authGuard: AuthGuard;
  let authService: AuthenticationService;
  let routeMock: any = { snapshot: {} };
  let routeStateMock: any = { snapshot: {}, url: '/cookies' };
  let routerMock = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        CommonModule
      ],
      providers: [
        AuthGuard,
        AuthenticationService,
        { provide: Router, useValue: routerMock }
      ]
    });
    injector = getTestBed();
    authService = injector.get(AuthenticationService);
    authGuard = injector.get(AuthGuard);
  });

  it('should create authentication guard', inject(
    [AuthGuard],
    (guard: AuthGuard) => {
      expect(guard).toBeTruthy();
    }
  ));
  it('should redirect an unauthenticated user to the login route', () => {
    spyOn(authService, 'getCurrentUserValue').and.returnValue(false);
    expect(authGuard.canActivate(routeMock, routeStateMock)).toEqual(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });
  it('should allow the authenticated user to access app', () => {
    spyOn(authService, 'getCurrentUserValue').and.returnValue(true);
    expect(authGuard.canActivate(routeMock, routeStateMock)).toEqual(true);
  });
});
