import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CompletedOrdersComponent } from './completed-orders.component';
import { OrderTableComponent } from '../../../components/order-table/order-table.component';

import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OwlNativeDateTimeModule, OwlDateTimeModule } from 'ng-pick-datetime';
import { PaymentTypePipe } from 'src/app/_shared/utils/payment-type.pipe';
import { OrderModule } from 'ngx-order-pipe';

describe('CompletedOrdersComponent', () => {
  let component: CompletedOrdersComponent;
  let fixture: ComponentFixture<CompletedOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CompletedOrdersComponent,
        OrderTableComponent,
        PaymentTypePipe
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
    fixture = TestBed.createComponent(CompletedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Checks that the component is created', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
