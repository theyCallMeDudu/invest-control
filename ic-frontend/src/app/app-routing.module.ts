import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './main/pages/dashboard/dashboard.component';
import { InvestmentsComponent } from './main/pages/investments/investments.component';
import { InvestmentComponent } from './main/pages/investment/investment.component';

export const routes: Routes = [
  // Redirects to login page by default
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // Redirects to dashboard (main page)
  { path: 'dashboard', component: DashboardComponent },
  // Redirect to investments page
  { path: 'investments', component: InvestmentsComponent },
  // Redirect to new investment page
  { path: 'investment', component: InvestmentComponent },
  // Redirect to investment edit page
  { path: 'investment/:investment_id', component: InvestmentComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule]
})

export class AppRoutingModule { }
