import { Component, OnInit } from '@angular/core';
import { AdminApiCallsService } from '../../_services/admin-api-calls.service';
import * as moment from 'moment';
import { ExportToCsv } from 'export-to-csv';
import { HelperFunctions } from '../../_shared/utils/helper-functions';
import * as printJs from 'print-js';

@Component({
  selector: 'app-admin-users-log',
  templateUrl: './admin-users-log.component.html',
  styleUrls: ['./admin-users-log.component.scss']
})
export class AdminUsersLogComponent implements OnInit {
  page = 1;
  count = 20;
  search = false;
  enableFilter = false;
  startDateVal = moment('12/22/2017, 12:00 AM').format('YYYY-MM-DD');
  endDateVal = moment()
    .hours(24)
    .format('YYYY-MM-DD');
  tempData: any;
  data: any;
  loading = false;
  error: string = null;

  csvExporter = new ExportToCsv({
    fieldSeparator: ',',
    quoteStrings: '"',
    filename: 'EzyAgric User Activity Log',
    decimalSeparator: '.',
    title: 'EzyAgric User Activity Log',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true
  });

  constructor(private api: AdminApiCallsService, private helperFunction: HelperFunctions) {}

  ngOnInit(): any {
    this.api.getData('activity-log').subscribe((res: any) => {
      this.data = res.activityLog.map((log, index) => {
        return {
          serial: index + 1,
          email: log.email,
          user: this.helperFunction.titleCase(log.target_account_name || `${log.target_firstname} ${log.target_lastname}`),
          activity: this.helperFunction.titleCase(log.activity),
          time: log.created_at
        };
      });
      this.tempData = this.data;
    });
  }

  formatDate(timestamp: string) {
    const date = new Date(timestamp);
    return `${date.toDateString()}, ${date.toLocaleTimeString()}`;
  }

  getDateRange() {
    this.loading = true;
    this.tempData = this.data.filter(data => {
      return (
        moment(data.time).isBetween(this.startDateVal, this.endDateVal) && data
      );
    });
    this.loading = !this.loading;
  }

  onExportCSV() {
    this.csvExporter.generateCsv(this.tempData);
  }

  searchTable(event: any) {
    const input = event.target.value.toLowerCase();
    this.tempData = this.data.filter((data, index) => {
      if (
        data.email.toLowerCase().includes(input) ||
        data.user.toLowerCase().includes(input) ||
        data.activity.toLowerCase().includes(input)
      ) {
        return data;
      }
    });
  }
  printable() {
    return printJs({
        printable: this.tempData,
        properties: ['serial', 'email', 'user', 'activity', 'time'],
        gridHeaderStyle: 'font-weight: bold;  border: 2px solid #3971A5;',
        type: 'json'
     });
  }
}
