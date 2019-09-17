import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterOfftakerComponent } from './register-offtaker.component';
import { RequestAccountPannelComponent } from '../../components/request-account-pannel/request-account-pannel.component';
import { LandingHeaderComponent } from '../../components/landing-header/landing-header.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('RegisterOfftakerComponent', () => {
  let component: RegisterOfftakerComponent;
  let fixture: ComponentFixture<RegisterOfftakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegisterOfftakerComponent,
        RequestAccountPannelComponent,
        LandingHeaderComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(RegisterOfftakerComponent);
    component = fixture.componentInstance;
  }));

  it('should create offtaker component', () => {
    expect(component).toBeTruthy();
  });
});
