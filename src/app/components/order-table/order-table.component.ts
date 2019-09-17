import { Component, OnInit, Input } from '@angular/core';
import { RequestsService } from '../../_shared/services/requests.service';
import * as moment from 'moment';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
})
export class OrderTableComponent implements OnInit {
  @Input() type: string;
  @Input() url: string;
  startDateVal = '';
  endDateVal = '';
  startDate = '';
  endDate = '';
  paymentMethod = 'all';
  amount: any;
  invalidDateTime = false;
  showFilter = true;
  loadOrders = false;
  filteredData: any[];
  filterLoaded = false;
  data: any[];
  dataToRender: any[];
  private page = 1;
  private count = 20;
  orderData: object;
  message: string;
  deleteOrderisloading: boolean;
  deleteOrderisSuccess: boolean;
  serverError: boolean;
  selectedOrder: any;
  apiSuccess = false;
  apiError = false;
  apiLoading = false;
  showModal = false;

  constructor(private requestService: RequestsService) {}

  ngOnInit(): any {
    this.amount = 'all';
    this.getData();
  }

  deleteOrder(orderId: string): void {
    this.deleteOrderisloading = true;
    this.requestService.delete(orderId, `orders`).subscribe(
      res => {
        this.deleteOrderisloading = false;
        this.deleteOrderisSuccess = true;
        this.getData();
      },
      err => {
        this.deleteOrderisloading = false;
        this.deleteOrderisSuccess = false;
        this.serverError = true;
      }
    );
  }

  clearMessage(): void {
    this.message = '';
    this.deleteOrderisSuccess = false;
  }

  filterQuery(){
    this.filteredData = this.data;
    this.filterLoaded = false;
    if (this.dateChecker()) {
      this.startDate = this.startDateVal
        ? moment(this.startDateVal).format('YYYY-MM-DD HH:mm:ss')
        : '';
      this.endDate = this.endDateVal
        ? moment(this.endDateVal).format('YYYY-MM-DD HH:mm:ss')
        : '';
      this.filterByDate();
    }
    this.filterByPaymentMethod();
    this.filterByAmount();
    this.filterLoaded = true;
    this.dataToRender = this.filteredData;
  }

  filterByDate() {
    let filtered = [];
    this.filteredData.forEach(order => {
      if (
        moment(order.time).format('YYYY MM DD') >=
          moment(this.startDate).format('YYYY MM DD') &&
        moment(order.time).format('YYYY MM DD') <=
          moment(this.endDate).format('YYYY MM DD')
      ) {
        filtered.push(order);
      }
    });
    this.filteredData = filtered;
  }

  dateChecker() {
    if (this.startDateVal !== '' && this.endDateVal !== '') {
      return true;
    } else {
      return false;
    }
  }

  filterByPaymentMethod() {
    let filtered = [];
    if (this.paymentMethod != 'all') {
      this.filteredData.forEach(order => {
        if (order.payment == this.paymentMethod) {
          filtered.push(order);
        }
      });
      this.filteredData = filtered;
    } else {
    }
  }

  filterByAmount() {
    let filtered = [];
    if (this.amount != 'all') {
      this.filteredData.forEach(order => {
        if (this.checkAmount()) {
          if (this.filterAbove1M(order)) {
            filtered.push(order);
          }
        } else {
          if (this.filterBelow1M(order)) {
            filtered.push(order);
          }
        }
      });
      this.filteredData = filtered;
    } else {
    }
  }

  getData() {
    this.requestService.get(this.url, null).subscribe((res: any) => {
      if (this.type === 'Completed') {
        this.data = res.completed_orders;
        this.dataToRender = this.data;
      } else {
        this.data = res.received_orders;
        this.dataToRender = this.data;
      }
    });
  }

  viewOrderDetails(data: object): void {
    this.orderData = data;
  }

  checkAmount() {
    if (this.amount == 1000001) {
      return true;
    }
  }

  filterAbove1M(item: any) {
    if (item.total_cost >= this.amount) {
      return true;
    }
  }

  filterBelow1M(item: any) {
    if (
      item.total_cost >= this.amount - 250000 &&
      item.total_cost <= this.amount
    ) {
      return true;
    }
  }

  Clear() {
    this.dataToRender = this.data;
    this.startDateVal = '';
    this.endDateVal = '';
    this.paymentMethod = 'all';
    this.amount = 'all';
  }

  setSelectedOrder(order) {
    this.showModal = true
    this.selectedOrder = order;
  }

  clearOrder() {
    this.apiLoading = true;
    this.apiError = false;
    this.requestService
      .patch('orders', this.selectedOrder._id + '/new', {})
      .subscribe((res: any) => {
        this.handleApiResponse(res);
      });

  }

  handleApiResponse(response) {
    if (response.success) {
      this.apiSuccess = true;
      this.apiLoading = false;
    } else {
      this.apiError = true;
      this.apiSuccess = false;
      this.apiLoading = false;
    }
  }

  refreshTable() {
    this.apiSuccess = false;
    this.apiError = false;
    this.getData();
    this.showModal = false;
  }
}
