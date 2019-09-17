import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/_shared/services/requests.service';
import { BaseComponent } from 'src/app/_shared/utils/base-component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-app-management-dashboard',
  templateUrl: './app-management-dashboard.component.html',
  styleUrls: ['./app-management-dashboard.component.scss']
})
export class AppManagementDashboardComponent extends BaseComponent
  implements OnInit {
  dateRange = true;
  public ordersChartLabels = [];
  public doughnutChartLabels = [];
  public doughnutChartData = [];
  public ordersChartData = [];
  public doughnutChartType = 'doughnut';
  public options: any = {
    legend: {
      position: 'right',
      labels: {
        padding: 5
      }
    }
  };
  public doughnutChartColors: Array<any> = [
    {
      backgroundColor: [
        '#CDC50B',
        '#F14E75',
        '#180BE3',
        '#0DE7EA',
        '#CE80A6',
        '#038F18',
        '#1AB8E3'
      ]
    }
  ];
  public doughnutChartDegree: any;
  stockValues = [];
  totalInputStock;
  totalFarmers: number = 0;
  loaded = false;
  totalOrdersPayment = 0;
  totalNewOrders: number = 0;
  farmersOrders: Object;
  totalNumberOfAgents: number = 0;
  numberOfMasterAgents: number = 0;
  numberOfVillageAgents: number = 0;
  errorMessage: string;
  totalCompletedOrders: number = 0;
  constructor(requestService: RequestsService) {
    super(requestService);
  }
  ngOnInit() {
    this.initData();
  }

  onDataLoaded(results) {
    this.totalNewOrders = results[0]['totalNewOrders'];
    this.totalFarmers = results[1]['count'];
    this.totalOrdersPayment = Math.round(results[2]['totalPayment']);
    this.getInputStock(results[3]);
    this.farmersOrders = results[4]['farmers_orders'];
    this.numberOfMasterAgents = results[5]['count'];
    this.numberOfVillageAgents = results[6]['count'];
    this.totalCompletedOrders = results[7]['count'];
    this.ordersChartData = [[this.totalNewOrders, this.totalCompletedOrders]];
    this.ordersChartLabels = ['New Orders', 'Serviced Orders'];
    this.totalNumberOfAgents =
      this.numberOfMasterAgents + this.numberOfVillageAgents;
    this.loaded = true;
  }

  getInputStock(data) {
    this.totalInputStock = data.total;
    for (let [key, value] of Object.entries(data.available_stock)) {
      this.doughnutChartLabels.push(key);
      this.stockValues.push(value);
    }
    this.getDegree();
  }

  getDegree() {
    let degree;
    this.stockValues.map(num => {
      degree = Math.round((num / this.totalInputStock) * 360);
      return this.doughnutChartData.push(degree);
    });
  }

  initData() {
    forkJoin(
      this.loadData('orders'),
      this.loadData('farmers'),
      this.loadData('total-payment'),
      this.loadData('inputs'),
      this.loadData('farmers-orders'),
      this.loadData('masteragents'),
      this.loadData('users/village-agents'),
      this.loadData('orders/completed')
    ).subscribe(
      results => {
        this.onDataLoaded(results);
      },
      error => {
        this.errorMessage = 'Error loading data.';
      }
    );
  }
}
