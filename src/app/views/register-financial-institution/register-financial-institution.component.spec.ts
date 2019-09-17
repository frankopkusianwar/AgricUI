import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterFinancialInstitutionComponent } from './register-financial-institution.component';
import { RequestAccountPannelComponent } from '../../components/request-account-pannel/request-account-pannel.component';
import { LandingHeaderComponent } from '../../components/landing-header/landing-header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
describe('RegisterFinancialInstitutionComponent', () => {
  let component: RegisterFinancialInstitutionComponent;
  let fixture: ComponentFixture<RegisterFinancialInstitutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegisterFinancialInstitutionComponent,
        RequestAccountPannelComponent,
        LandingHeaderComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(RegisterFinancialInstitutionComponent);
    component = fixture.componentInstance;
  }));

  it('should create financial institution component', () => {
    expect(component).toBeTruthy();
  });
});
