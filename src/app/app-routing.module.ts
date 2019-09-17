import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './views/admin-dashboard/admin-dashboard.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { AboutPageComponent } from './views/about-page/about-page.component';
import { ContactPageComponent } from './views/contact-page/contact-page.component';
import { RegisterPageComponent } from './views/register-page/register-page.component';
import { RegisterOfftakerComponent } from './views/register-offtaker/register-offtaker.component';
import { RegisterFinancialInstitutionComponent } from './views/register-financial-institution/register-financial-institution.component';
import { RegisterMasterAgentComponent } from './views/register-master-agent/register-master-agent.component';
import { AuthGuard } from './_guards/auth.guard';
import { AdminGuard } from './_guards/admin.guard';
import { ReportPageComponent } from './views/report-page/report-page.component';
import { ForgotPasswordPageComponent } from './views/forgot-password-page/forgot-password-page.component';
import { ConfirmPasswordPageComponent } from './views/confirm-password-page/confirm-password-page.component';
import { MasteragentComponent } from './views/masteragent/masteragent.component';
import { AdminRegisterMasteragentComponent } from './views/admin-register-masteragent/admin-register-masteragent.component';
import { OfftakerComponent } from './views/offtaker/offtaker.component';
import { AdminRegisterOfftakerComponent } from './views/admin-register-offtaker/admin-register-offtaker.component';
import { DevtpartnerComponent } from './views/devtpartner/devtpartner.component';
import { AdminRegisterDevtpartnerComponent } from './views/admin-register-devtpartner/admin-register-devtpartner.component';
import { AdminListComponent } from './views/admin-list/admin-list.component';
import { NewAdminComponent } from './views/new-admin/new-admin.component';
import { ChangeAdminPasswordComponent } from './views/change-admin-password/change-admin-password.component';

import { EditAdminComponent } from './views/edit-admin/edit-admin.component';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';
import { AdminUsersLogComponent } from './views/admin-users-log/admin-users-log.component';
import { GovernmentComponent } from './views/government/government.component';
import { AdminRegisterGovernmentComponent } from './views/admin-register-government/admin-register-government.component';
import { AppManagementDashboardComponent } from './views/_app-management/app-management-dashboard/app-management-dashboard.component';
import { ReceivedOrdersComponent } from './views/_app-management/received-orders/received-orders.component';
import { CompletedOrdersComponent } from './views/_app-management/completed-orders/completed-orders.component';
import { InputsComponent } from './views/_app-management/inputs/inputs.component';
import { DiseasesComponent } from './views/_app-management/diseases/diseases.component';
import { PestsComponent } from './views/_app-management/pests/pests.component';
import { AgronomicalComponent } from './views/_app-management/agronomical/agronomical.component';
import { VillageagentsComponent } from './views/villageagents/villageagents.component';
import { InputsupplierComponent } from './views/inputsupplier/inputsupplier.component';
import { FinancialinstitutionComponent } from './views/financialinstitution/financialinstitution.component';
import { FarmersComponent } from './views/farmers/farmers.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  },
  {
    path: 'admin_dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, AdminGuard],
    data: {
      title: 'Akorion Admin Dashboard'
    }
  },
  {
    path: 'change-admin-password',
    component: ChangeAdminPasswordComponent,
    canActivate: [AuthGuard, AdminGuard],
    data: {
      title: 'Akorion Admin Dashboard'
    }
  },
  {
    path: 'admin-user-logs',
    component: AdminUsersLogComponent,
    canActivate: [AuthGuard, AdminGuard],
    data: {
      title: 'Akorion Admin Dashboard'
    }
  },
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'contact',
    component: ContactPageComponent
  },
  { path: 'confirm-password', component: ConfirmPasswordPageComponent },
  { path: 'forgot-password', component: ForgotPasswordPageComponent },
  { path: 'register', component: RegisterPageComponent },
  {
    path: 'register/off-taker',
    component: RegisterOfftakerComponent
  },
  {
    path: 'register/financial-institution',
    component: RegisterFinancialInstitutionComponent
  },
  {
    path: 'register/master-agent',
    component: RegisterMasterAgentComponent
  },
  {
    path: 'admin/report',
    canActivate: [AuthGuard, AdminGuard],
    component: ReportPageComponent
  },
  {
    path: 'masteragents',
    component: MasteragentComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'create/masteragent',
    component: AdminRegisterMasteragentComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'offtakers',
    component: OfftakerComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'create/offtaker',
    component: AdminRegisterOfftakerComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'devt-partners',
    component: DevtpartnerComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'create/devt-partners',
    component: AdminRegisterDevtpartnerComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'admins',
    component: AdminListComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'create/admin',
    component: NewAdminComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'admin/account/:id',
    component: EditAdminComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'account/:id',
    component: EditModalComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'government',
    component: GovernmentComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'create/government',
    component: AdminRegisterGovernmentComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'mobile-dashboard',
    component: AppManagementDashboardComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'mobile-orders-received-orders',
    component: ReceivedOrdersComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'mobile-orders-completed-orders',
    component: CompletedOrdersComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'mobile-inputs',
    component: InputsComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'mobile-diseases',
    component: DiseasesComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'mobile-pests',
    component: PestsComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'mobile-agronomical',
    component: AgronomicalComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'farmers',
    component: FarmersComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'financial-institutions',
    component: FinancialinstitutionComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'input-suppliers',
    component: InputsupplierComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'village-agents',
    component: VillageagentsComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
