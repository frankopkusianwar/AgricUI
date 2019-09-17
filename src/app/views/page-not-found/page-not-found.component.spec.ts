import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundComponent } from './page-not-found.component';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from 'src/app/_services/authentication.service';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  let authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);

  authMock.getCurrentUserValue.and.returnValue({ user: '' });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageNotFoundComponent, NavigationComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: AuthenticationService, useValue: authMock }]
    }).compileComponents();
  }));

  function setup() {
    const fixture = TestBed.createComponent(PageNotFoundComponent);
    const app = fixture.debugElement.componentInstance;
    component = fixture.componentInstance;
    return { fixture, app, component };
  }

  it('should create the pagNotFound component', () => {
    const { app } = setup();
    expect(app).toBeTruthy();
  });
  it('should render navigation component ', () => {
    const { fixture } = setup();
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const landingheader = compile.querySelector('app-navigation');
    expect(landingheader).toBeTruthy();
  });
});
