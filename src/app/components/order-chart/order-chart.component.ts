import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/_shared/services/requests.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-order-chart',
  templateUrl: './order-chart.component.html',
  styleUrls: ['./order-chart.component.scss']
})
export class OrderChartComponent implements OnInit {
  result;
  category: string = 'fertilizer';
  constructor(private requestService: RequestsService) {}
  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  orders = [
    'Fertilizer',
    'Pesticide',
    'Herbicide',
    'Seeds',
    'Farming Tools',
    'Planting',
    'Spraying',
    'Insurance',
    'Soil_test',
    'Map_cordinates'
  ];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [{ data: [], label: '' }];
  public ChartColor: Array<any> = [
    {
      backgroundColor: 'rgba(16, 127, 238, 0.67)'
    }
  ];

  ngOnInit() {
    this.getOrderData();
  }

  getMonthlyDistribution(data) {
    let map1 = new Map(),
      object = {};

    this.months.forEach(month => {
      map1.set(month, 0);
    });

    map1.forEach((value, key) => {
      var keys = key.split('.'),
        last = keys.pop();
      keys.reduce((r, a) => (r[a] = r[a] || {}), object)[last] = value;
    });
    const orderDistribution = Object.assign(object, data);
    return orderDistribution;
  }

  groupOrderByMonth = (data): any => {
    let result = [];
    data.forEach(item => {
      const month = formatDate(item.created_at, 'MMM', 'en');
      result[month] = (result[month] || 0) + 1;
    });
    return this.getMonthlyDistribution(result);
  };

  getOrderData(category: string = 'fertilizer') {
    this.requestService
      .get(`order-distribution/${category}`, null)
      .subscribe(res => {
        this.result = this.groupOrderByMonth(res.orderDistribution);
        this.barChartLabels = Object.keys(this.result);
        this.barChartData[0].data = Object.values(this.result);
        this.barChartData[0].label = decodeURIComponent(res.category);
      });
  }
}
