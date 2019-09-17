import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed
} from '@angular/core/testing';

import { DevtpartnerComponent } from './devtpartner.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { DataTableComponent } from 'src/app/components/data-table/data-table.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditModalComponent } from 'src/app/components/edit-modal/edit-modal.component';
import { FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrderModule } from 'ngx-order-pipe';

describe('DevtpartnerComponent', () => {
  let component: DevtpartnerComponent;
  let fixture: ComponentFixture<DevtpartnerComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let authService: AuthenticationService;
  let authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);
  let injector: TestBed;
  authMock.getCurrentUserValue.and.returnValue({ user: '' });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DevtpartnerComponent,
        NavigationComponent,
        DataTableComponent,
        EditModalComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgxPaginationModule,
        OrderModule
      ],
      providers: [
        {
          provide: FormBuilder,
          useValue: formBuilder
        },
        { provide: AuthenticationService, useValue: authMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(DevtpartnerComponent);
    component = fixture.componentInstance;
    injector = getTestBed();
    authService = injector.get(AuthenticationService);
  }));

  it('should create devtpartner component', () => {
    expect(component).toBeTruthy();
  });
});
