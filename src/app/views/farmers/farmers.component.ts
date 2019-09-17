import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../_shared/services/requests.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-farmers',
  templateUrl: './farmers.component.html',
  styleUrls: ['./farmers.component.scss']
})
export class FarmersComponent implements OnInit {
  public optionsDisplay: boolean = false;
  public data: any;
  public loaded = false;
  public db_errors: string;
  private page = 1;
  private count = 20;
  title: string = "Farmer accounts";

  constructor(
    private requestService: RequestsService,
    private router: Router
  ) {}

  ngOnInit(): any {
    this.getData();
  }

  getData() {
    this.loaded = true;
    this.requestService.get('farmers', null).subscribe((res: any) => {
      this.data = res.result;
    });
  }

}
