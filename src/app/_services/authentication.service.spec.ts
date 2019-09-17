import { TestBed, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

describe('AuthenticationService', () => {
  let injector: TestBed;
  let authService: AuthenticationService;
  const routeMock: any = { snapshot: {} };
  const routeStateMock: any = { snapshot: {}, url: '/cookies' };
  const routerMock = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        AuthenticationService,
        { provide: Router, useValue: routerMock }
      ]
    });

    injector = getTestBed();
    authService = injector.get(AuthenticationService);

    const store = {};

    spyOn(localStorage, 'getItem').and.callFake(
      (key: string): String => {
        return store[key] || null;
      }
    );

    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string): string => {
        return (store[key] =  value as string);
      }
    );

    spyOn(localStorage, 'removeItem').and.callFake(
      (key: string): void => {
        delete store[key];
      }
    );
  });

  const user = { token: 'sometoken' };
  it('should create authentication service', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });

  it('should set current user', () => {
    spyOn(authService, 'initUser');
    authService.currentUser = new BehaviorSubject(null);
    authService.setCurrentUserValue({});
    expect(authService.initUser).toHaveBeenCalled();
  });
  it('should logout unauthorized user', () => {
    authService.currentUser = new BehaviorSubject(null);
    authService.logout();
    expect(localStorage.removeItem).toHaveBeenCalled();
  });

  it('should store logged in user', () => {
    authService.currentUser = null;
    localStorage.setItem("currentUser", `{"name": "emmsdan"}`);
    authService.initUser();
    authService.getCurrentUserValue();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
});
