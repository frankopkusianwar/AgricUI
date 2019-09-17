import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputsComponent } from './inputs.component';
import { AppDashboardNavigationComponent } from 'src/app/components/app-dashboard-navigation/app-dashboard-navigation.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminApiCallsService } from 'src/app/_services/admin-api-calls.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';

describe('InputsComponent', () => {
  let component: InputsComponent;
  let fixture: ComponentFixture<InputsComponent>;
  const authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);
  authMock.getCurrentUserValue.and.returnValue({ user: '' });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InputsComponent,
        AppDashboardNavigationComponent,
        NavigationComponent
      ],
      imports: [NgxPaginationModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
        AdminApiCallsService,
        { provide: AuthenticationService, useValue: authMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
