import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminListComponent } from './admin-list.component';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RequestsService } from 'src/app/_shared/services/requests.service';
import { requestMock } from 'src/app/_shared/tests/spies.spec';
import { of, throwError} from 'rxjs';
import { AuthenticationService } from 'src/app/_services/authentication.service';

describe('AdminListComponent', () => {
  let component: AdminListComponent;
  let fixture: ComponentFixture<AdminListComponent>;
  let injector: TestBed;
  let requestService: RequestsService;
  let authService: AuthenticationService;
  let authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);

  authMock.getCurrentUserValue.and.returnValue({ user: '' });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminListComponent, NavigationComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: '**', component: NavigationComponent }
        ]),
        HttpClientTestingModule,
        ReactiveFormsModule,
        NgxPaginationModule
      ],
      providers: [
        { provide: RequestsService, useValue: requestMock },
        { provide: AuthenticationService, useValue: authMock }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AdminListComponent);
    component = fixture.componentInstance;
    injector = getTestBed();
  }));
  const result = [
    {
      _id: '-0m-bri',
      firstname: 'letty',
      lastname: 'letty',
      contact_person: 'letty',
      phonenumber: '09098987676',
      value_chain: 'Crop',
      status: 'demo'
    }
  ];

  requestMock.get.and.returnValue(of({ result }));
  requestMock.patch.and.returnValue(of({ result }));
  requestMock.delete.and.returnValue(of({}));

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  beforeAll(() => {
    requestMock.get.calls.reset();
    requestMock.patch.calls.reset();
    requestMock.delete.calls.reset();
  });

  afterEach(() => {
    requestMock.get.calls.reset();
    requestMock.patch.calls.reset();
    requestMock.delete.calls.reset();
  });

  it('should create AdminListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger edit action', () => {
    component.getUrl(result);
    fixture.detectChanges();
    expect(component.setAction).toHaveBeenCalled;
  });

  it('should delete user', () => {
    const res = {
      success: true,
      message: ''
    };
    requestMock.delete.and.returnValue(of(res));
    component.action = 'delete';
    component.selectedUser = result[0];
    component.deleteAccount(result[0]._id);
    fixture.detectChanges();
    expect(component.message).toEqual(res.message);
  });

  it('should return error if deleting user was unsuccessful', () => {
    const errorResponse = {
      success: false,
      error: ''
    };
    requestMock.delete.and.returnValue(throwError(errorResponse));
    component.action = 'delete';
    component.selectedUser = result[0];
    component.deleteAccount(result[0]._id);
    fixture.detectChanges();
    expect(component.success).toBe(false);
    expect(component.db_error).toBe(errorResponse.error);
  });
});
