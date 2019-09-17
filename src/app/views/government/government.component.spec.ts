import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed
} from '@angular/core/testing';

import { GovernmentComponent } from './government.component';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { DataTableComponent } from 'src/app/components/data-table/data-table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { EditModalComponent } from 'src/app/components/edit-modal/edit-modal.component';
import { FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrderModule } from 'ngx-order-pipe';

describe('GovernmentComponent', () => {
  let component: GovernmentComponent;
  let fixture: ComponentFixture<GovernmentComponent>;
  let authService: AuthenticationService;
  const formBuilder: FormBuilder = new FormBuilder();
  let authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);
  let injector: TestBed;
  authMock.getCurrentUserValue.and.returnValue({ user: '' });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GovernmentComponent,
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
    fixture = TestBed.createComponent(GovernmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
