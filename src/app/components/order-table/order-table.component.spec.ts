import { OrderTableComponent } from './order-table.component';
import { AppDashboardNavigationComponent } from '../app-dashboard-navigation/app-dashboard-navigation.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { of, throwError } from 'rxjs';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { RequestsService } from 'src/app/_shared/services/requests.service';
import { requestMock } from 'src/app/_shared/tests/spies.spec';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PaymentTypePipe } from 'src/app/_shared/utils/payment-type.pipe';
import { OrderModule } from 'ngx-order-pipe';

describe('OrderTableComponent', () => {
  let component: OrderTableComponent;
  let fixture: ComponentFixture<OrderTableComponent>;
  let dummyData_1: {};
  let dummyData_2: {};
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OrderTableComponent,
        AppDashboardNavigationComponent,
        PaymentTypePipe,
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
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
        { provide: RequestsService, useValue: requestMock },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(OrderTableComponent);
    component = fixture.componentInstance;
    dummyData_1 = {
      created_at: '2019-09-02 07:30:21',
      district: 'Rubirizi',
      name: 'James Onen',
      orders: [
        {
          category: 'Pesticide',
          price: 10000,
          product: 'Blended fertilizer',
          qty: 165,
          src:
            'http://138.197.220.176:3000/assets/images/f9ab1da7-cd63-4e3d-8a96-b1c7dcc2cb42.png',
          stock: '',
          supplier: 'World Food Program',
          unit: '50 Kgs',
        },
        {
          category: 'Seeds',
          price: 10000,
          product: 'Metrazin',
          qty: 2,
          src: 'http://138.197.220.176:3000/assets/images/Jmugo75136.png',
          stock: '',
          supplier: 'World Food Program',
          unit: '50 Kgs',
        },
      ],
      payment: 'mm',
      phone: '863.947.7082',
      status: 'Delivered',
      time: '2018-09-02 20:22:51',
      total_cost: 100000,
      total_items: 2,
      updated_at: '2019-09-02 07:30:21',
    };
    dummyData_2 = {
      created_at: '2019-09-02 07:30:21',
      district: 'Rubirizi',
      name: 'James Onen',
      orders: [
        {
          category: 'Pesticide',
          price: 10000,
          product: 'Blended fertilizer',
          qty: 165,
          src:
            'http://138.197.220.176:3000/assets/images/f9ab1da7-cd63-4e3d-8a96-b1c7dcc2cb42.png',
          stock: '',
          supplier: 'World Food Program',
          unit: '50 Kgs',
        },
        {
          category: 'Seeds',
          price: 10000,
          product: 'Metrazin',
          qty: 2,
          src: 'http://138.197.220.176:3000/assets/images/Jmugo75136.png',
          stock: '',
          supplier: 'World Food Program',
          unit: '50 Kgs',
        },
      ],
      payment: 'cash',
      phone: '863.947.7082',
      status: 'Delivered',
      time: '2019-09-02 20:22:51',
      total_cost: 1200000,
      total_items: 2,
      updated_at: '2019-09-02 07:30:21',
    };
  }));

  it('should successfully call ngOnit', () => {
    component.amount = 'all';
    const spyNgOnit = spyOn(component, 'getData').and.returnValue(of({}));

    component.ngOnInit();
    expect(spyNgOnit).toHaveBeenCalled();
  });

  it('should set the data for completed on getData', () => {
    component.url = 'orders/completed';
    component.type = 'Completed';
    requestMock.get.and.returnValue(
      of({ completed_orders: ['completed data 1', 'completed data 2'] }),
    );

    component.getData();
    expect(component.data).toEqual(['completed data 1', 'completed data 2']);
  });

  it('should set the data for received on getData', () => {
    component.url = 'orders/received';
    component.type = 'Received';
    requestMock.get.and.returnValue(
      of({ received_orders: ['received data 1', 'received data 2'] }),
    );

    component.getData();
    expect(component.data).toEqual(['received data 1', 'received data 2']);
  });

  it('should set orderData when viewOrderDetails is called', () => {
    expect(component.orderData).toBeUndefined();
    component.viewOrderDetails({ name: 'testOrder' });
    expect(component.orderData).toEqual({ name: 'testOrder' });
  });

  it('should clear message successfully', () => {
    component.deleteOrderisSuccess = true;
    component.clearMessage();
    expect(component.deleteOrderisSuccess).toEqual(false);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter by date, payment method and amount', () => {
    component.startDate = '2018-09-01 07:30:21';
    component.endDate = '2019-09-30 07:30:21';
    component.paymentMethod = 'cash';
    component.amount = 1200000;
    component.data = [dummyData_1, dummyData_2];
    component.filterQuery();
    expect(component.filterLoaded).toEqual(true);
  });

  it('should filter by date', () => {
    component.startDateVal = '2018-09-01 07:30:21';
    component.endDateVal = '2018-09-30 07:30:21';
    component.filteredData = [dummyData_1, dummyData_2];
    component.data = [dummyData_1, dummyData_2];
    spyOn(component, 'filterByPaymentMethod').and.returnValue(of({}));
    spyOn(component, 'filterByAmount').and.returnValue(of({}));
    component.filterQuery();
    expect(component.dataToRender).toEqual([dummyData_1]);
  });

  it('should filter by payment method, when payment method = cash', () => {
    component.startDate = '2018-09-01 07:30:21';
    component.endDate = '2019-09-30 07:30:21';
    component.paymentMethod = 'cash';
    component.amount = 250000;
    component.data = [dummyData_1, dummyData_2];
    component.filterQuery();
    expect(component.filterLoaded).toEqual(true);
  });

  it('should filter by payment method, when payment method = all', () => {
    component.startDate = '2018-09-01 07:30:21';
    component.endDate = '2019-09-30 07:30:21';
    component.paymentMethod = 'all';
    component.amount = 250000;
    component.data = [dummyData_1, dummyData_2];
    component.filterQuery();
    expect(component.filterLoaded).toEqual(true);
  });

  it('should filter by amount below 1000000', () => {
    component.startDate = '2018-09-01 07:30:21';
    component.endDate = '2019-09-30 07:30:21';
    component.paymentMethod = 'all';
    component.amount = 250000;
    component.data = [dummyData_1, dummyData_2];
    component.filterQuery();
    expect(component.filterBelow1M(dummyData_1)).toEqual(true);
    expect(component.filteredData).toEqual([dummyData_1]);
  });

  it('should filter by amount above 1000000', () => {
    component.startDate = '2018-09-01 07:30:21';
    component.endDate = '2019-09-30 07:30:21';
    component.paymentMethod = 'all';
    component.amount = 1000001;
    component.data = [dummyData_1, dummyData_2];
    component.filterQuery();
    expect(component.filterAbove1M(dummyData_2)).toEqual(true);
    expect(component.filteredData).toEqual([dummyData_2]);
  });

  it('should filter by amount above 1m and payment method', () => {
    component.startDate = '2018-09-01 07:30:21';
    component.endDate = '2019-09-30 07:30:21';
    component.paymentMethod = 'cash';
    component.amount = 1000001;
    component.data = [dummyData_1, dummyData_2];
    component.filterQuery();
    expect(component.filteredData).toEqual([dummyData_2]);
  });

  it('should filter by amount below 1m and payment method', () => {
    component.startDate = '2018-09-01 07:30:21';
    component.endDate = '2019-09-30 07:30:21';
    component.paymentMethod = 'mm';
    component.amount = 250000;
    component.data = [dummyData_1, dummyData_2];
    component.filterQuery();
    expect(component.filteredData).toEqual([dummyData_1]);
  });

  it('should clear all filters and render original data', () => {
    component.data = [dummyData_1, dummyData_2];
    component.Clear();
    expect(component.data).toEqual(component.dataToRender);
    expect(component.startDateVal).toEqual('');
    expect(component.endDateVal).toEqual('');
    expect(component.paymentMethod).toEqual('all');
    expect(component.amount).toEqual('all');
  });

  it('should call the delete orders api route', () => {
    component.url = 'orders/order_id';
    requestMock.delete.and.returnValue(
      of({
        res: {
          success: true,
          message: 'Order deleted successfully',
          data: null,
        },
      }),
    );

    component.deleteOrder('order_id');
    expect(component.deleteOrderisSuccess).toBe(true);
    expect(component.deleteOrderisloading).toBe(false);
  });

  it('should catch error if order _id doesnot exist', () => {
    component.url = 'orders/uojsij0we-ojaosds';
    const error = {
      success: false,
      status: 404,
    };
    requestMock.delete.and.returnValue(throwError(error));
    component.deleteOrder('uojsij0we-ojaosds');
    expect(component.deleteOrderisSuccess).toBe(false);
    expect(component.deleteOrderisloading).toBe(false);
  });

  it('should not delete order incase of server errors', () => {
    component.url = 'orders/uojsij0wehhgyojaosds';
    const error2 = {
      success: false,
    };
    requestMock.delete.and.returnValue(throwError(error2));
    component.deleteOrder('uojsij0wehhgyojaosds');
    expect(component.deleteOrderisSuccess).toBe(false);
    expect(component.deleteOrderisloading).toBe(false);
  });

  it('should set the selected order to', () => {
    component.selectedOrder = {};
    component.setSelectedOrder(dummyData_1);
    expect(component.selectedOrder).toEqual(dummyData_1);
  });

  it('should clear an order', () => {
    component.selectedOrder = dummyData_1;
    component.apiLoading = false;
    component.apiError = false;

    component.handleApiResponse = res => {
      return true;
    };
    requestMock.patch.and.returnValue(of({ res: { success: true } }));

    component.clearOrder();

    expect(requestMock).toBeDefined();
  });

  it('should set flags for success api response', () => {
    component.apiSuccess = false;
    component.apiLoading = true;
    const response = {
      success: true,
    };

    component.handleApiResponse(response);

    expect(component.apiSuccess).toBe(true);
  });

  it('should set flags for failure api response', () => {
    component.apiSuccess = false;
    component.apiError = false;
    component.apiLoading = true;
    const response = {
      success: false,
    };

    component.handleApiResponse(response);

    expect(component.apiError).toBe(true);
  });

  it('should set apiSuccess to false', () => {
    component.apiSuccess = true;
    component.apiError = false;
    component.getData = () => {};

    component.refreshTable();

    expect(component.apiSuccess).toBe(false);
  });

});
