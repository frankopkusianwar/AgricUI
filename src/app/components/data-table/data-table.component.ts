/* tslint:disable variable-name */
import { Component, Input, OnInit } from '@angular/core';
import { RequestsService } from '../../_shared/services/requests.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ExportToCsv } from 'export-to-csv';
import * as printJs from 'print-js';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @Input() title: string;
  @Input() url: string;
  @Input() type: string;
  @Input() hideActionsColumn = true;
  public data: any;
  public loading = false;
  public db_errors: string;
  public action = null;
  selectedUser;
  actionSuccess = false;
  message = '';
  userId: string = null;
  id: string = null;
  success = false;

  currentId: boolean;
  errors: object = {};
  apiError;
  apiSuccessMessage;
  submitted = false;
  requiredField = [
    ['va_district', 'District name'],
    ['va_gender', 'The gender'],
    ['va_phonenumber', 'Phone number'],
    ['va_region', 'The region'],
    ['va_subcounty', 'Subcounty']
  ];

  csvExporter: ExportToCsv;
  page: number = 1;
  count: number = 0;
  limit: number = 10;
  selectLimit: string = '';

  constructor(
    private requestService: RequestsService,
    private router: Router
  ) {}

  ngOnInit(): any {
    this.getData(this.page);
  }

  updateOnEdit(): any {
    this.action = null;
    this.actionSuccess = false;
    this.message = '';
    this.selectedUser = null;
    this.id = null;
    this.userId = null;
    this.getData(this.page);
  }

  closeEditModal(): any {
    this.id = null;
    this.userId = null;
  }

  getData(page: number) {
    this.loading = true;
    this.requestService
      .get(`${this.url}?limit=${this.limit}&page=${page}`, null)
      .subscribe((res: any) => {
        this.loading = false;
        this.count = res.count;
        this.page = page;
        this.data = res.result.sort((next, prev) => {
          return (
            moment(prev.created_at).unix() - moment(next.created_at).unix()
          );
        });
      });
  }

  changePageLimit(pageLimit: number) {
    this.limit = pageLimit;
    this.selectLimit = 'page changed';
    this.getData(this.page);
  }

  setAction(user, action) {
    this.actionSuccess = false;
    this.message = '';
    this.action = action;
    this.selectedUser = user;
    if (action === 'edit') {
      this.id = 'exampleModal';
      this.userId = this.selectedUser._id;
    }
  }
  fromNow(date) {
    const getDateUtc = moment.utc(date);
    const localDate = getDateUtc.local();
    return moment(localDate).from(Date.now());
  }
  changeStatus(id, action) {
    this.loading = true;
    this.submitted = true;
    this.requestService
      .patch(action.toLowerCase(), id, null)
      .subscribe((res: any) => {
        this.message = res.message;
        this.getData(this.page);
        this.submitted = false;
        this.actionSuccess = true;
      });
  }

  validateField = (arr, data) => {
    arr.forEach(element => {
      if (!data[element[0]] && this.errors[data[element[0]]]) {
        this.errors[
          element[0]
        ] = `${element[1]} in one or more of the rows is empty or invalid`;
      }
    });
  };

  validateCsvData(data) {
    this.validateField(this.requiredField, data);

    const va_country = 'Uganda';
    let partner_id: any = '';
    let ma_id: any = '';
    if (this.type === 'offtaker' || this.type === 'devt-partners') {
      partner_id = this.currentId;
      ma_id = 'NA';
    } else if (this.type === 'masteragent') {
      partner_id = 'NA';
      ma_id = this.currentId;
    }
    Object.assign(data, { va_country, ma_id, partner_id });
  }

  onUpload(event: { type: string; data: any }) {
    this.errors = {};
    this.apiError = this.apiSuccessMessage = null;
    if (event.type === 'success') {
      for (const value of Object.values(event.data)) {
        this.validateCsvData(value);
      }

      if (!Object.keys(this.errors).length) {
        this.requestService.post('village-agents', {villageAgents: event.data}).subscribe(
          (res: any) => {
            this.apiSuccessMessage = res;
          },
          error => {
            this.apiError = error;
            if (error.status === 422) {
              const errors = Object.values(error.error);
              const arr = [];
              errors.map(data => {
                arr.push(data[0]);
              });
              this.apiError = arr;
            }
          }
        );
      }
    }
  }

  generateDataForCSV(data: any): any {
    return data.map((details) => {
      if (!this.hideActionsColumn) {
        const {
          master_agent, va_name, va_phonenumber, va_district,
          total_number_of_farmers, created_at, devt_partner} = details;
        return {
          'Name': va_name, 'Phone Number': va_phonenumber,
          "Master Agents": master_agent.username? master_agent.username: 'NA' ,
          'Development Partner' : devt_partner.username ? devt_partner.username : 'NA',
          'District': va_district, 'Farmers': total_number_of_farmers,
          'Time Joined': created_at}}
      const {
        account_name, username, contact_person,
        phone_number, value_chain, created_at, status} = details;
      return {
        'Account name' : account_name, 'Username' : username, 'Status': status,
        'Contact person' : contact_person, 'Phone number' : phone_number,
        'Value chain' : value_chain, 'Duration' : this.fromNow(created_at)}});
      }

  onExportCSV() {
    this.csvExporter = new ExportToCsv({
      fieldSeparator: ',',
      quoteStrings: '"',
      filename: `${this.title}`,
      decimalSeparator: '.',
      title: `${this.title}`,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true
    });
    this.csvExporter.generateCsv(this.generateDataForCSV(this.data));
  }

  setCurrentId(id) {
    this.currentId = id;
  }

  printable() {
    let properties = [
    'Name',
    'Phone Number',
    'Master Agents',
    'Development Partner',
    'District',
    'Farmers',
    'Time Joined'];
    if (this.hideActionsColumn) {
      properties =  [
        'Account name',
        'Username',
        'Contact person',
        'Value chain',
        'Duration',
        'Status'];
    }
    return printJs({
        printable: this.generateDataForCSV(this.data),
        properties,
        gridHeaderStyle: 'font-weight: bold;  border: 2px solid #3971A5;',
        type: 'json'
     });
  }
}
