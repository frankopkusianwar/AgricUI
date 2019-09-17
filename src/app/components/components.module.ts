import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingHeaderComponent } from './landing-header/landing-header.component';
import { AppRoutingModule } from '../app-routing.module';
import { RequestAccountPannelComponent } from './request-account-pannel/request-account-pannel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminReportSidebarComponent } from './admin-report-sidebar/admin-report-sidebar.component';
import { ApplicationActivitySummaryComponent } from './application-activity-summary/application-activity-summary.component';
import { AdminSocialMediaSummaryComponent } from './admin-social-media-summary/admin-social-media-summary.component';
import { TopDistrictsComponent } from './top-districts/top-districts.component';
import { OnlineAccountsComponent } from './online-accounts/online-accounts.component';
import { MostOrderedProductsComponent } from './most-ordered-products/most-ordered-products.component';
import { WelcomeDetailsComponent } from './welcome-details/welcome-details.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DataTableComponent } from './data-table/data-table.component';
import { RegisterAccountPannelComponent } from './register-account-pannel/register-account-pannel.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FarmerDistributionComponent } from './farmer-distribution/farmer-distribution.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CSV2JSONModule } from 'angular2-csv2json';
import { QuillModule } from 'ngx-quill';

import { EditModalComponent } from './edit-modal/edit-modal.component';
import { AppDashboardNavigationComponent } from './app-dashboard-navigation/app-dashboard-navigation.component';
import { DiagnosisTableComponent } from './diagnosis-table/diagnosis-table.component';
import { UnderdevelopmentComponent } from './underdevelopment/underdevelopment.component';
import { OrderModule } from 'ngx-order-pipe';
// Edit Inputs
import { EditInputComponent } from "./edit-input/edit-input.component";
import { EditDiagnosisModalComponent } from './edit-diagnosis-modal/edit-diagnosis-modal.component';
import { PostDiagnosisModalComponent } from './post-diagnosis-modal/post-diagnosis-modal.component';
import { InputTableComponent } from './inputs-table/inputs-table.component';
import { SuccessModalComponent } from './success-modal/success-modal.component';
import { AddInputComponent } from './add-input/add-input.component';
import { OrderChartComponent } from './order-chart/order-chart.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    LandingHeaderComponent,
    RequestAccountPannelComponent,
    AdminReportSidebarComponent,
    ApplicationActivitySummaryComponent,
    AdminSocialMediaSummaryComponent,
    TopDistrictsComponent,
    OnlineAccountsComponent,
    MostOrderedProductsComponent,
    WelcomeDetailsComponent,
    NavigationComponent,
    DataTableComponent,
    RegisterAccountPannelComponent,
    FarmerDistributionComponent,
    EditModalComponent,
    AppDashboardNavigationComponent,
    DiagnosisTableComponent,
    UnderdevelopmentComponent,
    EditDiagnosisModalComponent,
    PostDiagnosisModalComponent,
    InputTableComponent,
    SuccessModalComponent,
    AddInputComponent,
    EditInputComponent,
    SuccessModalComponent,
    InputTableComponent,
    OrderChartComponent
  ],
  exports: [
    LandingHeaderComponent,
    RequestAccountPannelComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminReportSidebarComponent,
    ApplicationActivitySummaryComponent,
    AdminSocialMediaSummaryComponent,
    TopDistrictsComponent,
    OnlineAccountsComponent,
    MostOrderedProductsComponent,
    WelcomeDetailsComponent,
    NavigationComponent,
    DataTableComponent,
    RegisterAccountPannelComponent,
    FarmerDistributionComponent,
    EditModalComponent,
    AppDashboardNavigationComponent,
    DiagnosisTableComponent,
    UnderdevelopmentComponent,
    PostDiagnosisModalComponent,
    InputTableComponent,
    SuccessModalComponent,
    AddInputComponent,
    EditInputComponent,
    SuccessModalComponent,
    InputTableComponent,
    OrderChartComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HighchartsChartModule,
    HttpClientModule,
    NgxChartsModule,
    CSV2JSONModule,
    OrderModule,
    QuillModule.forRoot(),
    ChartsModule
  ]
})
export class ComponentsModule {}
