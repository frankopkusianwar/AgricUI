import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpInterceptorsService } from './http-interceptors.service';
import { AuthenticationService } from './authentication.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { of, throwError } from 'rxjs';

describe('HttpInterceptorsService', () => {
  let interceptorService: HttpInterceptorsService;
  let httpMock: HttpTestingController;
  let authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);

  authMock.getCurrentUserValue.and.returnValue({ user: '' });
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpInterceptorsService,
        { provide: AuthenticationService, useValue: authMock }
      ],
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
    interceptorService = TestBed.get(HttpInterceptorsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created interceptorService', () => {
    expect(interceptorService).toBeTruthy();
  });

  it('should call interceptor', () => {
    const reqSpy = jasmine.createSpyObj('HttpRequest', ['clone']);
    const httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
    authMock.getCurrentUserValue.and.returnValue({ token: 'abc' });
    httpHandlerSpy.handle.and.returnValue(of());

    interceptorService.intercept(reqSpy, httpHandlerSpy);
    expect(reqSpy.clone).toHaveBeenCalledWith({
      setHeaders: {
        Authorization: 'abc'
      }
    });
  });
});
