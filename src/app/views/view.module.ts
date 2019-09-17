import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewModuleComponent } from './view.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ReportFilterComponent } from '../components/report-filter/report-filter.component';
import { ComponentsModule } from '../components/components.module';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { RegisterOfftakerComponent } from './register-offtaker/register-offtaker.component';
import { RegisterMasterAgentComponent } from './register-master-agent/register-master-agent.component';
import { RegisterFinancialInstitutionComponent } from './register-financial-institution/register-financial-institution.component';
import { ReportPageComponent } from './report-page/report-page.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { ConfirmPasswordPageComponent } from './confirm-password-page/confirm-password-page.component';
import { MasteragentComponent } from './masteragent/masteragent.component';
import { AdminRegisterMasteragentComponent } from './admin-register-masteragent/admin-register-masteragent.component';
import { AdminRegisterOfftakerComponent } from './admin-register-offtaker/admin-register-offtaker.component';
import { DevtpartnerComponent } from './devtpartner/devtpartner.component';
import { AdminRegisterDevtpartnerComponent } from './admin-register-devtpartner/admin-register-devtpartner.component';
import { OfftakerComponent } from './offtaker/offtaker.component';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
  OWL_DATE_TIME_FORMATS
} from 'ng-pick-datetime';
import { AdminListComponent } from './admin-list/admin-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NewAdminComponent } from './new-admin/new-admin.component';
import { OrderModule } from 'ngx-order-pipe';
import { ChangeAdminPasswordComponent } from './change-admin-password/change-admin-password.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { AdminUsersLogComponent } from './admin-users-log/admin-users-log.component';
import { CSV2JSONModule } from 'angular2-csv2json';
import { GovernmentComponent } from './government/government.component';
import { AdminRegisterGovernmentComponent } from './admin-register-government/admin-register-government.component';
import { AppManagementDashboardComponent } from './_app-management/app-management-dashboard/app-management-dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { ReceivedOrdersComponent } from './_app-management/received-orders/received-orders.component';
import { CompletedOrdersComponent } from './_app-management/completed-orders/completed-orders.component';
import { InputsComponent } from './_app-management/inputs/inputs.component';
import { DiseasesComponent } from './_app-management/diseases/diseases.component';
import { PestsComponent } from './_app-management/pests/pests.component';
import { AgronomicalComponent } from './_app-management/agronomical/agronomical.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { InputsupplierComponent } from './inputsupplier/inputsupplier.component';
import { VillageagentsComponent } from './villageagents/villageagents.component';
import { FarmersComponent } from './farmers/farmers.component';
import { FinancialinstitutionComponent } from './financialinstitution/financialinstitution.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OrderTableComponent } from '../components/order-table/order-table.component';
import { PaymentTypePipe } from '../_shared/utils/payment-type.pipe';

export const MY_NATIVE_FORMATS = {
  fullPickerInput: {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  },
  datePickerInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
  timePickerInput: { hour: 'numeric', minute: 'numeric' },
  monthYearLabel: { year: 'numeric', month: 'short' },
  dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
  monthYearA11yLabel: { year: 'numeric', month: 'long' }
};
@NgModule({
  declarations: [
    ViewModuleComponent,
    LoginPageComponent,
    AboutPageComponent,
    AdminDashboardComponent,
    ChangeAdminPasswordComponent,
    AdminUsersLogComponent,
    OrderTableComponent,
    ReportFilterComponent,
    ContactPageComponent,
    RegisterPageComponent,
    RegisterOfftakerComponent,
    RegisterMasterAgentComponent,
    RegisterFinancialInstitutionComponent,
    ReportPageComponent,
    ForgotPasswordPageComponent,
    ConfirmPasswordPageComponent,
    MasteragentComponent,
    AdminRegisterMasteragentComponent,
    OfftakerComponent,
    AdminRegisterOfftakerComponent,
    DevtpartnerComponent,
    AdminRegisterDevtpartnerComponent,
    AdminListComponent,
    NewAdminComponent,
    EditAdminComponent,
    GovernmentComponent,
    AdminRegisterGovernmentComponent,
    AppManagementDashboardComponent,
    ReceivedOrdersComponent,
    CompletedOrdersComponent,
    InputsComponent,
    DiseasesComponent,
    PestsComponent,
    AgronomicalComponent,
    InputsupplierComponent,
    VillageagentsComponent,
    FarmersComponent,
    FinancialinstitutionComponent,
    ReportPageComponent,
    PageNotFoundComponent,
    PaymentTypePipe
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ComponentsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxPaginationModule,
    OrderModule,
    ChartsModule,
    CSV2JSONModule,
    NgxChartsModule,
  ],
  providers: [{ provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS }],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, OrderModule]
})
export class ViewModule {}
