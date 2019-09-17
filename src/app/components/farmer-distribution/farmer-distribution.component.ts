declare var require: any;

import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import MapModule from 'highcharts/modules/map';
import { BaseComponent } from 'src/app/_shared/utils/base-component';
import { RequestsService } from 'src/app/_shared/services/requests.service';
const Uganda = require('@highcharts/map-collection/countries/ug/ug-all.geo.json');

MapModule(Highcharts);

@Component({
  selector: 'app-farmer-distribution',
  templateUrl: './farmer-distribution.component.html',
  styleUrls: ['./farmer-distribution.component.scss']
})
export class FarmerDistributionComponent extends BaseComponent
  implements OnInit {
  @Input() districtData: object;
  @Input() vaDistrictData: object;
  @Input() oneToOne: boolean;
  dataLoaded: boolean = false;
  title = 'Farmer distribution';
  chart;
  updateFromInput = false;
  Highcharts = Highcharts;
  chartConstructor = 'mapChart';
  chartCallback;
  chartOptions: any;
  Chart = {
    map: Uganda
  };

  MapNavigation = {
    enabled: true,
    buttonOptions: {
      alignTo: 'spacingBox'
    }
  };
  Series = {
    name: 'Farmers',
    states: {
      hover: {
        color: '#BADA55'
      }
    },
    dataLabels: {
      enabled: true,
      format: '{point.name}'
    },
    allAreas: false
  };

  constructor(requestService: RequestsService) {
    super(requestService);
  }
  initChart(vaData, farmerData) {
    this.chartOptions = {
      chart: { ...this.Chart },
      title: { text: 'Farmer distribution' },
      mapNavigation: { ...this.MapNavigation },
      colorAxis: { min: 0 },
      tooltip: {
        formatter() {
          let point = this,
            VAs;
          vaData.forEach(d => {
            if (d[0] == point.point['hc-key']) {
              VAs = d[1];
            }
          });
          return `${point.key} <br> <b>${point.series.name}: ${
            point.point.value
          }</b> <br> <b>VAs: ${VAs}</b>`;
        }
      },
      series: [{ ...this.Series, data: farmerData }]
    };
  }

  ngOnInit() {
    const farmerData = [];
    const vaData = [];
    const districtDetails = {
      ...this.districtDetails
    };
    for (const [district, farmers] of Object.entries(this.districtData)) {
      farmerData.push([districtDetails[district], farmers]);
    }
    for (const [district, vas] of Object.entries(this.vaDistrictData)) {
      vaData.push([districtDetails[district], vas]);
    }
    for (const [district, districtCode] of Object.entries(districtDetails)) {
      if (!this.districtData[district]) {
        farmerData.push([districtCode, 0]);
      }
      if (!this.vaDistrictData[district]) {
        vaData.push([districtCode, 0]);
      }
    }
    this.initChart(vaData, farmerData);
    this.dataLoaded = farmerData.length > 0 && vaData.length > 0;
  }
}
