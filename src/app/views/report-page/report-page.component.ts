import { Component, OnInit } from '@angular/core';
import { AdminApiCallsService } from '../../_services/admin-api-calls.service';
import {
  TwitterReport,
  FacebookReport,
  YoutubeReport,
  TopPerformingMasterAgents,
  TopPerformingVillageAgents,
  TopPerformingDistricts,
  ActiveMobileUsers,
  NumberOfVisitors
} from '../../interfaces/admin.interface';
import { forkJoin } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss']
})
export class ReportPageComponent implements OnInit {
  public twitterReport: TwitterReport[];
  public facebookReport: FacebookReport[];
  public youtubeReport: YoutubeReport[];
  public topPerformingMasterAgents: TopPerformingMasterAgents[];
  public topPerformingVillageAgents: TopPerformingVillageAgents[];
  public topPerformingDistricts: TopPerformingDistricts[];
  public activeMobileUsers: ActiveMobileUsers[];
  public numberOfVisitors: NumberOfVisitors[];
  public errorMessage: string;
  public loaded = false;
  public elements = 0;

  constructor(private api: AdminApiCallsService) { }

  ngOnInit() {
    this.initReport();
  }

  loadReport(endpoint: string) {
    return this.api.getData(endpoint);
  }

  initReport() {
    forkJoin(
      this.loadReport('twitter-report'),
      this.loadReport('facebook-report'),
      this.loadReport('youtube-report'),
      this.loadReport('top-performing/ma'),
      this.loadReport('top-performing/va'),
      this.loadReport('top-performing-district'),
      this.loadReport('active-mobile-users'),
      this.loadReport('visitor')
    ).subscribe(
      results => {
        this.onReportLoaded(results);
      }
    );
  }

  updateOnFilter(eventArgs) {
    this.loaded = false;
    forkJoin(
      this.loadReport(`top-performing/ma?start_date=${eventArgs.startDate}&end_date=${eventArgs.endDate}${eventArgs.location}`),
      this.loadReport(`top-performing/va?start_date=${eventArgs.startDate}&end_date=${eventArgs.endDate}${eventArgs.location}`),
      this.filterDistrictTable(eventArgs.district)
    ).subscribe(
      results => {
        this.onReportFilter(results);
      }
    );
  }

  onReportFilter(reportResult) {
    this.topPerformingMasterAgents = reportResult[0];
    this.topPerformingVillageAgents = reportResult[1];
    this.topPerformingDistricts = reportResult[2];
    this.loaded = true;
  }

  filterDistrictTable(district){
    if(district !== "All"){
      return this.loadReport(`top-performing-district/${district}`);
    }
    else{
      return this.loadReport(`top-performing-district`);
    }
  }
  
  onReportLoaded(reportResult) {
    this.twitterReport = reportResult[0];
    this.facebookReport = reportResult[1];
    this.youtubeReport = reportResult[2];
    this.topPerformingMasterAgents = reportResult[3];
    this.topPerformingVillageAgents = reportResult[4];
    this.topPerformingDistricts = reportResult[5];
    this.activeMobileUsers = reportResult[6];
    this.numberOfVisitors = reportResult[7];
    this.loaded = true;
  }
}
