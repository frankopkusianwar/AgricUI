import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FarmerDistributionComponent } from './farmer-distribution.component';
import { HighchartsChartComponent } from 'highcharts-angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { BaseComponent } from 'src/app/_shared/utils/base-component';

describe('FarmerDistributionComponent', () => {
  let component: FarmerDistributionComponent;
  let fixture: ComponentFixture<FarmerDistributionComponent>;

  const districtData = {
    Kalangala: 2,
    Buikwe: 2,
    Rukungiri: 1,
    Buvuma: 1,
    Namutumba: 1
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FarmerDistributionComponent, HighchartsChartComponent],
      imports: [HttpClientTestingModule, HttpClientModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerDistributionComponent);
    let element = fixture.debugElement.nativeElement;
    component = fixture.componentInstance;
    component.districtData = districtData;
    component.vaDistrictData = districtData;
    fixture.detectChanges();
  });

  it('should create the FarmerDistributionComponent', () => {
    expect(component).toBeTruthy();
  });
});
