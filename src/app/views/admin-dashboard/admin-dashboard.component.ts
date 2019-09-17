import { Component, OnInit } from '@angular/core';
import { AdminApiCallsService } from '../../_services/admin-api-calls.service';
import {
  VillageAgent,
  InputSupplier,
  Offtaker,
  DevtPartner,
  TopDistrict,
  ActivitySummary,
  TotalAcreage,
  TotalPayment,
  TopProduce,
  ActiveUsers,
  FarmersAgentsOrderStatistics
} from '../../interfaces/admin.interface';
import * as moment from 'moment';
import { KeyValue } from '@angular/common';
import { forkJoin } from 'rxjs';
import { BaseComponent } from 'src/app/_shared/utils/base-component';
import { HelperFunctions } from 'src/app/_shared/utils/helper-functions';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  villageAgents: VillageAgent[];
  inputSuppliers: InputSupplier[];
  offtakers: Offtaker[];
  devtPartners: DevtPartner[];
  topDistricts: TopDistrict[];
  activitySummary: ActivitySummary[];
  totalAcreage: TotalAcreage[];
  totalPayment: TotalPayment[];
  topProduce: TopProduce[];
  activitiesPercentage: ActivitySummary[];
  activeUsers: ActiveUsers[];
  farmersAgentsOrderStatistics: any;

  elements = 0;
  errorMessage = null;

  loaded = false;
  endDateVal: string = '';
  startDateVal: string = '';
  startDate: string = '';
  endDate: string = '';
  invalidDateTime: boolean = false;
  toggleFilter: boolean = false;
  villageAgentsDistricts = null;
  activityPercent: any;

  // stacked line graph options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  xAxisLabel = 'Products/Services';
  yAxisLabel = 'Farmers';
  showXAxisLabel = true;
  showYAxisLabel = true;
  showLegend = true;
  timeline = true;
  roundEdges = false;
  colorScheme = {
    domain: ['#48d8ab', '#8ce3ea']
  };
  legendTitle = '';
  legendPosition = 'bottom';

  constructor(private api: AdminApiCallsService, private helperFunction: HelperFunctions) { }
  ngOnInit() {
    this.datePicker();
  }

  toggleDateFilter() {
    this.toggleFilter = !this.toggleFilter;
  }

  datePicker() {
    this.elements = 0;
    this.loaded = false;
    this.startDate = this.startDateVal
      ? moment(this.startDateVal).format('YYYY-MM-DD')
      : '';
    this.endDate = this.endDateVal
      ? moment(this.endDateVal).format('YYYY-MM-DD')
      : '';

    BaseComponent.dateChecker(this.startDate, this.endDate, this.invalidDateTime);

    this.initData();
  }

  loadData(endpoint: string) {
    return this.api.getData(
      `${endpoint}?start_date=${this.startDate}&end_date=${this.endDate}`
    );
  }

  initData() {
    forkJoin(
      this.loadData('users/input-suppliers'),
      this.loadData('users/offtakers'),
      this.loadData('devt-partners'),
      this.loadData('top-districts'),
      this.loadData('users/village-agents'),
      this.loadData('total-acreage'),
      this.loadData('total-payment'),
      this.loadData('top-produce'),
      this.loadData('activity-summary'),
      this.loadData('active-users'),
      this.loadData('farmer-agents-order-statistics')
    ).subscribe(
      results => {
        this.onDataLoaded(results);
      },
      error => {
        this.errorMessage = 'Error loading data.';
      }
    );
  }

  onDataLoaded(results) {
    this.inputSuppliers = results[0];
    this.offtakers = results[1];
    this.devtPartners = results[2];
    this.topDistricts = results[3];
    this.villageAgents = results[4];
    this.totalAcreage = results[5];
    this.totalPayment = results[6];
    this.topProduce = results[7];
    this.activitySummary = results[8];
    this.getVillageAgentsDistricts(results[4]);
    this.activityPercent = results[8];
    this.activitiesPercentage = this.activityPercent.activitiesPercentage;
    this.activeUsers = results[9];
    this.extractFarmerAndAgentsOrderStatistics(results[10]);
    this.loaded = true;
  }

  /**
   * transforms the farmer-agent orders array into data required for the ng2-charts package
   * @param farmersAgentsOrderStatistics array of farmer-agent order statistics to transform
   */
  extractFarmerAndAgentsOrderStatistics(farmersAgentsOrderStatistics: object): void {
    const transformedData = [];
    const farmerOrdersTemplate = { name: 'Farmers', series: [] };
    const farmerAgentsOrdersTemplate = { name: 'Farmers helped by VAs', series: [] };
    const data = farmersAgentsOrderStatistics['data'];
    const { farmerOrdersTemplate: farmersOrder, farmerAgentsOrdersTemplate: farmersAgentsOrder } = this.formatFarmerAgentsOrderStatisticsForCharts(data, farmerOrdersTemplate, farmerAgentsOrdersTemplate);
    transformedData.push(farmersOrder);
    transformedData.push(farmersAgentsOrder);
    this.farmersAgentsOrderStatistics = transformedData;
  }

  formatFarmerAgentsOrderStatisticsForCharts(data: any[], farmerOrdersTemplate, farmerAgentsOrdersTemplate) {
    data.forEach(farmerAgentOrderStatistic => {
      Object.keys(farmerAgentOrderStatistic).forEach(statisticKey => {
        const statisticKeysArray = statisticKey.split('_');
        let name;
        if (statisticKeysArray.length > 2) {
          name = this.helperFunction.capitalize(`${statisticKeysArray[0]} ${statisticKeysArray[1]}`)
        } else {
          name = this.helperFunction.capitalize(`${statisticKeysArray[0]}`)
        }
        const seriesObject = {
          name,
          value: farmerAgentOrderStatistic[statisticKey]
        };
        if (statisticKey.includes('farmer')) {
          farmerOrdersTemplate.series.push(seriesObject);
        } else {
          farmerAgentsOrdersTemplate.series.push(seriesObject);
        }
      });
    });
    return { farmerOrdersTemplate, farmerAgentsOrdersTemplate };
  }

  getVillageAgentsDistricts(villageAgents) {
    const vaData = {};
    villageAgents.result.map(data => {
      if (!vaData[data.va_district]) {
        vaData[data.va_district] = 0;
      }
      vaData[data.va_district] = vaData[data.va_district] += 1;
    });
    this.villageAgentsDistricts = vaData;
  }

  valueDescOrder = (
    a: KeyValue<string, number>,
    b: KeyValue<string, number>
  ): number => {
    return a.value > b.value ? -1 : b.value > a.value ? 1 : 0;
  };
}
