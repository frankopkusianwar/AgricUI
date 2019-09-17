import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingHeaderComponent } from '../../components/landing-header/landing-header.component';
import { ContactPageComponent } from './contact-page.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RequestsService } from '../../_shared/services/requests.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ContactPageComponent', () => {
  let component: ContactPageComponent;
  let fixture: ComponentFixture<ContactPageComponent>;
  let requestService: RequestsService;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactPageComponent, LandingHeaderComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        RequestsService,
        {
          provide: FormBuilder,
          useValue: formBuilder
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ContactPageComponent);
    component = fixture.componentInstance;
    requestService = fixture.debugElement.injector.get(RequestsService);
  }));

  it('should create the contact component', () => {
    expect(component).toBeTruthy();
  });

  it('should simulate form submit with success response', () => {
    const spy = spyOn(requestService, 'post').and.returnValue(
      of({
        message: 'thank you for contacting us. we would get back to you shortly'
      })
    );
    component.loading = true;
    component.onSubmit();
    fixture.detectChanges();
    expect(component.loading).toEqual(false);
    expect(spy.calls.any()).toEqual(true);
  });

  it('should render header component ', () => {
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const landingheader = compile.querySelector('app-landing-header');
    expect(landingheader).toBeTruthy();
  });
});
