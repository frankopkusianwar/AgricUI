import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed
} from '@angular/core/testing';

import { VillageagentsComponent } from './villageagents.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { UnderdevelopmentComponent } from 'src/app/components/underdevelopment/underdevelopment.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VillageagentsComponent', () => {
  let component: VillageagentsComponent;
  let fixture: ComponentFixture<VillageagentsComponent>;
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
        VillageagentsComponent,
        NavigationComponent,
        UnderdevelopmentComponent,
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
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
    fixture = TestBed.createComponent(VillageagentsComponent);
    component = fixture.componentInstance;
    injector = getTestBed();
    authService = injector.get(AuthenticationService);
  }));

  it('should create village agent component', () => {
    expect(component).toBeTruthy();
  });
});
