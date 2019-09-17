import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed
} from '@angular/core/testing';

import { OfftakerComponent } from './offtaker.component';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { DataTableComponent } from 'src/app/components/data-table/data-table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { EditModalComponent } from 'src/app/components/edit-modal/edit-modal.component';
import { FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CSV2JSONModule } from 'angular2-csv2json';
import { OrderModule } from 'ngx-order-pipe';

describe('OfftakerComponent', () => {
  let component: OfftakerComponent;
  let fixture: ComponentFixture<OfftakerComponent>;
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
        OfftakerComponent,
        NavigationComponent,
        DataTableComponent,
        EditModalComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgxPaginationModule,
        CSV2JSONModule,
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
    fixture = TestBed.createComponent(OfftakerComponent);
    component = fixture.componentInstance;
    injector = getTestBed();
    authService = injector.get(AuthenticationService);
  }));

  it('should create offtaker component', () => {
    expect(component).toBeTruthy();
  });
});
