import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgronomicalComponent } from './agronomical.component';
import { AppDashboardNavigationComponent } from 'src/app/components/app-dashboard-navigation/app-dashboard-navigation.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminApiCallsService } from 'src/app/_services/admin-api-calls.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';

describe('AgronomicalComponent', () => {
  let component: AgronomicalComponent;
  let fixture: ComponentFixture<AgronomicalComponent>;
  const authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);
  authMock.getCurrentUserValue.and.returnValue({ user: '' });
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AgronomicalComponent,
        AppDashboardNavigationComponent,
        NavigationComponent
      ],
      imports: [NgxPaginationModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
        AdminApiCallsService,
        { provide: AuthenticationService, useValue: authMock }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgronomicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
