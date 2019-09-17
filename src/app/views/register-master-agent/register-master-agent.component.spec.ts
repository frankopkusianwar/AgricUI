import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterMasterAgentComponent } from './register-master-agent.component';
import { RequestAccountPannelComponent } from '../../components/request-account-pannel/request-account-pannel.component';
import { LandingHeaderComponent } from '../../components/landing-header/landing-header.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('RegisterMasterAgentComponent', () => {
  let component: RegisterMasterAgentComponent;
  let fixture: ComponentFixture<RegisterMasterAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegisterMasterAgentComponent,
        RequestAccountPannelComponent,
        LandingHeaderComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(RegisterMasterAgentComponent);
    component = fixture.componentInstance;
  }));

  it('should create masteragent component', () => {
    expect(component).toBeTruthy();
  });
});
