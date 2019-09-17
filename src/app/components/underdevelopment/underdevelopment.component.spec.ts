import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed
} from '@angular/core/testing';

import { UnderdevelopmentComponent } from './underdevelopment.component';
import { RequestsService } from 'src/app/_shared/services/requests.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationComponent } from '../navigation/navigation.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UnderdevelopmentComponent', () => {
  let component: UnderdevelopmentComponent;
  let fixture: ComponentFixture<UnderdevelopmentComponent>;
  let injector: TestBed;
  let requestService: RequestsService;
  let authService: AuthenticationService;
  const authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        UnderdevelopmentComponent,
        NavigationComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule     
      ],
      providers: [
        { provide: AuthenticationService, useValue: authMock }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(UnderdevelopmentComponent);
    component = fixture.componentInstance;
    injector = getTestBed();
    authService = injector.get(AuthenticationService);
  }));

  it('should create under development component', () => {
    expect(component).toBeTruthy();
  });
});
