import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed
} from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let injector: TestBed;
  let authService: AuthenticationService;
  let authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue',
    'logout'
  ]);

  authMock.getCurrentUserValue.and.returnValue({ user: '' });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: AuthenticationService, useValue: authMock }]
    }).compileComponents();
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create navigation component', () => {
    expect(component).toBeTruthy();
  });
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
  it('should trigger logout action', () => {
    let select = fixture.debugElement.nativeElement.querySelector('.logout');
    select.click();
    fixture.detectChanges();
    expect(component.user).toEqual({ user: '' });
  });
});
