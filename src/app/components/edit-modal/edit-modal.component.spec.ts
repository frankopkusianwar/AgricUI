import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModalComponent } from './edit-modal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { RequestsService } from 'src/app/_shared/services/requests.service';
import { requestMock } from 'src/app/_shared/tests/spies.spec';

describe('EditModalComponent', () => {
  let component: EditModalComponent;
  let fixture: ComponentFixture<EditModalComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditModalComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        {
          provide: FormBuilder,
          useValue: formBuilder
        },
        { provide: RequestsService, useValue: requestMock }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(EditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should create EditModalComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should create get user data', () => {
    const id = 'T9fqH7-';
    requestMock.get().subscribe(() => {
      expect(component.loading).toEqual(false);
    });
  });
  it('should successfully edit form if valid', () => {
    fixture.ngZone.run(() => {
      component.form.controls['account_name'].setValue('franc');
      component.form.controls['username'].setValue('franc');
      component.form.controls['value_chain'].setValue('Crop');
      component.form.controls['contact_person'].setValue('fred');
      component.form.controls['phonenumber'].setValue('814546726798');

      expect(component.form.valid).toBeTruthy();

      component.handleSubmit();

      expect(component.submitted).toBe(true);
      component.closeModal();
      fixture.detectChanges();
      expect(component.id).toEqual(null);
    });
  });
  it('should return error if form is invalid', () => {
    component.form.controls['account_name'].setValue('344');
    component.form.controls['username'].setValue('');
    component.form.controls['value_chain'].setValue('');
    component.form.controls['contact_person'].setValue('455');
    component.form.controls['phonenumber'].setValue('invalid');

    expect(component.form.valid).toBeFalsy();

    component.handleSubmit();

    expect(component.submitted).toBe(true);
  });
});
