import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedOrdersComponent } from './received-orders.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { OrderModule } from 'ngx-order-pipe';

describe('ReceivedOrdersComponent', () => {
  let component: ReceivedOrdersComponent;
  let fixture: ComponentFixture<ReceivedOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReceivedOrdersComponent,
      ],
      imports: [
        NgxPaginationModule,
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        FormsModule,
        HttpClientTestingModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        OrderModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Checks that the component is created', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
