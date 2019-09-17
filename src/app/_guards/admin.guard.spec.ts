import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { testModules } from '../_shared/tests/testModules';

describe('AdminGuard', () => {
  let adminGuard: AdminGuard;
  let routerMock = { navigate: jasmine.createSpy('navigate') };
  let authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue',
    'logout'
  ]);

  authMock.getCurrentUserValue.and.returnValue({ type: '' });
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...testModules],
      providers: [
        AdminGuard,
        { provide: AuthenticationService, useValue: authMock }
      ]
    });
    adminGuard = TestBed.get(AdminGuard);
  });

  it('should create admin guard', inject([AdminGuard], (guard: AdminGuard) => {
    expect(guard).toBeTruthy();
  }));
  it('should log out user if not admin', () => {
    adminGuard.canActivate(null, null);
    expect(authMock.logout).toHaveBeenCalled();
  });

  it('should log out user if not admin', () => {
    authMock.getCurrentUserValue.and.returnValue({ type: 'admin' });

    const expected = adminGuard.canActivate(null, null);
    expect(expected).toBe(true);
  });
});
