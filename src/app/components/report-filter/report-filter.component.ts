
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import * as moment from 'moment';
import {
  TopPerformingMasterAgents,
  TopPerformingVillageAgents
} from '../../interfaces/admin.interface';
import { AdminApiCallsService } from 'src/app/_services/admin-api-calls.service';
import { BaseComponent } from 'src/app/_shared/utils/base-component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-report-filter',
  templateUrl: './report-filter.component.html',
  styleUrls: ['./report-filter.component.scss']
})
export class ReportFilterComponent implements OnInit {
  public topPerformingMasterAgents: TopPerformingMasterAgents[];
  public topPerformingVillageAgents: TopPerformingVillageAgents[];
  endDateVal = '';
  startDateVal = '';
  startDate = '';
  endDate = '';
  districts = [];
  district = '';
  districtExtension = '';
  loaded = false;
  districtsLoaded = false;
  invalidDateTime = false;
  invalidLocation = false;
  toggleFilter = false;
  icon = 'fa-chevron-up';

  @Output() filterReport = new EventEmitter();
  constructor(private api: AdminApiCallsService) { }

  ngOnInit() {
    this.getDistricts();
  }

  loadDistricts(endpoint: string) {
    return this.api.getData(endpoint);
  }

  getDistricts() {
    this.loaded = false;
    forkJoin(
      this.loadDistricts('districts')
    ).subscribe(
      results => {
        this.allDisctricts(results);
      }
    );
  }

  allDisctricts(results) {
    this.districts = results[0].data;
    this.districtsLoaded = true;
  }

  toggleDateFilter() {
    this.toggleFilter = !this.toggleFilter;
    this.icon = this.toggleFilter ? 'fa-chevron-down' : 'fa-chevron-up';
  }

  filterQuery() {

    this.dateCleaner();
    BaseComponent.dateChecker(this.startDate, this.endDate, this.invalidDateTime);
    if (this.district !== 'All') {
      this.districtExtension = `&district=${this.district}`;
    } else {
      this.districtExtension = '';
    }

    this.filterReport.emit({
      startDate: this.startDate,
      endDate: this.endDate,
      district: this.district,
      location: this.districtExtension,
    });
    this.loaded = true;
  }

  dateCleaner() {
    this.startDate = this.startDateVal ? moment(this.startDateVal).format('YYYY-MM-DD') : '';
    this.endDate = this.endDateVal ? moment(this.endDateVal).format('YYYY-MM-DD') : '';
  }
}
